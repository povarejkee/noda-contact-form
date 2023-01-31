import { NgModule } from '@angular/core';
import { DownloadDirective } from '@core/ui/download/directives/download.directive';
import { DownloadButtonComponent } from './components/download-button/download-button.component';
import { DownloadIconComponent } from './components/download-icon/download-icon.component';
import { DownloadService } from './services/download.service';

const declarations = [
  DownloadDirective,
  DownloadButtonComponent,
  DownloadIconComponent,
];

@NgModule({
  declarations,
  providers: [DownloadService],
  exports: declarations,
})
export class DownloadModule {}
