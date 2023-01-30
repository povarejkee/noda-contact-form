import { Pipe, PipeTransform } from '@angular/core';
import { ExtractValues, JSDataType } from '@core/types/libs.types';

type ParseTypes =
  | ExtractValues<JSDataType, 'string' | 'number' | 'boolean'>
  | 'date'
  | 'array'
  | 'json'
  | 'stringify';

@Pipe({
  name: 'toType',
})
export class TypeParser implements PipeTransform {
  transform(value: unknown, type: ParseTypes): any {
    switch (type) {
      case 'string':
        return String(value);
      case 'number':
        return Number(value);
      case 'boolean':
        return Boolean(value);
      case 'date':
        return new Date(value as string | number);
      case 'array':
        return Array.from(value as Iterable<unknown>);
      case 'json':
        return JSON.parse(value as any);
      case 'stringify':
        return JSON.stringify(value as any);
      default:
        return value;
    }
  }
}
