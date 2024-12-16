import { BookService } from './../service/book.service';
import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-delete-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent {
  bookId: number = 0;
  deleteSuccess = false;
  errorMessage: string | null = null;
  showConfirmDialog = false; // Flag to show confirmation dialog

  private bookService = inject(BookService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
  }

  // Trigger the confirmation dialog when the component is initialized
  ngOnInit() {
    this.showConfirmDialog = true;
  }

  // Handle Yes click (proceed with delete)
  confirmDelete() {
    console.log('Attempting to delete book with ID:', this.bookId);

    this.bookService.deleteBook(this.bookId).pipe(
      catchError(error => {
        console.error('Delete error:', error);
        this.errorMessage = 'Error deleting book. Please try again.';
        return of(null); // Prevent further errors
      })
    ).subscribe({
      next: () => {
        this.deleteSuccess = true;
        this.errorMessage = null;

        setTimeout(() => {
          this.router.navigate(['/krios']);
        }, 1000);
      },
      error: () => {
        this.errorMessage = 'Failed to delete book. Please try again.';
      }
    });
  }

  // Handle No click (cancel delete)
  cancelDelete() {
    this.showConfirmDialog = false;
    this.router.navigate(['/krios']);
  }
}
