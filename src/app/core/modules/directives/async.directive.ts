import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

interface IAsync<T = unknown> {
  ngAsync: T;
}

@Directive({
  selector: '[ngAsync]',
})
export class AsyncDirective implements OnInit {
  private asyncContext: IAsync = { ngAsync: null };

  @Input('ngAsync') public set ngAsync(value: unknown) {
    this.asyncContext.ngAsync = value;
  }

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
  ) {}

  ngOnInit() {
    this.viewContainer.createEmbeddedView(this.templateRef, this.asyncContext);
  }
}
