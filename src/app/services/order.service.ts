import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url:string = 'http://localhost:8000/api/store';
  
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }

  getAll() {
    return this.http.get<any>(this.url+'/orders', this.httpOptions);
  }

  update(id: number, idUser:number, idProduct: number, amount: number, paymentDate: string, paymentMethod: string) {
    return this.http.put<any>(this.url+'/order/'+id+'?_method=PUT', {idUser, idProduct, amount, paymentDate, paymentMethod}, this.httpOptions);
  }

  create(idUser:number, idProduct: number, amount: number, paymentMethod: string) {
    return this.http.post<any>(this.url + '/orders', { idUser, idProduct, amount, paymentMethod }, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete<any>(this.url+'/order/'+id, this.httpOptions);
  }
}
