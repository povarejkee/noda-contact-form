import { Directive, HostListener, Input } from '@angular/core';
import { redirectTo } from '@core/handlers/utility.handlers';

@Directive({
  selector: '[ngLink]',
})
export class LinkDirective {
  @Input('ngLink') private url: string;

  @HostListener('click')
  private navigate(): void {
    if (this.url) {
      redirectTo(this.url);
    }
  }
}
