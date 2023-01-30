import { NgModule } from '@angular/core';
import { DocumentsStatusPipe } from './pipes/documents-status.pipe';

const declarations = [DocumentsStatusPipe];

@NgModule({
  declarations,
  exports: declarations,
})
export class DocumentsSharedModule {}
