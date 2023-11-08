import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private baseUrl = 'http://localhost:8080/email/send';

  
  constructor(private http: HttpClient) { }

  sendEmailWithAttachment(emailData: any, files: File[]): Observable<any> {
    const formData = new FormData();
    formData.append('emailRequest', JSON.stringify(emailData));
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    return this.http.post(this.baseUrl, formData);
  }
}
