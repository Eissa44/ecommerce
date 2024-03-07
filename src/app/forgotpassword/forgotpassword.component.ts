import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ForgotpassService } from '../core/shared/services/forgotpass.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent {
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  errorSms: string = '';
  email: string = '';

  constructor(
    private _ForgotpassService: ForgotpassService,
    private _Router: Router
  ) {}

  forgotForm: FormGroup = new FormGroup({
    email: new FormControl(''),
  });

  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(''),
  });

  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    newPassword: new FormControl(''),
  });

  forgotPass(): void {
    let userEmail = this.forgotForm.value;
    this.email = userEmail.email;
    this._ForgotpassService.forgotpass(userEmail).subscribe({
      next: (response) => {
        console.log(response);
        this.errorSms = response.message;
        this.step1 = false;
        this.step2 = true;
      },
      error: (err) => {
        this.errorSms = err.error.message;
      },
    });
  }

  resetCode(): void {
    let userCode = this.resetCodeForm.value;
    this._ForgotpassService.resetCode(userCode).subscribe({
      next: (response) => {
        console.log(response);
        this.errorSms = response.status;
        this.step2 = false;
        this.step3 = true;
      },
      error: (err) => {
        this.errorSms = err.error.message;
      },
    });
  }

  resetPass(): void {
    let userPass = this.resetPasswordForm.value;
    userPass.email = this.email;

    this._ForgotpassService.resetPassword(userPass).subscribe({
      next: (response) => {
        console.log(response);
        if (response?.token) {
          localStorage.setItem('loginToken', response.token);
          this._Router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.errorSms = err.error.message;
      },
    });
  }
}
