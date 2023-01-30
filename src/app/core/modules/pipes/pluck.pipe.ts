import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluck',
})
export class PluckPipe implements PipeTransform {
  public transform<T extends object = any>(value: T, key: keyof T) {
    return Boolean(value) ? value[key] : null;
  }
}
