import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url:string = 'http://localhost:8000/api/store';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }

  getAll() {
    return this.http.get<any>(this.url+'/products', this.httpOptions);
  }

  update(id: number, name: string, description: string, manufacturer: string, price:number, stock: number) {
    return this.http.put<any>(this.url+'/products/'+id+'?_method=PUT', {name, description, manufacturer, price, stock}, this.httpOptions);
  }

  create(name: string, description: string, manufacturer: string, price: number, stock: number) {
    return this.http.post<any>(this.url + '/products', { name, description, manufacturer, price, stock }, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete<any>(this.url+'/products/'+id, this.httpOptions);
  }
}
