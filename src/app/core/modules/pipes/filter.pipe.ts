import { Pipe, PipeTransform } from '@angular/core';
import { isNullish } from '@core/handlers/condition.handlers';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform<T extends object = any>(
    array: T[],
    field: keyof T,
    findStr: string
  ) {
    if (isNullish(findStr)) return array;
    else {
      return array.filter((item: T) => {
        const itemValue: string = String(item[field]).toLocaleLowerCase();
        const stringValue: string = String(findStr).toLocaleLowerCase();

        return itemValue.includes(stringValue);
      });
    }
  }
}
