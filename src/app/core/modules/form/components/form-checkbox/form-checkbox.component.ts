import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TAdjustPosition } from '@core/types/state.types';
import { BaseFormControlComponent } from '../../classes/BaseFormControlComponent';
import { FormControlProvider } from '../../classes/FormControlProvider';

@Component({
  selector: 'ng-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.scss'],
  providers: [new FormControlProvider(FormCheckboxComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCheckboxComponent extends BaseFormControlComponent {
  @Input() public label: string;
  @Input() public labelPosition: TAdjustPosition = 'after';
  @Input() public indeterminate: boolean = false;

  public setValue(value: boolean): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
    this.detect();
  }

  public writeValue(value: boolean): void {
    this.value = value;
    this.detect();
  }
}
