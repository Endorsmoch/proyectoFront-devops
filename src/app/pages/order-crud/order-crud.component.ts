import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderCrud } from 'src/app/interfaces/order-crud';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-crud',
  templateUrl: './order-crud.component.html',
  styleUrls: ['./order-crud.component.css']
})
export class OrderCrudComponent implements AfterViewInit, OnInit{
  orderList: OrderCrud[] = [];
  displayedColumns: string[] = ['id', 'idUser', 'idProduct', 'amount', 'paymentDate', 'paymentMethod', 'acciones'];

  //Edit Card
  isEditionCardVisible: boolean = false;

  //Creation Card
  isCreationCardVisible: boolean = false;

  //Deletion Card
  isDeletionCardVisible: boolean = false;

  dataSource = new MatTableDataSource<OrderCrud>([]);
  selectedOrder: OrderCrud = { id: 0, idUser:0, idProduct: 0, amount: 0, paymentDate:'', paymentMethod: '' };

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private orderService: OrderService){ }

  ngOnInit(){
    this.orderService.getAll().subscribe(
      data => {
        this.orderList = data;
        this.dataSource = new MatTableDataSource<OrderCrud>(this.orderList);
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

  editOrder(order: OrderCrud) {
    this.selectedOrder = order;
  }

  createOrder() {
    this.orderService.create(this.selectedOrder.idUser, this.selectedOrder.idProduct, this.selectedOrder.amount, this.selectedOrder.paymentMethod).subscribe(
      () => {
        console.log('Orden creada exitosamente');
        this.selectedOrder = { id: 0, idUser:0, idProduct: 0, amount: 0, paymentDate:'', paymentMethod: '' };
        location.reload();
      },
      error => {
        console.log('Error al crear la orden: ', error);
      }
    )
  }

  saveChanges() {
    this.orderService.update(this.selectedOrder.id, this.selectedOrder.idUser, this.selectedOrder.idProduct, this.selectedOrder.amount, this.selectedOrder.paymentDate, this.selectedOrder.paymentMethod).subscribe(
      () => {
        console.log('Orden actualizada exitosamente');
        this.selectedOrder = { id: 0, idUser:0, idProduct: 0, amount: 0, paymentDate:'', paymentMethod: '' };
      },
      error => {
        console.log('Error al actualizar la orden: ',error);
      }
    )   
  }

  cancelEdit() {
    this.selectedOrder = { id: 0, idUser:0, idProduct: 0, amount: 0, paymentDate:'', paymentMethod: '' };
  }

  deleteOrder() {
    this.orderService.delete(this.selectedOrder.id).subscribe(
      () => {
        console.log('Orden eliminada exitosamente');
        this.selectedOrder = { id: 0, idUser:0, idProduct: 0, amount: 0, paymentDate:'', paymentMethod: '' };
        location.reload();
      },
      error => {
        console.log('Error al eliminar la orden: ', error);
      }
    )
  }
}
