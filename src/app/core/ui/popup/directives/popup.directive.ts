import { DOCUMENT } from '@angular/common';
import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  Inject,
  Injector,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { nativeElement, randomid } from '@core/handlers/shared.handlers';
import { TSide } from '@core/types/state.types';
import { PopupComponent } from '../components/popup/popup.component';

@Directive({
  selector: '[ngPopup]',
  exportAs: 'ngPopupRef',
})
export class PopupDirective implements OnInit {
  private subscribtions$: Function[] = [];
  private defaultOffset: string = '0.5rem';
  private ngPopupContext: any = {};
  private id: string = randomid();

  @Input() public ngPopup: TemplateRef<any>;
  @Input('ngPopupContext') public set _ngPopupContext(value: any) {
    this.ngPopupContext = value;

    if (this.popup$?.instance) {
      this.setPopupContext(value);
    }
  }
  @Input() public ngPopupEvent: 'hover' | 'click' | 'toggle' = 'click';
  @Input() public ngPopupPlacement: TSide = 'bottom';
  @Input() public ngPopupCloseToClickTpl: boolean = false;
  @Input() public ngPopupOffsetX: string;
  @Input() public ngPopupOffsetY: string;

  private popup$: ComponentRef<PopupComponent>;

  constructor(
    private el$: ElementRef<HTMLElement>,
    private viewContainer: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private injetor: Injector,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.createInstance();
  }

  ngOnDestroy() {
    this.subscribtions$.forEach((cb) => cb());
  }

  private createInstance(): void {
    const el$: HTMLElement = nativeElement(this.el$);
    const factory: ComponentFactory<PopupComponent> =
      this.resolver.resolveComponentFactory(PopupComponent);
    this.popup$ = this.viewContainer.createComponent(factory, 0, this.injetor);
    this.renderer.setAttribute(el$, 'data-id', this.id);

    this.initEventListener();
  }

  private initEventListener(): void {
    switch (this.ngPopupEvent) {
      case 'hover': {
        this.initHoverListeners();
        break;
      }
      case 'click': {
        this.initClickListeners();
        break;
      }
      case 'toggle': {
        this.initToggleListeners();
        break;
      }
    }
  }

  private setPopupContext(value: any): void {
    this.popup$.instance.templateContext = value;
    this.popup$.instance.detect();
  }

  public open(): void {
    const isShow: boolean = this.popup$.instance.getShowState();

    if (isShow) return;

    const el$ = nativeElement(this.el$);
    const coords: DOMRect = el$.getBoundingClientRect();

    this.popup$.instance.offset = {
      x: this.ngPopupOffsetX || this.defaultOffset,
      y: this.ngPopupOffsetY || this.defaultOffset,
    };
    this.popup$.instance.coords = coords;
    this.popup$.instance.templateOutlet = this.ngPopup;
    this.popup$.instance.placement = this.ngPopupPlacement;
    this.popup$.instance.templateContext = this.ngPopupContext;
    this.popup$.instance.setShowState(true);
    this.popup$.instance.detect();
  }

  public close(): void {
    this.popup$.instance.setShowState(false);
    this.popup$.instance.detect();
  }

  public toggle(): void {
    const { isShow } = this.popup$.instance;

    isShow ? this.close() : this.open();
  }

  private initHoverListeners(): void {
    const el$ = nativeElement(this.el$);

    const onEnter = this.renderer.listen(el$, 'mouseenter', () => {
      this.open();
    });

    const onLeave = this.renderer.listen(el$, 'mouseleave', () => {
      this.close();
    });

    this.subscribtions$.push(onEnter, onLeave);
  }

  private initClickListeners(): void {
    const el$ = nativeElement(this.el$);
    const { documentElement } = this.document;

    const onLeave = this.renderer.listen(
      documentElement,
      'click',
      (e: MouseEvent) => {
        const { id } = this.popup$.instance;
        const isClickedToPopup: boolean = Boolean(
          (e.target as HTMLElement).closest(`[data-id="${id}"]`)
        );
        const isClickedToParent: boolean = Boolean(
          (e.target as HTMLElement).closest(`[data-id="${this.id}"]`)
        );
        const isContain = isClickedToPopup || isClickedToParent;
        const isCanClose: boolean = !isContain || this.ngPopupCloseToClickTpl;

        if (isCanClose) {
          e.stopPropagation();
          this.close();
        }
      }
    );

    const onEnter = this.renderer.listen(el$, 'click', () => {
      const isShow: boolean = this.popup$.instance.getShowState();

      isShow ? this.close() : this.open();
    });

    this.subscribtions$.push(onLeave);
    this.subscribtions$.push(onEnter);
  }

  public initToggleListeners(): void {
    const el$: HTMLElement = nativeElement(this.el$);

    const onClick = this.renderer.listen(el$, 'click', (e: MouseEvent) => {
      const isShow: boolean = this.popup$.instance.getShowState();

      isShow ? this.close() : this.open();
    });

    this.subscribtions$.push(onClick);
  }

  public get isOpen(): boolean {
    return this.popup$?.instance.getShowState() ?? false;
  }
}
