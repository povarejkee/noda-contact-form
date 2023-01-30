import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pick',
})
export class PickPipe implements PipeTransform {
  transform<T extends object, K extends Array<keyof T>>(
    value: T,
    keys: K,
  ): Pick<T, K[number]> {
    return keys.reduce((accum, key: keyof T) => {
      accum[key] = value[key];

      return accum;
    }, {} as Pick<T, K[number]>);
  }
}
