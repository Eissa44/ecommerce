import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buy',
})
export class BuyPipe implements PipeTransform {
  transform(text: string, limet: number): string {
    return text.split(' ').slice(0, 2).join(' ');
  }
}
