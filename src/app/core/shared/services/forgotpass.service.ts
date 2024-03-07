import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgotpassService {
  constructor(private _HttpClient: HttpClient) {}

  forgotpass(usrEmail: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      usrEmail
    );
  }

  resetCode(resetCode: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      resetCode
    );
  }

  resetPassword(resetpass: object): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      resetpass
    );
  }
}
