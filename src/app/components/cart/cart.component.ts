import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private _CartService: CartService) {}

  cartDetails: any = {};

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        // console.log(response.data);
        this.cartDetails = response.data;
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }

  removeCartItem(itemId: string): void {
    this._CartService.deletItem(itemId).subscribe({
      next: (response) => {
        this.cartDetails = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  count(itemId: string, count: number): void {
    if (count > 0) {
      this._CartService.updateCart(itemId, count).subscribe({
        next: (response) => {
          console.log(response);
          this.cartDetails = response.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  clear(): void {
    this._CartService.clearCart().subscribe({
      next: (response) => {
        console.log(response);
        if (response.message === 'success') {
          this.cartDetails = {};
        }
      },
    });
  }
}
