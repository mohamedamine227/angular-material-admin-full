import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
})
export class StatusDialogComponent {
  statuses = ['pending', 'approved', 'rejected', 'processing'];

  selectedStatus: string = this.data.currentStatus;

  constructor(
    private dialogRef: MatDialogRef<StatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  save() {
    this.dialogRef.close(this.selectedStatus);
  }

  close() {
    this.dialogRef.close(null);
  }
}
