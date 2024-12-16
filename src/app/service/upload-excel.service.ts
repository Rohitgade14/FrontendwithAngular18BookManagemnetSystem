import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadExcelService {
  private apiUrl = 'http://localhost:8081/api/excel/upload'; // Backend URL

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<{message: string }> {
    const formData = new FormData();
    formData.append('file', file, file.name); 

    return this.http.post<{ message: string }>(this.apiUrl, formData);
  }

 

}
