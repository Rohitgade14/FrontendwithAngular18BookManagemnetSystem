import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  private apiUrl = '/api/excel/download'; 
  constructor(private http: HttpClient) {}
  exportBooksAndUsersToExcel(): Observable<Blob> {
    return this.http.get(this.apiUrl, { responseType: 'blob' });
  }

}
