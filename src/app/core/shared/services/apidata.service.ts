import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApidataService {
  constructor(private _HttpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this._HttpClient.get(
      `https://route-ecommerce.onrender.com/api/v1/products`
    );
  }

  getProductId(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://route-ecommerce.onrender.com/api/v1/products/${id}`
    );
  }

  getPopularGategories(): Observable<any> {
    return this._HttpClient.get(
      `https://route-ecommerce.onrender.com/api/v1/categories`
    );
  }

  getGategoriesDetails(id: string | null): Observable<any> {
    return this._HttpClient.get(
      `https://route-ecommerce.onrender.com/api/v1/categories/${id}`
    );
  }
}
