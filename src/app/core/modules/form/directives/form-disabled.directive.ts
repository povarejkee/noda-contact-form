import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isEqual } from '@core/handlers/condition.handlers';
import { TAllowStatus } from '../types/form.types';

@Directive({
  selector: '[ngFormDisabled]',
})
export class FormDisabledDirective {
  @Input('formGroup') private formGroup: FormGroup;

  @Input('ngFormDisabled') set ngFormDisabled(value: boolean) {
    const method = value ? 'disable' : 'enable';

    this.formGroup[method]();

    const status: TAllowStatus = isEqual(method, 'disable')
      ? 'disabled'
      : 'enabled';

    this._setDisabledState.emit(status);
  }

  @Output('setDisabledState') private _setDisabledState =
    new EventEmitter<TAllowStatus>();
}
