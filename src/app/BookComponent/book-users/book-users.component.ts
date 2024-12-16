import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookService } from './../../service/book.service';
import { User } from './../../entity/user';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-book-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-users.component.html',
  styleUrls: ['./book-users.component.css']
})
export class BookUsersComponent {
  bookId: number = 0;
  users: User[] = [];
  loading: boolean = true;
  errorMessage: string | null = null;
  noUsersFound: boolean = false;  // Flag to handle 'No users found'

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {
    // Subscribe to route params to handle changes automatically
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('bookId');
      if (idParam) {
        this.bookId = +idParam;
        this.loadUsersForBook(this.bookId);
      } else {
        this.errorMessage = 'Invalid book ID in route.';
        this.loading = false;
      }
    });
  }

  loadUsersForBook(bookId: number) {
    this.loading = true;
    this.errorMessage = null;
    this.noUsersFound = false;  // Reset no users flag before loading
  
    this.bookService.getUsersByBookId(bookId).pipe(
      catchError(err => {
        this.errorMessage = 'Error loading users. Please try again later.';
        console.error('Error loading users:', err); // For debugging
        return of(null); // Ensure error handling and fallback
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((data: { bookDto: { users: User[] } } | null) => {
      if (data && data.bookDto && Array.isArray(data.bookDto.users)) {
        this.users = data.bookDto.users;
        this.noUsersFound = this.users.length === 0; // Properly set the noUsersFound flag
      } else {
        this.errorMessage = 'Error loading users.';
      }
    });
  }
  

  goBack(): void {
    this.router.navigate(['/krios']);
  }
}
