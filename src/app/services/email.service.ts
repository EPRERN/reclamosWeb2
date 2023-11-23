import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/envinronment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  // private baseUrl = environment.apiUrl + '/send-email';
  private baseUrl = 'http://localhost/phpmailer/forma2/';


  constructor(private http: HttpClient) {}

  sendEmailWithAttachment(formData: FormData): Observable<any> {
    console.log('FormData en EmailService:', formData);
    return this.http.post(this.baseUrl, formData);
  }
}
