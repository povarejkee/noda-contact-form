import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { isNotEqual } from '@core/handlers/condition.handlers';
import { trim } from '@core/handlers/string.handlers';
import { InputEditEvent } from '../components/form-input-toggle/utils/InputEditEvent';
import { BindContext } from '../decorators/decorators';
import {
  getPlaceholder,
  getToogleIcon,
  getToogleTooltip,
} from '../handlers/form.handlers';
import { BaseFormControlComponent } from './BaseFormControlComponent';

@Component({
  selector: 'ng-abstract-toogle',
  template: '',
})
export abstract class ToggleControlComponent extends BaseFormControlComponent {
  public isShowControl: boolean = false;
  public childControl: FormControl = new FormControl(null);
  public startValue: string;

  @BindContext(getToogleTooltip)
  public toggleTooltip: string;
  @BindContext(getToogleIcon)
  public toogleIcon: string;
  @BindContext(getPlaceholder)
  public controlPlaceholder: string;

  @Input() placeholder: string;
  @Input() minlength: string;
  @Input() maxlength: string;
  @Input() rows: number = 5;

  @Output('edit') _edit = new EventEmitter<InputEditEvent>();

  public setValue(value: any): void {
    this.value = trim(value);
    this.onChange(this.value);
    this.onTouched();
    this.udpateChildControl();
  }

  public udpateChildControl(): void {
    this.childControl.setErrors(this.formControl.errors);
  }

  public resetValue(): void {
    this.setValue(null);
    this.childControl.setValue(null);
  }

  public isCanEdit(): boolean {
    return this.formControl.valid && isNotEqual(this.startValue, this.value);
  }

  public hide(): void {
    this.isShowControl = false;
  }

  public show(): void {
    this.isShowControl = true;
  }

  public action(): void {
    if (this.isShowControl) {
      if (this.isCanEdit()) {
        this.edit();
      } else {
        this.setValue(this.startValue);
        this.childControl.setValue(this.value);
      }
      this.hide();
    } else {
      this.show();
    }
  }

  protected edit(): void {
    const event: InputEditEvent = new InputEditEvent(this.formControl);

    this._edit.emit(event);
    this.startValue = this.value;
  }

  writeValue(value: any): void {
    this.setValue(value);
    this.startValue = this.value;
    this.childControl.setValue(this.startValue);
  }

  setDisabledState(status: boolean): void {
    const allowMethod = status ? 'disable' : 'enable';

    this.childControl[allowMethod]();
  }
}
