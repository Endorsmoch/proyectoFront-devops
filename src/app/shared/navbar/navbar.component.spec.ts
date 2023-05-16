import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { of } from 'rxjs';
import { NavbarComponent } from './navbar.component';
import { AuthService } from 'src/app/services/auth.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MatToolbarModule],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should logout user', () => {
    spyOn(authService, 'logout').and.returnValue(of({}));
    spyOn(localStorage, 'removeItem');
    spyOn(component['router'], 'navigate');

    component.logout();
    expect(authService.logout).toHaveBeenCalled();
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(component['router'].navigate).toHaveBeenCalledWith(['/login']);
  });
});
