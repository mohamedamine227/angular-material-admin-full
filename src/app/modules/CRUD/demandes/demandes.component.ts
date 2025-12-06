// demandes.component.ts
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ApisService } from 'src/app/services/apis.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { routes } from 'src/app/consts';
import { MatDialog } from '@angular/material/dialog';
import { StatusDialogComponent } from '../status-dialog/status-dialog.component';
import { DemandeDetailsDialogComponent } from '../demande-details-dialog/demande-details-dialog.component';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css'],
})
export class DemandesComponent implements OnInit, OnDestroy {
  public routes: typeof routes = routes;

  demandes: any[] = [];
  searchTerm = '';
  search$ = new Subject<string>();
  searchSub!: Subscription;

  pagination = {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apis: ApisService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // debounce pour la recherche (300ms)
    this.searchSub = this.search$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        this.searchTerm = term;
        this.pagination.page = 1;
        this.loadDemandes(this.pagination.page);
      });

    this.loadDemandes();
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
  }

  loadDemandes(page: number = 1) {
    this.apis
      .getDemandes(page, this.pagination.limit, this.searchTerm)
      .subscribe(
        (res: any) => {
          // debug
          console.log('API response', res);
          this.demandes = res.data?.applications || [];
          this.pagination = res.data?.pagination || {
            page,
            limit: this.pagination.limit,
            total: 0,
            pages: 0,
          };
        },
        (err) => {
          console.error('Get demandes error', err);
        },
      );
  }

  onPageChange(event: PageEvent) {
    this.pagination.limit = event.pageSize;
    this.pagination.page = event.pageIndex + 1;
    this.loadDemandes(this.pagination.page);
  }

  onSearchInput(term: string) {
    this.search$.next(term); // déclenchement instantané via debounce
  }

  onSearchButton() {
    this.search$.next(this.searchTerm);
  }

  openStatusDialog(demande: any) {
    const dialogRef = this.dialog.open(StatusDialogComponent, {
      width: '400px',
      data: {
        id: demande._id,
        currentStatus: demande.status,
      },
    });

    dialogRef.afterClosed().subscribe((newStatus) => {
      if (!newStatus) return; // annulé

      this.apis.updateDemandeStatus(demande._id, newStatus).subscribe({
        next: () => {
          demande.status = newStatus; // mise à jour instantanée
          this.loadDemandes(this.pagination.page); // recharger
        },
        error: (err) => console.error('Erreur update', err),
      });
    });
  }

  openDetailsDialog(demande: any) {
    this.dialog.open(DemandeDetailsDialogComponent, {
      width: '600px',
      data: demande,
    });
  }
}
