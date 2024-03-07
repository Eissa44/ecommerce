import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/shared/interfaces/product';
import { ApidataService } from 'src/app/core/shared/services/apidata.service';
import { CartService } from 'src/app/core/shared/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  Products: Product[] = [];
  searchTerm: string = '';
  constructor(
    private _ApidataService: ApidataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this._ApidataService.getAllProducts().subscribe({
      next: (response) => {
        console.log(response.data);
        this.Products = response.data;
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
