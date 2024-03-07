import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './core/shared/interfaces/product';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], word: string): Product[] {
    return products.filter((product) =>
      product.title.toLowerCase().includes(word.toLowerCase())
    );
  }
}
