import { Pipe, PipeTransform } from '@angular/core';
import { isDate, isJSType } from '@core/handlers/condition.handlers';
import { JSDataType } from '@core/types/libs.types';

@Pipe({
  name: 'isJSType',
})
export class JSTypePipe implements PipeTransform {
  transform(value: any, type: JSDataType | 'date'): boolean {
    switch (type) {
      case 'date': {
        return isDate(value);
      }
      default: {
        return isJSType(value, type);
      }
    }
  }
}
