import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { routes } from 'src/app/consts';
import { ApisService } from 'src/app/services/apis.service';

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

  constructor(private apis: ApisService) {}

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
    // Mettre tous les fichiers en isActive = false
    this.files.forEach((file) => {
      if (file.isActive) {
        this.apis.enableFile(file._id, false).subscribe();
      }
    });

    // Activer seulement celui choisi
    this.apis.enableFile(fileId, true).subscribe(() => {
      this.loadFiles();
    });
  }
}
