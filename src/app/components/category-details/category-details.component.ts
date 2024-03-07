import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApidataService } from 'src/app/core/shared/services/apidata.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
})
export class CategoryDetailsComponent implements OnInit {
  constructor(
    private _ApidataService: ApidataService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  categoryId: string | null = '';
  categoryDetails = {
    image: '',
    name: '',
  };

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.categoryId = param.get('id');
      },
    });

    this._ApidataService.getGategoriesDetails(this.categoryId).subscribe({
      next: (response) => {
        console.log(response);
        this.categoryDetails = response.data;
      },
    });
  }
}
