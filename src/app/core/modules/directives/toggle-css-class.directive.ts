import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { nativeElement } from '@core/handlers/shared.handlers';

@Directive({
  selector: '[ngToggleClass]',
})
export class ToggleCssClassDirective implements OnChanges {
  @Input('ngToggleClass') private ngToggleClass: string;

  constructor(private el$: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    const {
      ngToggleClass: { previousValue, currentValue, firstChange },
    } = changes;

    this.removeClassName(previousValue);

    if (Boolean(currentValue)) {
      firstChange
        ? setTimeout(() => {
            this.addClassName(currentValue);
          })
        : this.addClassName(currentValue);
    }
  }

  private removeClassName(className: string): void {
    const el$ = nativeElement(this.el$);

    this.renderer.removeClass(el$, className);
  }

  private addClassName(className: string): void {
    const el$ = nativeElement(this.el$);

    this.renderer.addClass(el$, className);
  }
}
