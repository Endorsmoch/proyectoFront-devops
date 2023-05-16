import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let productService: ProductService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    productService = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should get all products', () => {
    const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    productService.getAll().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });
    const req = httpMock.expectOne('http://localhost:8000/api/store/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should update a product', () => {
    const mockProduct = { id: 1, name: 'Updated Product' };
    productService.update(1, 'Updated Product', 'Updated Description', 'Updated Manufacturer', 10, 100).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });
    const req = httpMock.expectOne('http://localhost:8000/api/store/products/1?_method=PUT');
    expect(req.request.method).toBe('PUT');
    req.flush(mockProduct);
  });

  it('should create a product', () => {
    const mockProduct = { id: 1, name: 'New Product' };
    productService.create('New Product', 'New Description', 'New Manufacturer', 20, 200).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });
    const req = httpMock.expectOne('http://localhost:8000/api/store/products');
    expect(req.request.method).toBe('POST');
    req.flush(mockProduct);
  });

  it('should delete a product', () => {
    productService.delete(1).subscribe();
    const req = httpMock.expectOne('http://localhost:8000/api/store/products/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
