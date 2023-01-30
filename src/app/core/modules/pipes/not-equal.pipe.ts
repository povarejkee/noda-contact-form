import { Pipe, PipeTransform } from '@angular/core';
import { isNotEqual } from '@core/handlers/condition.handlers';

@Pipe({
  name: 'notEqual',
})
export class NotEqualPipe implements PipeTransform {
  public transform(value: any, compareValue: any) {
    return isNotEqual(value, compareValue);
  }
}
