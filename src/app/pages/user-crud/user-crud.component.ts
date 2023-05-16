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
