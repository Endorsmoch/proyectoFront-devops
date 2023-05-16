import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressCrudComponent } from './address-crud.component';
import { AddressService } from 'src/app/services/address.service';
import { of } from 'rxjs';

import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 


describe('AddressCrudComponent', () => {
  let component: AddressCrudComponent;
  let fixture: ComponentFixture<AddressCrudComponent>;
  let addressService: AddressService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressCrudComponent],
      imports: [ReactiveFormsModule, MatTableModule, MatPaginatorModule, MatIconModule,MatToolbarModule, BrowserAnimationsModule,HttpClientModule], 
      providers: [AddressService],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressCrudComponent);
    component = fixture.componentInstance;
    addressService = TestBed.inject(AddressService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
