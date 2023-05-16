import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 

import { CommentCrudComponent } from './comment-crud.component';

describe('CommentCrudComponent', () => {
  let component: CommentCrudComponent;
  let fixture: ComponentFixture<CommentCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentCrudComponent ],
      imports: [ReactiveFormsModule, MatTableModule, MatPaginatorModule, MatIconModule,MatToolbarModule, BrowserAnimationsModule,HttpClientModule], 
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
