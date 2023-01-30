import { NgModule } from '@angular/core';

import { SharedModule } from '@core/modules/shared.module';

import { CommentsModalComponent } from '@core/ui/comments/components/comments-modal/comments-modal.component';
import { CommentsItemComponent } from '@core/ui/comments/components/comments-item/comments-item.component';
import { DocumentsSharedModule } from '@core/modules/documents/documents.shared.module';

const declarations = [CommentsModalComponent, CommentsItemComponent];

@NgModule({
  imports: [SharedModule, DocumentsSharedModule],
  declarations,
  exports: declarations,
})
export class CommentsModule {}
