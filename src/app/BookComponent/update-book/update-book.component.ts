import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Book } from '../../entity/book';
import { BookService } from './../../service/book.service';
import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
  providers: [CurrencyPipe]
})
export class UpdateBookComponent {
  book: Book = new Book();
  bookId: number = 0;
  bookUpdateSuccess = false;
  errorMessage: string | null = null;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private currencyPipe: CurrencyPipe
  ) {
    // Parse the 'id' from the route
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));

    // Validate bookId before loading details
    if (this.bookId > 0) {
      this.loadBookDetails();
    } else {
      this.errorMessage = 'Invalid Book ID';
    }
  }

  loadBookDetails() {
    this.bookService.getBookById(this.bookId).subscribe(
      (data: Book) => {
        this.book = data;
      },
      (error: any) => {
        console.error('Error fetching book details', error);
        this.errorMessage = 'Error fetching book details. Please try again.';
      }
    );
  }

  onUpdate() {
    // Format the price to ensure two decimal places
    const formattedPrice = parseFloat(this.book.price.toFixed(2));

    // Update the price with formatted value
    this.book.price = formattedPrice;

    // Validate book details
    if (this.book.title && this.book.author && this.book.price >= 0) {
      this.bookService.updateBook(this.bookId, this.book).subscribe(
        () => {
          console.log('Book updated successfully');
          this.bookUpdateSuccess = true;
          this.errorMessage = null;

          setTimeout(() => {
            this.goToHomePage();
            this.bookUpdateSuccess = false;
          }, 2000);
        },
        error => {
          console.error('Error updating book', error);
          this.errorMessage = 'Error updating book. Please try again.';
        }
      );
    }
  }

  goToHomePage() {
    this.router.navigate(['/krios']);
  }

  goBack(): void {
    this.router.navigate(['/krios']);
  }
}
