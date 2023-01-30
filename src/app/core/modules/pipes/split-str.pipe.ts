import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitString'
})
export class SplitStringPipe implements PipeTransform {
  transform(value: any, separator: string = ''): string[] {
    return String(value).split(separator);
  }
}