import { Pipe, PipeTransform } from '@angular/core';
import { isJSType } from '@core/handlers/condition.handlers';

@Pipe({
  name: 'endsWith',
})
export class EndsWithPipe implements PipeTransform {
  transform(value: string, suffix: string) {
    if (isJSType(value, 'string')) {
      return value.endsWith(suffix);
    }
    return false;
  }
}
