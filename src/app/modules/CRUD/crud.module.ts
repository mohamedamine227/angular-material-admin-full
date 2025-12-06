import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { CrudRoutingModule } from './crud-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';

import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersListComponent } from './users-list/users-list.component';
import { DemandesComponent } from './demandes/demandes.component';
import { FichiersComponent } from './fichiers/fichiers.component';
import { CreerFichierComponent } from './creer-fichier/creer-fichier.component';
import { StatusDialogComponent } from './status-dialog/status-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DemandeDetailsDialogComponent } from './demande-details-dialog/demande-details-dialog.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
// import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [UsersCreateComponent, UsersEditComponent, UsersListComponent, DemandesComponent, FichiersComponent, CreerFichierComponent, StatusDialogComponent, DemandeDetailsDialogComponent, FileUploadComponent, UserProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CrudRoutingModule,
    NgSelectModule,
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    MatRadioModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
    MatDialogModule,
    //PdfViewerModule
  ],
})
export class CrudModule {}
