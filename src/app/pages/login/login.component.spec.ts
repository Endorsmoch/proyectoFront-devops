import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/services/auth.service';
import { Crypto } from 'src/app/util/crypto';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let crypto: Crypto;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService, Crypto]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    crypto = TestBed.inject(Crypto); 
  });

  it('should log in user', () => {
    const mockResponse = { access_token: 'mock-token' };
    spyOn(authService, 'login').and.returnValue(of(mockResponse));
    spyOn(localStorage, 'setItem');
    spyOn(component['router'], 'navigate');

    const form = new FormGroup({
      email: new FormControl('test@example.com'),
      password: new FormControl('password123')
    });
    component['loginForm'] = form;
    component.onSubmit();

    const encryptedPassword = crypto.encrypted('password123');
    expect(authService.login).toHaveBeenCalledWith('test@example.com', encryptedPassword);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mock-token');
    expect(component['router'].navigate).toHaveBeenCalledWith(['/']);
  });
});
