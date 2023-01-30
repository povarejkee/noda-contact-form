import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

type TSanitizer = 'html' | 'resource-url' | 'script' | 'style' | 'url';

@Pipe({
  name: 'sanitize',
})
export class SanitizerPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  public transform(value: any, type: TSanitizer): SafeResourceUrl | null {
    if (!value) return null;

    switch (type) {
      case 'html': {
        return this.sanitizer.bypassSecurityTrustHtml(value);
      }
      case 'resource-url': {
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      }
      case 'script': {
        return this.sanitizer.bypassSecurityTrustScript(value);
      }
      case 'style': {
        return this.sanitizer.bypassSecurityTrustStyle(value);
      }
      case 'url': {
        return this.sanitizer.bypassSecurityTrustUrl(value);
      }
      default: {
        throw new Error('Invalid sanitize type');
      }
    }
  }
}
