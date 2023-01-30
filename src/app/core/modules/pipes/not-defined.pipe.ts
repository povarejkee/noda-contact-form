import { Pipe, PipeTransform } from '@angular/core';
import { isNullish } from '@core/handlers/condition.handlers';

@Pipe({
  name: 'notDefined',
})
export class NotDefinedPipe implements PipeTransform {
  transform(value: any) {
    return isNullish(value);
  }
}
