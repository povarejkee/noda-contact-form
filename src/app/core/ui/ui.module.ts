import { NgModule } from '@angular/core';
import { RolesModule } from '@core/ui/roles/roles.module';
import { DeactivateModule } from './deactivate/deactivate.module';
import { DownloadModule } from './download/download.module';
import { FileModule } from './file/file.module';
import { InstructionsModule } from './instructions/instructions.module';
import { PopupModule } from './popup/popup.module';
import { TableModule } from './table/table.module';
import { CommentsModule } from './comments/comments.module';

const imports = [
  PopupModule,
  TableModule,
  FileModule,
  DeactivateModule,
  RolesModule,
  DownloadModule,
  InstructionsModule,
  CommentsModule,
];

@NgModule({
  imports,
  exports: imports,
})
export class UIModule {}
