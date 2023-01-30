import { Pipe, PipeTransform } from '@angular/core';
import { isNotNullish } from '@core/handlers/condition.handlers';

@Pipe({
  name: 'defined',
})
export class DefinedPipe implements PipeTransform {
  transform(value: unknown): boolean {
    return isNotNullish(value);
  }
}
