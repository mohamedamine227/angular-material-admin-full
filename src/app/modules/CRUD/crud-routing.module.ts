import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersListComponent } from './users-list/users-list.component';
import { CreerFichierComponent } from './creer-fichier/creer-fichier.component';
import { FichiersComponent } from './fichiers/fichiers.component';
import { DemandesComponent } from './demandes/demandes.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
  },
  {
    path: 'users/edit/:id',
    component: UsersEditComponent,
  },
  {
    path: 'users/new',
    component: UsersCreateComponent,
  },
  {
    path: 'files/new',
    component: FileUploadComponent,
  },

  {
    path: 'files/list',
    component: FichiersComponent,
  },

  {
    path: 'demandes/list',
    component: DemandesComponent,
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudRoutingModule {}
