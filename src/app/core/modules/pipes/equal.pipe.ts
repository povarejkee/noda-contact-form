import { Pipe, PipeTransform } from '@angular/core';
import { isEqual } from '@core/handlers/condition.handlers';

@Pipe({
  name: 'equal',
})
export class EqualPipe implements PipeTransform {
  transform(predicate: any, ...values: unknown[]): boolean {
    return values.some((value) => isEqual(predicate, value));
  }
}
