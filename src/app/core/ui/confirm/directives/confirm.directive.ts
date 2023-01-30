import {
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  Injector,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { isNullish } from '@core/handlers/condition.handlers';
import { FactoryResolveDirective } from '@core/modules/directives/factory-resolve.directive';
import { Bind } from '@core/modules/form/decorators/decorators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ConfirmAction } from '../classes/ConfirmAction';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { ConfirmService } from '../services/confirm.service';

@UntilDestroy()
@Directive({
  selector: '[ngConfirm]',
})
export class ConfirmDirective extends FactoryResolveDirective<ConfirmComponent> {
  private popupRef$: ComponentRef<ConfirmComponent>;

  constructor(
    tpl: TemplateRef<ConfirmComponent>,
    viewContainer: ViewContainerRef,
    injector: Injector,
    cdr: ChangeDetectorRef,
    private confirmService: ConfirmService
  ) {
    super(tpl, viewContainer, injector, cdr);
  }

  ngOnInit() {
    this.initPopupSub();
  }

  private initPopupSub(): void {
    this.confirmService
      .getStream('popup$')
      .pipe(untilDestroyed(this))
      .subscribe((action: ConfirmAction) => {
        if (isNullish(action)) {
          this.removeComponent();
          this.popupRef$ = null;
        } else {
          const { message, loading } = action;
          const compRef$: ComponentRef<ConfirmComponent> =
            this.insertComponent(ConfirmComponent);
          this.popupRef$ = compRef$;

          compRef$.instance.answerCb = this.answer;
          compRef$.instance.message = message;
          compRef$.instance.showLoader = loading;
          compRef$.changeDetectorRef.detectChanges();
        }
      });
  }

  @Bind()
  private answer(result: boolean): void {
    this.confirmService.answer(result, !this.popupRef$.instance.loading);
  }
}
