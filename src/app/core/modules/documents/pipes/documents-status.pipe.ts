import { Pipe, PipeTransform } from '@angular/core';
import { EnDocumentsStatus } from '@store/modules/documents/enums/documents.enums';

@Pipe({
  name: 'documentStatus',
})
export class DocumentsStatusPipe implements PipeTransform {
  public transform(value: number) {
    return EnDocumentsStatus[value];
  }
}
