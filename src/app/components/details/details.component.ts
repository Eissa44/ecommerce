import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/shared/interfaces/product';
import { ApidataService } from 'src/app/core/shared/services/apidata.service';
import { CartService } from 'src/app/core/shared/services/cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ApidataService: ApidataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  productDetails: Product = {} as Product;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        let idProduct: any = param.get('id');

        this._ApidataService.getProductId(idProduct).subscribe({
          next: (response) => {
            this.productDetails = response.data;
            // console.log(response.data);
          },
        });
      },
    });
  }

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
