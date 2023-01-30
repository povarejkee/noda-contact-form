import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'condition',
})
export class ConditionPipe implements PipeTransform {
  transform(condition: any, ifValue: any, elseValue: any) {
    return Boolean(condition) ? ifValue : elseValue;
  }
}
