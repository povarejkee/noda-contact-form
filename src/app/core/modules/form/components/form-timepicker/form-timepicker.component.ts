import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { isEqual } from '@core/handlers/condition.handlers';
import {
  checkDateRange,
  preventDisabledSetDate,
  skipDateChanges,
} from '@core/handlers/utility.handlers';
import { MOMENT, MomentJS } from '@core/injection/libs.tokens';
import { TMathAction } from '@core/types/utils.types';
import { Moment } from 'moment';
import { BaseFormControlComponent } from '../../classes/BaseFormControlComponent';
import { FormControlProvider } from '../../classes/FormControlProvider';
import { TimeValue, TRange } from '../../types/form.types';

@Component({
  selector: 'ng-form-timepicker',
  templateUrl: './form-timepicker.component.html',
  styleUrls: ['./form-timepicker.component.scss'],
  providers: [new FormControlProvider(FormTimepickerComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormTimepickerComponent
  extends BaseFormControlComponent
  implements OnInit, ControlValueAccessor
{
  onChange: (v: any) => void;
  onTouch: () => void;

  @Input() minDate: Date;
  @Input() maxDate: Date;

  constructor(
    injector: Injector,
    cdr: ChangeDetectorRef,
    @Inject(MOMENT) private moment: MomentJS
  ) {
    super(injector, cdr);
  }

  public setValue(value: Date): void {
    this.onChange(this.moment(value));
    this.onTouch();
    this.detect();
  }

  public getValue(type: TimeValue): string {
    const [hours, minutes] = this.value?.toLocaleTimeString().split(':') || [
      '00',
      '00',
    ];

    return type === 'hours' ? hours : minutes;
  }

  public step(type: TimeValue, action: TMathAction): void {
    const date: Moment = this.moment(this.value || new Date());
    const step: number = action === 'inc' ? 1 : -1;
    const value: Date = date.add(step, type).toDate();
    const isSkipChanges: boolean = skipDateChanges(
      value,
      this.minDate,
      this.maxDate
    );

    if (!isSkipChanges) {
      this.setValue(value);
    }
  }

  public wheel(e: Event, type: TimeValue): void {
    e.preventDefault();

    if (!this.disabled) {
      const { deltaY } = e as any;
      const action: TMathAction = deltaY < 0 ? 'inc' : 'dec';

      this.step(type, action);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public preventDisabledSetDate(time: TimeValue, rangeType: TRange): boolean {
    const rangeDate: Date = isEqual(rangeType, 'min')
      ? this.minDate
      : this.maxDate;

    return preventDisabledSetDate(this.value, rangeDate, time, rangeType);
  }

  writeValue(value: Date): void {
    this.value = checkDateRange(value, this.minDate, this.maxDate);

    this.detect();
  }

  setDisabledState(flag: boolean): void {
    this.disabled = flag;
  }

  // getErrorMessage(error: TKeyValue<any>): string {
  //   return completeErrorMessage(error, this.label);
  // }
}
