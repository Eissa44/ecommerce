import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/shared/interfaces/product';
import { ApidataService } from 'src/app/core/shared/services/apidata.service';
import { CartService } from 'src/app/core/shared/services/cart.service';
import { WishlistService } from 'src/app/core/shared/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _ApidataService: ApidataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService
  ) {}

  Products: Product[] = [];
  PopularCategories: any[] = [];
  searchTerm: string = '';
  wishlistData: string[] = [];

  ngOnInit(): void {
    // START OF ALL PRODUCTS
    this._ApidataService.getAllProducts().subscribe({
      next: (response) => {
        this.Products = response.data;
      },
    });

    // START OF POPULAR GATEGORIES
    this._ApidataService.getPopularGategories().subscribe({
      next: (response) => {
        this.PopularCategories = response.data;
      },
    });

    this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        const newData = response.data.map((item: any) => item._id);
        this.wishlistData = newData;
      },
    });
  }

  // START OF CAROUSEL
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };

  mainOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

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

  addWishlist(idProduct: string): void {
    this._WishlistService.addToWishlist(idProduct).subscribe({
      next: (response) => {
        this.wishlistData = response.data;
        this._ToastrService.success(response.message, 'Fresh Cart');
      },
    });
  }

  removeWishlist(idProduct: string): void {
    this._WishlistService.removeFromWish(idProduct).subscribe({
      next: (response) => {
        this.wishlistData = response.data;
        this._ToastrService.success(response.message, 'Fresh Cart');
      },
    });
  }
}
