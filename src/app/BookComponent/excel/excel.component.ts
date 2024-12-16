import { ExcelService } from './../../service/excel.service';


import { Component } from '@angular/core';

@Component({
  selector: 'app-excel',
  standalone: true,
  imports: [],
  templateUrl: './excel.component.html',
  styleUrl: './excel.component.css'
})
export class ExcelComponent {

  constructor(private ExcelService: ExcelService) {}

  downloadBookData(): void {
    this.ExcelService.exportBooksAndUsersToExcel().subscribe(
      (response: Blob) => {
        // Create a download link for the Blob response
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'books_and_users.xlsx';  // Set the file name
        a.click();
        window.URL.revokeObjectURL(url);  // Clean up the URL object
      },
      error => {
        console.error('Download failed:', error);
        alert('Failed to download Excel file.');
      }
    );
  }

}
