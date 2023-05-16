import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCrudComponent } from './order-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('OrderCrudComponent', () => {
  let component: OrderCrudComponent;
  let fixture: ComponentFixture<OrderCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCrudComponent ],
      imports: [ReactiveFormsModule, MatTableModule, MatPaginatorModule, MatIconModule,MatToolbarModule, BrowserAnimationsModule,HttpClientModule], 

    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
