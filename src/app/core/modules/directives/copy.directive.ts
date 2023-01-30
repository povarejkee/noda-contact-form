import { Directive, HostListener, Inject, Input } from '@angular/core';
import { WINDOW, WindowDocument } from '@core/injection/app.tokens';

@Directive({
  selector: '[ngCopy]',
})
export class CopyDirective {
  @Input('ngCopy') text: string;

  @HostListener('click', ['$event'])
  public copy(e: MouseEvent): void {
    e.stopPropagation();
    this.window.navigator.clipboard.writeText(this.text);
  }

  constructor(@Inject(WINDOW) private window: WindowDocument) {}
}
