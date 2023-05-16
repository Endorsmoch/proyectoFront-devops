import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon'; 
import { of } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProductCrudComponent } from './product-crud.component';
import { ProductService } from 'src/app/services/product.service';
import { ProductCrud } from 'src/app/interfaces/product-crud';

describe('ProductCrudComponent', () => {
  let component: ProductCrudComponent;
  let fixture: ComponentFixture<ProductCrudComponent>;
  let productService: ProductService;
  let mockProductService: Partial<ProductService> = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCrudComponent],
      imports: [ReactiveFormsModule, MatTableModule, MatPaginatorModule, MatIconModule,MatToolbarModule, BrowserAnimationsModule], 
      providers: [{ provide: ProductService, useValue: mockProductService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCrudComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
  });

  it('should fetch product data on initialization', () => {
    const mockProductData: ProductCrud[] = [
      {
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        manufacturer: 'Manufacturer 1',
        price: 10,
        stock: 5,
      },
    ];
    mockProductService.getAll = jasmine.createSpy().and.returnValue(of(mockProductData));
    fixture.detectChanges(); 
    expect(productService.getAll).toHaveBeenCalled();
    expect(component.productList).toEqual(mockProductData);
    expect(component.dataSource.data).toEqual(mockProductData);
  });
});

