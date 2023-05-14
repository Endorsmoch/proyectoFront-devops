import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string = 'http://localhost:8000/api/auth';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  register(userName:string, email:string, password:string) {
    return this.http.post<any>(this.url+'/register', { userName, email,password }, this.httpOptions);
  }
  
  login(username: string, password: string) {
    return this.http.post<any>(this.url+'/login', { username, password });
  }

  
}
