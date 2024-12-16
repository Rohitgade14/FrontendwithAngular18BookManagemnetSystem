import { UploadExcelService } from './../../service/upload-excel.service';
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-excel',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.css']
})
export class UploadExcelComponent {

  selectedFile: File | null = null;
  uploadMessage: string = '';

  constructor(private uploadExcelService: UploadExcelService) {}

  onFileSelect(event: any): void {
    this.selectedFile = event.target.files[0];
    this.uploadMessage = ''; // Clear previous message on file select
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.uploadExcelService.uploadFile(this.selectedFile).subscribe(
        (response) => {
          this.uploadMessage = response.message; // Display success message
        },
        (error: HttpErrorResponse) => {
          this.uploadMessage = error.error?.message || `Error: ${error.message}`;
        }
      );
    } else {
      this.uploadMessage = 'Please select a file before uploading.';
    }
  }
}
