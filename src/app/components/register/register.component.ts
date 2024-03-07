import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {}

  msgError: string = '';
  isLoading: boolean = false;

  registerForm: FormGroup = this._FormBuilder.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],

      email: ['', [Validators.required, Validators.email]],

      password: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)],
      ],

      rePassword: [
        '',
        // [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)],
      ],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    },
    { validators: [this.confirmPassword] } as FormControlOptions
  );

  handelForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;

      this._AuthService.setRegister(this.registerForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            this.isLoading = false;
            this._Router.navigate(['/login']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          this.isLoading = false;
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  confirmPassword(group: FormGroup): void {
    const password = group.get('password');
    const rePassword = group.get('rePassword');

    if (rePassword?.value === '') {
      rePassword.setErrors({ required: true });
    } else if (password?.value != rePassword?.value) {
      rePassword?.setErrors({ mismatch: true });
    }
  }
}
