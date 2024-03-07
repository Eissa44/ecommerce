import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private _HttpClient: HttpClient) {}

  // baseUrl: string = `https://route-ecommerce.onrender.com`;

  addToWishlist(idProduct: string): Observable<any> {
    return this._HttpClient.post(
      `https://route-ecommerce.onrender.com/api/v1/wishlist`,
      {
        productId: idProduct,
      }
    );
  }

  getWishlist(): Observable<any> {
    return this._HttpClient.get(
      `https://route-ecommerce.onrender.com/api/v1/wishlist`
    );
  }

  removeFromWish(idProduct: string): Observable<any> {
    return this._HttpClient.delete(
      `https://route-ecommerce.onrender.com/api/v1/wishlist/${idProduct}`
    );
  }
}
