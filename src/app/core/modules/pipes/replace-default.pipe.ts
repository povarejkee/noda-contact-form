import { Pipe, PipeTransform } from '@angular/core';
import { isNotNullish } from '@core/handlers/condition.handlers';

@Pipe({
  name: 'replaceDefault',
})
export class ReplaceDefaultPipe implements PipeTransform {
  transform(value: any, defaultValue: any): any {
    return isNotNullish(value) ? value : defaultValue;
  }
}
