import { Pipe, PipeTransform } from '@angular/core';
import { prefix, suffix } from '@core/handlers/string.handlers';

@Pipe({
  name: 'affix',
})
export class AffixPipe implements PipeTransform {
  transform(
    value: string | number,
    tag: string | number,
    placement: 'begin' | 'end' = 'end'
  ) {
    const transformer = placement === 'end' ? suffix : prefix;

    return transformer(String(value), String(tag));
  }
}
