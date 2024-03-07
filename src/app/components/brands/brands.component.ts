import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/core/shared/services/brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  constructor(private _BrandsService: BrandsService) {}
  brands: any[] = [];

  ngOnInit(): void {
    this._BrandsService.getBrands().subscribe({
      next: (response) => {
        console.log(response.data);
        this.brands = response.data;
      },
    });
  }

  // getBrands():void{

  // }
}
