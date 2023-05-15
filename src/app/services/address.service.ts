import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AddressService {
  url:string = 'http://localhost:8000/api/store';
  
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }

  getAll() {
    return this.http.get<any>(this.url+'/addresses', this.httpOptions);
  }

  update(id: number,idUser:number, houseNum: string, street: string, city: string, state: string, country: string, postalCode: string) {
    return this.http.put<any>(this.url+'/address/'+id+'?_method=PUT', { idUser, houseNum, street, city, state, country, postalCode }, this.httpOptions);
  }

  create( idUser:number, houseNum: string, street: string, city: string, state: string, country: string, postalCode: string) {
    return this.http.post<any>(this.url + '/addresses', { idUser, houseNum, street, city, state, country, postalCode }, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete<any>(this.url+'/address/'+id, this.httpOptions);
  }
}
