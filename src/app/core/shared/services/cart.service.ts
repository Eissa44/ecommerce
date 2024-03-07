import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}

  // cartToken: any = { token: localStorage.getItem('loginToken') };

  addToCart(productId: string): Observable<any> {
    let cartObject: object = { productId: productId };
    return this._HttpClient.post(
      `https://route-ecommerce.onrender.com/api/v1/cart`,
      cartObject
    );
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get(
      `https://route-ecommerce.onrender.com/api/v1/cart`
    );
  }

  deletItem(productId: string): Observable<any> {
    return this._HttpClient.delete(
      `https://route-ecommerce.onrender.com/api/v1/cart/${productId}  `
    );
  }

  updateCart(productId: string, count: number): Observable<any> {
    return this._HttpClient.put(
      `https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
      { count: count }
    );
  }

  checkOut(cartId: string, userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress: userData,
      }
    );
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(
      `https://route-ecommerce.onrender.com/api/v1/cart  `
    );
  }
}
