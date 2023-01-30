import { Pipe, PipeTransform } from '@angular/core';
import { isEqual, isNullish } from '@core/handlers/condition.handlers';

@Pipe({
  name: 'defaultValue',
})
export class DefaultValuePipe implements PipeTransform {
  transform(value: any, defaultValue: any): any {
    const isShowDefaultValue: boolean = isNullish(value) || isEqual(value, '');

    return isShowDefaultValue ? defaultValue : value;
  }
}
