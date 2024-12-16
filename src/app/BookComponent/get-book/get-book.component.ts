import { FormsModule } from '@angular/forms';
import { CommonModule ,DatePipe} from '@angular/common';
import { BookService } from './../../service/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from './../../entity/book';
import { Component } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-get-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './get-book.component.html',
  styleUrls: ['./get-book.component.css']  // Corrected from 'styleUrl' to 'styleUrls'
})
export class GetBookComponent {

  bookId: number = 0;
  book: Book | null = null;
  loading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {
    // Subscribe to route params to get book ID
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.bookId = +idParam; // Convert the bookId to a number
        this.loadBookDetails(this.bookId);
      } else {
        this.errorMessage = 'Invalid book ID in route.';
        this.loading = false;
      }
    });
  }

  loadBookDetails(bookId: number) {
    this.loading = true;
    this.errorMessage = null;

    // Call the service to fetch the book details
    this.bookService.getBookById(bookId).pipe(
      catchError(err => {
        this.errorMessage = 'Error loading book. Please try again later.';
        console.error('Error loading book:', err);
        return of(null);  // Handle errors gracefully
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(data => {
      if (data) {
        this.book = data; // Assign the fetched book data
      } else {
        this.errorMessage = 'No book found with this ID.';
      }
    });
  }
  downloadPDF(): void {
    if (!this.book) {
      console.error('No book data available for PDF generation.');
      return;
    }
  
    const doc = new jsPDF();
  
    // Set font and title style
    doc.setFont('helvetica');
    doc.setFontSize(12);
    doc.setFontSize(16);
    doc.setTextColor(0, 102, 204); // Title color (blue)
    doc.text('Book Details', 10, 10);
  
    // Add book details with a check to ensure fields are defined
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Default black color for text
    doc.text(`Book ID: ${this.book.id || 'N/A'}`, 10, 20);
    doc.text(`Title: ${this.book.title || 'N/A'}`, 10, 30);
    doc.text(`Author: ${this.book.author || 'N/A'}`, 10, 40);
    doc.text(`Price: ${this.book.price || 'N/A'}`, 10, 50);
  
    // Optional: Draw a line for styling
    doc.setDrawColor(0, 102, 204);
    doc.line(10, 55, 200, 55);
  
    // Save the PDF with the book title as the filename
    doc.save(`${this.book.title || 'Book'}-details.pdf`);
  }
  
  goBack(): void {
    this.router.navigate(['/krios']);
  }

 ;
    
  
}
