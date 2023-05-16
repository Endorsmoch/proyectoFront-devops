import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from 'src/app/services/auth.service';
import { Crypto } from 'src/app/util/crypto';
import { of } from 'rxjs';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let crypto: Crypto;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService, Crypto]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    crypto = TestBed.inject(Crypto); 
  });

  it('should register a new user', () => {
    const mockResponse = { success: true };
    spyOn(authService, 'register').and.returnValue(of(mockResponse));
    spyOn(component['router'], 'navigate');

    const form = new FormGroup({
      userName: new FormControl('testuser'),
      email: new FormControl('test@example.com'),
      password: new FormControl('password123')
    });
    component['registerForm'] = form;
    component.onSubmit();

    const encryptedPassword = crypto.encrypted('password123');
    expect(authService.register).toHaveBeenCalledWith('testuser', 'test@example.com', encryptedPassword);
    expect(component['router'].navigate).toHaveBeenCalledWith(['/login']);
  });
});
