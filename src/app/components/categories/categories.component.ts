import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/shared/interfaces/product';
import { ApidataService } from 'src/app/core/shared/services/apidata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(private _ApidataService: ApidataService) {}

  categoryData: any[] = [];

  ngOnInit(): void {
    this._ApidataService.getPopularGategories().subscribe({
      next: (response) => {
        console.log(response.data);

        this.categoryData = response.data;
      },
    });
  }
}
