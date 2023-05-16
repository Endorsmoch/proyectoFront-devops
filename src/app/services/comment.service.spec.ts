import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentService } from './comment.service';

describe('CommentService', () => {
  let commentService: CommentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentService]
    });
    commentService = TestBed.inject(CommentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get all comments', () => {
    const mockComments = [
      { id: 1, idProduct: 1, idUser: 1, date: '2023-05-17', text: 'Comment 1', likes: 5 },
      { id: 2, idProduct: 1, idUser: 2, date: '2023-05-18', text: 'Comment 2', likes: 10 }
    ];

    commentService.getAll().subscribe(comments => {
      expect(comments).toEqual(mockComments);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/store/comments');
    expect(req.request.method).toBe('GET');
    req.flush(mockComments);
  });

  it('should update a comment', () => {
    const mockComment = { id: 1, idProduct: 1, idUser: 1, date: '2023-05-17', text: 'Updated Comment', likes: 10 };

    commentService.update(1, 1, 1, '2023-05-17', 'Updated Comment', 10).subscribe(comment => {
      expect(comment).toEqual(mockComment);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/store/comment/1?_method=PUT');
    expect(req.request.method).toBe('PUT');
    req.flush(mockComment);
  });

  it('should create a comment', () => {
    const mockComment = { id: 1, idProduct: 1, idUser: 1, date: '2023-05-17', text: 'New Comment', likes: 0 };

    commentService.create(1, 1, 'New Comment', 0).subscribe(comment => {
      expect(comment).toEqual(mockComment);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/store/comments');
    expect(req.request.method).toBe('POST');
    req.flush(mockComment);
  });

  it('should delete a comment', () => {
    commentService.delete(1).subscribe();

    const req = httpMock.expectOne('http://localhost:8000/api/store/comment/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
