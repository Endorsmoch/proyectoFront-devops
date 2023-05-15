import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { UserCrud } from 'src/app/interfaces/user-crud';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent implements AfterViewInit, OnInit{

  userList: UserCrud[] = [];
  displayedColumns: string[] = ['id', 'userName', 'email', 'password', 'acciones'];

  //Edit Card
  isCardVisible: boolean = false;
  //dataSource = new MatTableDataSource<UserCrud>(USER_DATA);
  dataSource = new MatTableDataSource<UserCrud>([]);
  selectedUser: UserCrud = { id: 0, userName: '', email: '', password: '' };
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private userService: UserService){ }

  ngOnInit(){
      this.userService.getAll().subscribe(
        data => {
          this.userList = data;
          this.dataSource = new MatTableDataSource<UserCrud>(this.userList);
          this.dataSource.paginator = this.paginator;
        },
        error => {
          console.log(error);
        }
      )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  toggleCardVisibility() {
    this.isCardVisible = !this.isCardVisible;
  }

  editUser(user: UserCrud) {
    this.selectedUser = user;
  }

  saveChanges() {
    this.userService.update(this.selectedUser.id, this.selectedUser.userName, this.selectedUser.email).subscribe(
      () => {
        console.log('Usuario actualizado exitosamente');
        this.selectedUser = {id: 0, userName: '', email: '', password: '' };
      },
      error => {
        console.log('Error al actualizar el usuario: ',error);
      }
    )
  }

  cancelEdit() {
    this.selectedUser = { id: 0, userName: '', email: '', password: '' };
  }
  
  deleteUser() {
    this.userService.delete(this.selectedUser.id);
    this.selectedUser = { id: 0, userName: '', email: '', password: '' };
  }

}

const USER_DATA: UserCrud[] = [
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
