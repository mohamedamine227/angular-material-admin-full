import { ChangeDetectorRef, Component } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  filePreview: string | ArrayBuffer | null = null;
  progress = 0;
  message = '';

  constructor(
    private fileUploadService: ApisService,
    private cdr: ChangeDetectorRef,
  ) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.handleFileSelection(file);
  }

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.handleFileSelection(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  handleFileSelection(file: File) {
    this.selectedFile = file;
    this.progress = 0;
    this.message = '';
    this.filePreview = null;

    if (this.isImage(file)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.filePreview = e.target?.result;
        this.cdr.detectChanges(); // <-- ici
      };
      reader.readAsDataURL(file);
    } else if (this.isPDF(file)) {
      setTimeout(() => {
        this.filePreview = URL.createObjectURL(file);
      }, 0);

      this.cdr.detectChanges(); // <-- ici aussi
    } else {
      this.filePreview = null;
    }
  }

  isImage(file: File) {
    return file.type.startsWith('image/');
  }

  isPDF(file: File) {
    return file.type === 'application/pdf';
  }

  upload() {
    if (!this.selectedFile) return;

    const relatedModel = 'Candidate';
    const relatedId = '64c123abcd1234abcd5678ef';
    const category = 'document';

    this.fileUploadService
      .uploadFile(this.selectedFile, null, null, category)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event.type === HttpEventType.Response) {
            this.message = 'Upload successful!';
            console.log(event.body);
          }
        },
        error: (err) => {
          this.message = 'Upload failed!';
          console.error(err);
        },
      });
  }

  clearSelection() {
    this.selectedFile = null;
    this.filePreview = null;
    this.progress = 0;
    this.message = '';
  }
}
