import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string = 'http://localhost:8000/api/account';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }

  getAll() {
    return this.http.get<any>(this.url+'/users', this.httpOptions);
  }

  update(id: number, userName: string, email: string) {
    return this.http.put<any>(this.url+'/users/'+id+'?_method=PUT', {userName, email}, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete<any>(this.url+'/users/'+id, this.httpOptions);
  }
}
