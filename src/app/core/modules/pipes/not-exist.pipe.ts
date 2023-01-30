import { Pipe } from '@angular/core';
import { ExistPipe } from './exist.pipe';

@Pipe({
  name: 'notExist',
})
export class NotExistPipe extends ExistPipe {
  override transform(...args: [any, any[]]): boolean {
    return !super.transform(...args);
  }
}
