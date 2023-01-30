import { Pipe, PipeTransform } from '@angular/core';
import { filename } from '../handlers/file.handlers';

@Pipe({
  name: 'filename',
})
export class FileNamePipe implements PipeTransform {
  public transform(value: string): string {
    return filename(value);
  }
}
