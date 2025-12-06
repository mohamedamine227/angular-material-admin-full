import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-demande-details-dialog',
  templateUrl: './demande-details-dialog.component.html',
})
export class DemandeDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DemandeDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // on passe la demande entière
  ) {}

  close() {
    this.dialogRef.close();
  }
}
