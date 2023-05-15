import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCrudComponent } from './comment-crud.component';

describe('CommentCrudComponent', () => {
  let component: CommentCrudComponent;
  let fixture: ComponentFixture<CommentCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentCrudComponent ]
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
