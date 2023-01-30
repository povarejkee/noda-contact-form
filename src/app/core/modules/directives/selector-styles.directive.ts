import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  Inject,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { ISimple } from '@core/interfaces/ISimple';

@Directive({
  selector: '[ngSelectorStyles]',
})
export class SelectorStylesDirective implements AfterViewInit, OnDestroy {
  private defaultStyles: ISimple<string | number>;

  @Input('ngSelectorStyles') private styles: ISimple<string | number>;
  @Input('ngSelector') private selector: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    this.defaultStyles = this.getCurrentStyles(Object.keys(this.styles));
    this.applyStyles(this.styles);
  }

  ngOnDestroy(): void {
    this.applyStyles(this.defaultStyles);
  }

  private getCurrentStyles(props: string[]): ISimple<string | number> {
    const el$: HTMLElement = this.document.querySelector(this.selector);

    return props.reduce((accum, prop) => {
      const value: string = getComputedStyle(el$).getPropertyValue(prop);

      accum[prop] = value;

      return accum;
    }, {} as ISimple<string | number>);
  }

  private applyStyles(styles: ISimple<string | number>): void {
    const el$: HTMLElement = this.document.querySelector(this.selector);

    if (el$ && styles) {
      Object.entries(styles).forEach(([prop, value]) => {
        this.renderer.setStyle(el$, prop, value);
      });
    }
  }
}
