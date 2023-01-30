import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngSwitchContainDefault]',
})
export class SwitchContainDefault {
  constructor(
    private tpl$: TemplateRef<any>,
    private viewContainer$: ViewContainerRef,
  ) {}

  public insert(): void {
    this.viewContainer$.createEmbeddedView(this.tpl$);
  }

  public remove(): void {
    this.viewContainer$.clear();
  }
}
