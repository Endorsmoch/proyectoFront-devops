import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressCrud } from 'src/app/interfaces/address-crud';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-address-crud',
  templateUrl: './address-crud.component.html',
  styleUrls: ['./address-crud.component.css']
})
export class AddressCrudComponent {
  addressList: AddressCrud[] = [];
  displayedColumns: string[] = ['id', 'idUser', 'houseNum', 'street', 'city', 'state', 'country', 'postalCode', 'acciones'];

  //Edit Card
  isEditionCardVisible: boolean = false;

  //Creation Card
  isCreationCardVisible: boolean = false;

  //Deletion Card
  isDeletionCardVisible: boolean = false;

  dataSource = new MatTableDataSource<AddressCrud>([]);
  selectedAddress: AddressCrud = { id: 0, idUser:0, houseNum: '', street: '', city: '', state: '', country: '', postalCode: '' };

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private addressService: AddressService){ }

  ngOnInit(){
    this.addressService.getAll().subscribe(
      data => {
        this.addressList = data;
        this.dataSource = new MatTableDataSource<AddressCrud>(this.addressList);
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

  toggleEditionCardVisibility() {
    this.isEditionCardVisible = !this.isEditionCardVisible;
  }

  toggleCreationCardVisibility() {
    this.isCreationCardVisible = !this.isCreationCardVisible;
  }

  toggleDeletionCardVisibility() {
    this.isDeletionCardVisible = !this.isDeletionCardVisible;
  }

  editAddress(address: AddressCrud) {
    this.selectedAddress = address;
  }

  createAddress() {
    this.addressService.create(this.selectedAddress.idUser, this.selectedAddress.houseNum, this.selectedAddress.street, this.selectedAddress.city, this.selectedAddress.state, this.selectedAddress.country, this.selectedAddress.postalCode).subscribe(
      () => {
        console.log('Dirección creada exitosamente');
        this.selectedAddress = { id: 0, idUser:0, houseNum: '', street: '', city: '', state: '', country: '', postalCode: '' };
        location.reload();
      },
      error => {
        console.log('Error al crear la dirección: ', error);
      }
    )
  }

  saveChanges() {
    this.addressService.update(this.selectedAddress.id, this.selectedAddress.idUser, this.selectedAddress.houseNum, this.selectedAddress.street, this.selectedAddress.city, this.selectedAddress.state, this.selectedAddress.country, this.selectedAddress.postalCode).subscribe(
      () => {
        console.log('Dirección actualizada exitosamente');
        this.selectedAddress = { id: 0, idUser:0, houseNum: '', street: '', city: '', state: '', country: '', postalCode: '' };
      },
      error => {
        console.log('Error al actualizar la dirección: ',error);
      }
    )   
  }

  cancelEdit() {
    this.selectedAddress = { id: 0, idUser:0, houseNum: '', street: '', city: '', state: '', country: '', postalCode: '' };
  }

  deleteAddress() {
    this.addressService.delete(this.selectedAddress.id).subscribe(
      () => {
        console.log('Dirección eliminada exitosamente');
        this.selectedAddress = { id: 0, idUser:0, houseNum: '', street: '', city: '', state: '', country: '', postalCode: '' };
        location.reload();
      },
      error => {
        console.log('Error al eliminar la dirección: ', error);
      }
    )
  }
}
