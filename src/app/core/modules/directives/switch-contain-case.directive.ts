import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef
  } from '@angular/core';

@Directive({
  selector: '[ngSwitchContainCase]',
})
export class SwitchContainCaseDirective {
  @Input('ngSwitchContainCase') private values: unknown[];

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

  public isContain(value: unknown): boolean {
    return this.values.includes(value);
  }
}
