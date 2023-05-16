import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should retrieve all users', () => {
    const mockUsers = [
      { id: 1, userName: 'user1', email: 'user1@example.com' },
      { id: 2, userName: 'user2', email: 'user2@example.com' }
    ];

    userService.getAll().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpTestingController.expectOne('http://localhost:8000/api/account/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should delete a user', () => {
    const id = 1;

    userService.delete(id).subscribe(() => {
      // Verify that the delete was successful
    });

    const req = httpTestingController.expectOne(`http://localhost:8000/api/account/users/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
