import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/shared/interfaces/product';
import { CartService } from 'src/app/core/shared/services/cart.service';
import { WishlistService } from 'src/app/core/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  Products: Product[] = [];
  wishlistData: string[] = [];
  constructor(
    private _WishlistService: WishlistService,
    private _ToastrService: ToastrService,
    private _CartService: CartService
  ) {}

  ngOnInit(): void {
    this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        console.log(response);
        this.Products = response.data;
        const newData = response.data.map((item: any) => item._id);
        this.wishlistData = newData;
      },
    });
  }

  addWishlist(idProduct: string): void {
    this._WishlistService.addToWishlist(idProduct).subscribe({
      next: (response) => {
        console.log(response);
        // this.wishlistData = response.data;
        this._ToastrService.success(response.message, 'Fresh Cart');
      },
    });
  }

  removeWishlist(idProduct: string): void {
    this._WishlistService.removeFromWish(idProduct).subscribe({
      next: (response) => {
        console.log(response);
        this.wishlistData = response.data;
        this._ToastrService.success(response.message, 'Fresh Cart');
      },
    });
  }

  addProduct(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message, 'Fresh Cart');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
