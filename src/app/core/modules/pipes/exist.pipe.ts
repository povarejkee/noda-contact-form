import { Pipe } from '@angular/core';

@Pipe({
  name: 'exist',
})
export class ExistPipe {
  transform(value: any, array: any[] = []): boolean {
    return array.includes(value);
  }
}
