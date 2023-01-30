import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'symbollimit',
})
export class SymbolLimit implements PipeTransform {
  transform(value: unknown, limit: number, endsWith: string = '...') {
    if (String(value).length > limit) {
      return String(value).slice(0, limit).concat(endsWith);
    }
    return value;
  }
}
