import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserCrud } from '../interfaces/user-crud';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string = 'http://localhost:8000/api/account';

  listUsuarios: UserCrud[] = [
    {id: 1, userName: 'Hydrogen', email: "1.0079@", password: 'H'},
    {id: 2, userName: 'Helium', email: "4.0026@", password: 'He'},
    {id: 3, userName: 'Lithium', email: "6.941@", password: 'Li'},
    {id: 4, userName: 'Beryllium', email: "9.0122@", password: 'Be'},
    {id: 5, userName: 'Boron', email: "10.811@", password: 'B'},
    {id: 6, userName: 'Carbon', email: "12.0107@", password: 'C'},
    {id: 7, userName: 'Nitrogen', email: "@14.0067", password: 'N'},
    {id: 8, userName: 'Oxygen', email: "15.9994", password: 'O'},
    {id: 9, userName: 'Fluorine', email: "18.9984", password: 'F'},
    {id: 10, userName: 'Neon', email: "20.1797", password: 'Ne'},
    {id: 11, userName: 'Sodium', email: "22.9897", password: 'Na'},
    {id: 12, userName: 'Magnesium', email: "24.305", password: 'Mg'},
    {id: 13, userName: 'Aluminum', email: "26.9815", password: 'Al'},
    {id: 14, userName: 'Silicon', email: "28.0855", password: 'Si'},
    {id: 15, userName: 'Phosphorus', email: "30.9738", password: 'P'},
    {id: 16, userName: 'Sulfur', email: "32.065", password: 'S'},
    {id: 17, userName: 'Chlorine', email: "35.453", password: 'Cl'},
    {id: 18, userName: 'Argon', email: "39.948", password: 'Ar'},
    {id: 19, userName: 'Potassium', email: "39.0983", password: 'K'},
    {id: 20, userName: 'Calcium', email: "40.078", password: 'Ca'},
  ];

  listUsers: UserCrud[] = [];

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  getAll() {
    return this.http.get<any>(this.url+'/users');
  }

  update(id: number, userName: string, email: string) {
    return this.http.put<any>(this.url+'/users/'+id+'?_method=PUT', {userName, email}, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete<any>(this.url+'/users/'+id);
  }
}
