import { DOCUMENT } from '@angular/common';
import { isEqual } from '@core/handlers/condition.handlers';
import { nativeElement } from '@core/handlers/shared.handlers';
import { WINDOW } from '@core/injection/app.tokens';
import { TSide } from '@core/types/state.types';
import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[pageEndpoint]',
})
export class PageEndpointDirective implements OnInit, OnDestroy {
  private pageEndpoint: TSide[] = ['bottom'];
  private listenElement$: HTMLElement;
  private unsubscribe$: Function;

  @Input('endpointElement') private endpointElement: 'document' | 'element' =
    'document';
  @Input('pageEndpoint') private set _pageEndpoint(value: TSide[]) {
    if (value) {
      this.pageEndpoint = value;
    }
  }
  @Input('endpointDisabled') private disabled: boolean = false;
  @Output('endpoint') private _endpoint = new EventEmitter<TSide>();

  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(DOCUMENT) private document: Document,
    private el$: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.initScrollListener();
  }

  ngOnDestroy() {
    this.unsubscribe$();
  }

  private scrollHandler = (): void => {
    if (!this.disabled) {
      this.pageEndpoint.forEach((endpoint: TSide) => this[endpoint as TSide]());
    }
  };

  private initScrollListener(): void {
    this.listenElement$ = isEqual(this.endpointElement, 'document')
      ? this.document.documentElement
      : nativeElement(this.el$);
    const scrollElement$ = isEqual(this.endpointElement, 'document')
      ? this.window
      : nativeElement(this.el$);

    this.unsubscribe$ = this.renderer.listen(
      scrollElement$,
      'scroll',
      this.scrollHandler
    );
  }

  private top(): void {
    const { scrollTop } = this.listenElement$;

    if (scrollTop === 0) this._endpoint.emit('top');
  }

  private bottom(): void {
    const { scrollTop, scrollHeight, clientHeight } = this.listenElement$;
    const isBottom: boolean = scrollTop >= scrollHeight - clientHeight;

    if (isBottom) this._endpoint.emit('bottom');
  }

  private left(): void {
    const { scrollLeft } = this.listenElement$;

    if (scrollLeft === 0) this._endpoint.emit('left');
  }

  private right(): void {
    const { scrollLeft, scrollWidth, clientWidth } = this.listenElement$;
    const isRight: boolean = scrollLeft >= scrollWidth - clientWidth;

    if (isRight) this._endpoint.emit('right');
  }
}
