import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // Import throwError here
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private apiUrl = 'http://localhost:8081/api/pdf';  // Adjust URL as needed

  constructor(private http: HttpClient) {}

  exportBookToPdf(bookId:number): Observable<Blob> {
    const headers = new HttpHeaders().set('Accept', 'application/pdf');
    return this.http.get(`${this.apiUrl}/${bookId}`, {
      headers: headers,
      responseType: 'blob'  // Correct responseType setting
    }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    console.error('Error downloading PDF:', error);
    return throwError('Error downloading PDF. Please try again later.');
  }
}
 