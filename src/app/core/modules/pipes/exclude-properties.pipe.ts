import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excludeProps',
})
export class ExcludePropertiesPipe implements PipeTransform {
  transform<T extends object, K extends Array<keyof T>>(object: T, props: K) {
    if (!object || !props?.length) return {};

    type TPartObject = { [Q in K[number]]: T[Q] };

    return Object.entries(object).reduce((accum, [key, value]) => {
      const isExclude: boolean = props.includes(key as keyof T);
      if (!isExclude) {
        accum[key as keyof T] = value;
      }

      return accum;
    }, {} as TPartObject);
  }
}
