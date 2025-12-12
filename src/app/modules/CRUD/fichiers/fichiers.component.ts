import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { forkJoin } from 'rxjs';
import { routes } from 'src/app/consts';
import { ApisService } from 'src/app/services/apis.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fichiers',
  templateUrl: './fichiers.component.html',
  styleUrls: ['./fichiers.component.css'],
})
export class FichiersComponent implements OnInit {
  public routes: typeof routes = routes;
  files: any[] = [];
  filteredFiles: any[] = [];

  paginatedFiles: any[] = [];

  searchTerm = '';

  pageSize = 5;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apis: ApisService, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles() {
    this.apis.getFiles().subscribe((data: any) => {
      this.files = data?.data ?? [];
      this.filteredFiles = [...this.files];
      this.applyPagination();
    });
  }

  /* 🔍 Recherche instantanée */
  filterFiles() {
    const term = this.searchTerm.toLowerCase();

    this.filteredFiles = this.files.filter((f) =>
      f.filename.toLowerCase().includes(term),
    );

    this.currentPage = 0;
    this.paginator.firstPage();
    this.applyPagination();
  }

  /* 🔵 Pagination Angular Material */
  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;

    this.applyPagination();
  }

  applyPagination() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;

    this.paginatedFiles = this.filteredFiles.slice(start, end);
  }

  deleteFile(fileId: any) {
    this.apis.deleteFile(fileId).subscribe(() => this.loadFiles());
  }

  enableFile(fileId: string) {
    // fichier que l’utilisateur veut activer
    const file = this.files.find((f) => f._id === fileId);

    // Vérifier si un autre fichier est déjà actif
    const alreadyActive = this.files.find((f) => f.isActive);

    // Si un autre fichier est actif ET ce n'est pas celui qu'on clique
    if (alreadyActive && alreadyActive._id !== fileId) {
      this.snack.open(
        'Un autre fichier est déjà actif. Désactivez-le avant d’en activer un autre.',
        'OK',
        { duration: 3000, panelClass: ['info-snackbar'] },
      );
      return;
    }

    // Si le fichier est déjà actif → rien à faire
    if (file?.isActive) {
      this.snack.open('Ce fichier est déjà actif.', 'OK', {
        duration: 3000,
        panelClass: ['info-snackbar'],
      });
      return;
    }

    // Sinon → on peut activer
    this.apis.enableFile(fileId, true).subscribe(() => {
      this.snack.open('Fichier activé avec succès.', 'Fermer', {
        duration: 3000,
        panelClass: ['success-snackbar'],
      });
      this.loadFiles();
    });
  }

  disableFile(fileId: string) {
    this.apis.disableFile(fileId, false).subscribe(() => {
      this.loadFiles();
    });
  }
}
