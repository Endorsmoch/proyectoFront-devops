import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserCrudComponent } from './user-crud.component';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';


describe('UserCrudComponent', () => {
  let component: UserCrudComponent;
  let fixture: ComponentFixture<UserCrudComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCrudComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule,MatToolbarModule],
      providers: [UserService],
    }).compileComponents();
  });  

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCrudComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data on initialization', () => {
    const mockUserData = [
      { id: 1, userName: 'John', email: 'john@example.com', password: 'password' },
      { id: 2, userName: 'Jane', email: 'jane@example.com', password: 'password' },
    ];
    spyOn(userService, 'getAll').and.returnValue(of(mockUserData));

    component.ngOnInit();

    expect(userService.getAll).toHaveBeenCalled();
    expect(component.userList).toEqual(mockUserData);
    expect(component.dataSource.data).toEqual(mockUserData);
    // Add more assertions as needed
  });

  // Add more test cases for other component methods and functionalities

});
