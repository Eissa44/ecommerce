import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {}

  msgError: string = '';
  isLoading: boolean = false;

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],

    password: [
      null,
      [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)],
    ],
  });

  handelForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;

      this._AuthService.setLogin(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            this.isLoading = false;
            localStorage.setItem('loginToken', response.token);
            this._AuthService.decodeUserDats();
            this._Router.navigate(['/home']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          this.isLoading = false;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
