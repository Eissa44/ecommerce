import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {}

  userData: any;

  setRegister(userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://route-ecommerce.onrender.com/api/v1/auth/signup`,
      userData
    );
  }

  setLogin(userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://route-ecommerce.onrender.com/api/v1/auth/signin`,
      userData
    );
  }

  decodeUserDats() {
    if (localStorage.getItem('loginToken') != null) {
      let encodeToken: any = localStorage.getItem('loginToken');
      let decodeToken = jwtDecode(encodeToken);
      this.userData = decodeToken;
    }
  }

  logOut(): void {
    localStorage.removeItem('loginToken');

    this._Router.navigate(['/login']);
  }
}
