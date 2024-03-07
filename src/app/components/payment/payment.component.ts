import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/core/shared/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private _FormBuilder: FormBuilder,
    private _HttpClient: HttpClient,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService
  ) {}

  cartId: any = '';

  checkout: FormGroup = this._FormBuilder.group({
    details: [''],
    phone: [''],
    city: [''],
  });

  handelForm(): void {
    console.log(this.checkout.value);

    this._CartService.checkOut(this.cartId, this.checkout.value).subscribe({
      next: (response) => {
        // console.log(response);
        if (response.status === 'success') {
          window.open(response.session.url, 'self');
        }
      },
    });
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        console.log(param.get('id'));
        this.cartId = param.get('id');
      },
    });
  }
}
