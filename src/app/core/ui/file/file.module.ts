import { NgModule } from '@angular/core';
import { ComponentsModule } from '@core/modules/components/components.module';
import { CoreModule } from '@core/modules/core.module';
import { MaterialModule } from '@core/modules/material/material.module';
import { PipesModule } from '@core/modules/pipes/pipes.module';
import { DownloadModule } from '../download/download.module';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { FileNamePipe } from './pipes/filename.pipe';

const declarations = [UploadFileComponent, FileNamePipe];

@NgModule({
  declarations,
  imports: [
    CoreModule,
    PipesModule,
    ComponentsModule,
    MaterialModule,
    DownloadModule,
  ],
  exports: declarations,
})
export class FileModule {}
