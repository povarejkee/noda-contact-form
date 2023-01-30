import { Directive, HostListener, Input } from '@angular/core';
import { apiUrl } from '@core/api/handlers/api.handlers';
import { TApiUrl } from '@core/api/types/api.types';
import { filename as getFileName } from '@core/ui/file/handlers/file.handlers';
import { DownloadService } from '../services/download.service';
import { TDownload } from '../types/download.types';

@Directive({
  selector: '[ngDownload]',
})
export class DownloadDirective {
  @Input('ngDownload') public predicate: File | string;
  /**
   * @param ngDownloadType equal  "file" ngDownload === File
   * @param ngDownloadType equal  "request" ngDownload === @/{url}
   * @param ngDownloadType equal  "url" ngDownload === https://url.com
   */
  @Input('ngDownloadType') public type: TDownload;
  @Input('ngDownloadName') public filename: string;
  @Input('ngDownloadDisabled') public disabled: boolean = false;

  constructor(private downloadService: DownloadService) {}

  @HostListener('click')
  private download(): void {
    const { predicate, disabled, type, filename } = this;

    if (predicate && !disabled) {
      switch (type) {
        case 'file': {
          this.downloadService.downloadFile(predicate as File, filename);
          break;
        }
        case 'url': {
          this.downloadService.downloadRequest(
            predicate as string,
            filename || getFileName(predicate as string)
          );
          break;
        }
        case 'request': {
          this.downloadService.downloadRequest(
            apiUrl(predicate as TApiUrl),
            filename
          );
          break;
        }
      }
    }
  }
}
