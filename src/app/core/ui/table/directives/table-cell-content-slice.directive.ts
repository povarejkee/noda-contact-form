import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { nativeElement } from '@core/handlers/shared.handlers';
import { EnTable } from '../enums/table.enum';

@Directive({
  selector: '[ngTableCellContentSlice]',
})
export class TableCellContentSlice {
  @Input('ngTableCellContentSliceSelector') public childSelector: string =
    EnTable.CELL_CONTENT_SELECTOR;

  constructor(
    private el$: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    this.sliceCellContent();
  }

  private sliceCellContent(): void {
    const el$: HTMLElement = nativeElement(this.el$);
    const child$: HTMLElement = el$.querySelector(this.childSelector);

    if (child$) {
      const originalContent: string = child$.textContent;
      this.renderer.addClass(child$, 'line-clamp');
      const isMore: boolean = child$.clientWidth < child$.scrollWidth;

      if (isMore) {
        this.renderer.setAttribute(
          el$,
          EnTable.CELL_FULL_CONTENT_SELECTOR,
          originalContent
        );
      }
    }

    // else {
    //   console.warn(
    //     `Missing attribute "${EnTable.CELL_CONTENT_SELECTOR}" for cell text line-clamp`
    //   );
    // }
  }
}
