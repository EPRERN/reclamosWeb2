import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private baseUrl = 'http://localhost:3000/send-email'; // Cambia esta URL por la URL de tu servidor

  constructor(private http: HttpClient) {}

  sendEmailWithAttachment(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }
}
