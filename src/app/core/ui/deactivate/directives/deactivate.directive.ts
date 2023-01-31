import { Directive, HostListener, Input } from '@angular/core';
import { ConfirmService } from '@core/ui/confirm/services/confirm.service';
import { IDeactivateComponent } from '../interfaces/IDeactivateComponent';

@Directive({
  selector: '[ngDeactivate]',
  exportAs: 'ngDeactivateRef',
})
export class DeactivateDirective
  implements Pick<IDeactivateComponent, 'canDeactivate'>
{
  @Input('ngDeactivate') public isDisabledDeactivate: boolean = false;
  @Input('ngDeactivateMessage') public message: string =
    'Your changes have not been saved! Continue ?';

  constructor(private confirmService: ConfirmService) {}

  @HostListener('window:beforeunload')
  private beforeunload(): boolean {
    return !this.isDisabledDeactivate;
  }

  public async canDeactivate(): Promise<boolean> {
    return this.isDisabledDeactivate
      ? this.confirmService.confirm(this.message)
      : Promise.resolve(true);
  }
}
