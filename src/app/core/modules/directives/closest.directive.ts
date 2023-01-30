import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { nativeElement } from '@core/handlers/shared.handlers';

@Directive({
  selector: '[ngClosest]',
})
export class ClosestDirective {
  @Input('ngClosest') public takeSelectors: string[] | string;

  @Output() private closest: EventEmitter<boolean> = new EventEmitter();

  @HostListener('window:click', ['$event'])
  private click(e: Event): void {
    const el: HTMLElement = nativeElement(this.el$);

    const classList: string = Array.from(el.classList).reduce(
      (accum: string, className: string) => {
        return (accum += `.${className}`);
      },
      ''
    );
    let parentSelectors: string[] = [classList];

    if (this.takeSelectors) {
      parentSelectors = parentSelectors.concat(this.takeSelectors);
    }

    const isContain: boolean = parentSelectors.some((selector) =>
      (e.target as HTMLElement).closest(selector)
    );

    this.closest.emit(isContain);
  }

  constructor(private el$: ElementRef<HTMLElement>) {}
}
