import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let orderService: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService]
    });
    orderService = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get all orders', () => {
    const mockOrders = [{ id: 1, name: 'Order 1' }, { id: 2, name: 'Order 2' }];

    orderService.getAll().subscribe(orders => {
      expect(orders).toEqual(mockOrders);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/store/orders');
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);
  });

  it('should update an order', () => {
    const mockOrder = { id: 1, name: 'Updated Order' };

    orderService.update(1, 1, 1, 10, '2023-05-17', 'Credit Card').subscribe(order => {
      expect(order).toEqual(mockOrder);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/store/order/1?_method=PUT');
    expect(req.request.method).toBe('PUT');
    req.flush(mockOrder);
  });

  it('should create an order', () => {
    const mockOrder = { id: 1, name: 'New Order' };

    orderService.create(1, 1, 10, 'Credit Card').subscribe(order => {
      expect(order).toEqual(mockOrder);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/store/orders');
    expect(req.request.method).toBe('POST');
    req.flush(mockOrder);
  });

  it('should delete an order', () => {
    orderService.delete(1).subscribe();

    const req = httpMock.expectOne('http://localhost:8000/api/store/order/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
