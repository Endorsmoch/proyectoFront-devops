import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should register a new user', () => {
    const userName = 'testuser';
    const email = 'test@example.com';
    const password = 'password123';

    service.register(userName, email, password).subscribe(response => {
      expect(response).toBeTruthy();
      expect(response.success).toBe(true);
    });

    const request = httpMock.expectOne('http://localhost:8000/api/auth/register');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ userName, email, password });
    request.flush({ success: true });
  });

  it('should log in user', () => {
    const email = 'test@example.com';
    const password = 'password123';

    service.login(email, password).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const request = httpMock.expectOne('http://localhost:8000/api/auth/login');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ email, password });
  });
});
