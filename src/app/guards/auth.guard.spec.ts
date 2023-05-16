import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthGuard, AuthService, Router]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should allow access when user is logged in', async () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(of({ valid: true }));
    spyOn(router, 'navigate');
    const result = await guard.canActivate();
    expect(result).toBeTrue();
    expect(authService.isLoggedIn).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to login page when user is not logged in', async () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(of({ valid: false }));
    spyOn(router, 'navigate');
    const result = await guard.canActivate();
    expect(result).toBeFalse();
    expect(authService.isLoggedIn).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to login page and log error when authentication check fails', async () => {
    const error = new Error('Authentication error');
    spyOn(authService, 'isLoggedIn').and.throwError(error.message);
    spyOn(router, 'navigate');
    spyOn(console, 'error');
    const result = await guard.canActivate();
    expect(result).toBeFalse();
    expect(authService.isLoggedIn).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(console.error).toHaveBeenCalledWith('Error occurred during authentication check:', error);
  });
});