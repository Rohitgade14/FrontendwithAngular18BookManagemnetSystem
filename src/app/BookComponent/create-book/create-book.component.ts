import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Book } from '../../entity/book';
import { BookService } from './../../service/book.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent {

  book: Book = new Book();
  bookCreate = false;

  constructor(private bookService: BookService, private router: Router) {}

  // Handle form submission
  onSubmit() {
    // Validate if all fields are valid before proceeding
    if (this.book.title && this.book.author && this.book.price >= 0) {
      // Format the price to 2 decimal places
      this.book.price = parseFloat(this.book.price.toFixed(2));
      this.saveBook();
    } else {
      console.error('Form is invalid!');
    }
  }

  // Save the book
  saveBook() {
    this.bookService.createBook(this.book).subscribe(
      data => {
        console.log('Book created successfully:', data);
        this.bookCreate = true; // Show success message

        // Redirect after 2 seconds and hide success message
        setTimeout(() => {
          this.goToHomePage();
          this.bookCreate = false;
        }, 2000);
      },
      error => {
        console.error('Error creating book:', error);
      }
    );
  }

  // Navigate to the home page after success
  goToHomePage() {
    this.router.navigate(['/krios']);
  }
}
