import {
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  Injector,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { TShowState } from '@core/types/state.types';

@Directive({
  selector: 'factoryResovle',
})
export abstract class FactoryResolveDirective<T> {
  protected showState: TShowState = 'hide';

  constructor(
    protected tpl: TemplateRef<T>,
    protected viewContainer: ViewContainerRef,
    protected injector: Injector,
    protected cdr: ChangeDetectorRef
  ) {}

  protected insertComponent(Component: Type<T>): ComponentRef<T> {
    this.clearContainer();

    const componentRef: ComponentRef<T> = this.viewContainer.createComponent(
      Component,
      {
        index: 0,
        injector: this.injector,
      }
    );

    this.setShowState('show');
    this.cdr.detectChanges();

    return componentRef;
  }

  protected removeComponent(): void {
    this.clearContainer();
    this.cdr.detectChanges();
  }

  protected insertTemplate(context: any = null): void {
    this.clearContainer();
    this.viewContainer.createEmbeddedView(this.tpl, context);
    this.setShowState('show');
    this.cdr.detectChanges();
  }

  protected clearContainer(): void {
    this.viewContainer.clear();
    this.setShowState('hide');
    this.cdr.detectChanges();
  }

  protected setShowState(state: TShowState): void {
    this.showState = state;
  }
}
