import { Component } from '@angular/core';
import { PdfService } from './../../service/pdf.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pdf',
  standalone: true,
  imports: [FormsModule,CommonModule], 
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent {
  bookId: number | undefined;
  errorMessage: string | null = null;

  constructor(private pdfService: PdfService) {}

  downloadPdf() {
    if (this.bookId) {
      this.pdfService.exportBookToPdf(this.bookId).subscribe(
        (response: Blob) => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `Book_${this.bookId}.pdf`;
          link.click();
          window.URL.revokeObjectURL(url);
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = 'Error downloading PDF. Please try again later.';
          console.error('Error downloading PDF:', error);
        }
      );
    } else {
      this.errorMessage = 'Please enter a valid Book ID.';
    }
  }
}
