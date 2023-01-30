import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean',
})
export class BooleanPipe implements PipeTransform {
  transform(value: any, type: 'default' | 'reverse' = 'default'): boolean {
    const booleanValue: boolean = Boolean(value);

    return type === 'reverse' ? !booleanValue : booleanValue;
  }
}
