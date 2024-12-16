import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from './../../service/book.service';
import { Book } from './../../entity/book';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [NgxPaginationModule,CommonModule,FormsModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  books: Book[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getAllBooks().subscribe(data => {
      this.books = data;
      this.totalItems = this.books.length;
    });
  }
     viewBook(bookId: number): void{
      this.router.navigate(['/get-book', bookId]);
     }
  editBook(id: number): void {
    this.router.navigate(['/update-book', id]);
  }

  deleteBook(bookId: number): void {
    this.router.navigate(['/delete-book', bookId]);
  }

  viewUsers(bookId: number): void {
    this.router.navigate(['/book-users', bookId]);
  }

}
