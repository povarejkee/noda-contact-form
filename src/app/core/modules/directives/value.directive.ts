import { Directive, Input, OnInit } from '@angular/core';
import { FactoryResolveDirective } from './factory-resolve.directive';

type NgValueCtx = { ngValue: any };
@Directive({
  selector: '[ngValue]',
})
export class ValueDirective
  extends FactoryResolveDirective<null>
  implements OnInit
{
  private ctx: NgValueCtx = { ngValue: null };

  @Input('ngValue') private set ngValue(value: any) {
    this.ctx.ngValue = value;
  }

  ngOnInit(): void {
    this.insertTemplate(this.ctx);
  }
}
