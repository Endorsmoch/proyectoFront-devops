import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  url:string = 'http://localhost:8000/api/store';
  
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }

  getAll() {
    return this.http.get<any>(this.url+'/comments', this.httpOptions);
  }

  update(id: number, idProduct: number, idUser:number, date: string, text: string, likes: number) {
    return this.http.put<any>(this.url+'/comment/'+id+'?_method=PUT', {idProduct, idUser, date, text, likes}, this.httpOptions);
  }

  create(idProduct: number, idUser:number, text: string, likes: number) {
    return this.http.post<any>(this.url + '/comments', { idProduct, idUser, text, likes }, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete<any>(this.url+'/comment/'+id, this.httpOptions);
  }


}
