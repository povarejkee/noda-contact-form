import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { WINDOW, WindowDocument } from '@core/injection/app.tokens';
import { filename as getFileName } from '@core/ui/file/handlers/file.handlers';

@Injectable()
export class DownloadService {
  constructor(
    @Inject(WINDOW) private window: WindowDocument,
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient
  ) {}

  public downloadRequest(url: string, filename: string): void {
    this.http.get(url, { responseType: 'blob' }).subscribe((response: Blob) => {
      const { type } = response;

      const blob: Blob = new Blob([response], { type });
      const fileUrl: string = this.window.URL.createObjectURL(blob);

      this.download(fileUrl, filename);
    });
  }

  public downloadFile(file: File, filename: string): void {
    const url: string = this.window.URL.createObjectURL(file);

    this.download(url, filename);
  }

  public download(url: string, filename: string = getFileName(url)): void {
    const link$: HTMLAnchorElement = this.document.createElement('a');

    link$.setAttribute('href', url);
    link$.setAttribute('download', filename);

    link$.click();
    link$.remove();
  }
}
