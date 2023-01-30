import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'map',
})
export class MapPipe implements PipeTransform {
  transform(value: any, mapHandler: Function, ...args: any[]) {
    return mapHandler ? mapHandler(value, ...args) : value;
  }
}
