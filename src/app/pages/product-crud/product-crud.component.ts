import { AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductCrud } from 'src/app/interfaces/product-crud';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements AfterViewInit, OnInit{
  productList: ProductCrud[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'manufacturer', 'price', 'stock', 'acciones'];

  //Edit Card
  isEditionCardVisible: boolean = false;

  //Creation Card
  isCreationCardVisible: boolean = false;

  //Deletion Card
  isDeletionCardVisible: boolean = false;
  

  dataSource = new MatTableDataSource<ProductCrud>([]);
  selectedProduct: ProductCrud = { id: 0, name: '', description: '', manufacturer: '', price: 0, stock: 0 };

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private productService: ProductService){ }

  ngOnInit(){
    this.productService.getAll().subscribe(
      data => {
        this.productList = data;
        this.dataSource = new MatTableDataSource<ProductCrud>(this.productList);
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

  editProduct(product: ProductCrud) {
    this.selectedProduct = product;
  }

  createProduct() {
    this.productService.create(this.selectedProduct.name, this.selectedProduct.description, this.selectedProduct.manufacturer, this.selectedProduct.price, this.selectedProduct.stock).subscribe(
      () => {
        console.log('Producto creado exitosamente');
        this.selectedProduct = { id: 0, name: '', description: '', manufacturer: '', price: 0, stock: 0 };
        location.reload();
      },
      error => {
        console.log('Error al crear el producto: ', error);
      }
    )
  }

  saveChanges() {
    this.productService.update(this.selectedProduct.id, this.selectedProduct.name, this.selectedProduct.description, this.selectedProduct.manufacturer, this.selectedProduct.price, this.selectedProduct.stock).subscribe(
      () => {
        console.log('Producto actualizado exitosamente');
        this.selectedProduct = { id: 0, name: '', description: '', manufacturer: '', price: 0, stock: 0 };
      },
      error => {
        console.log('Error al actualizar el producto: ',error);
      }
    )   
  }

  cancelEdit() {
    this.selectedProduct = { id: 0, name: '', description: '', manufacturer: '', price: 0, stock: 0 };
  }
  
  deleteProduct() {
    this.productService.delete(this.selectedProduct.id).subscribe(
      () => {
        console.log('Producto eliminado exitosamente');
        this.selectedProduct = { id: 0, name: '', description: '', manufacturer: '', price: 0, stock: 0 };
        location.reload();
      },
      error => {
        console.log('Error al eliminar el producto: ', error);
      }
    )
  }

}
