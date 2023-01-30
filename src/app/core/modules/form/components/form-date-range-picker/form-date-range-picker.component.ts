import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { assign, getDataFromDB } from '@core/handlers/shared.handlers';
import { checkDateRange } from '@core/handlers/utility.handlers';
import { Moment } from 'moment';
import { BaseDateFormControlComponent } from '../../classes/BaseDateFormControlComponent';
import { FormControlProvider } from '../../classes/FormControlProvider';
import { RangeValue } from '../../classes/RangeValue';
import { FormDB } from '../../db/form.db';
import { createRange, dateStartReset } from '../../handlers/form.handlers';
import { DateRange, TRangeDate } from '../../types/form.types';

@Component({
  selector: 'ng-form-date-range-picker',
  templateUrl: './form-date-range-picker.component.html',
  styleUrls: ['./form-date-range-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    new FormControlProvider(FormDateRangePickerComponent),
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {
      provide: MAT_DATE_FORMATS,
      useValue: getDataFromDB(['dateFormats'], FormDB),
    },
  ],
})
export class FormDateRangePickerComponent
  extends BaseDateFormControlComponent
  implements OnInit
{
  public setValue(value: TRangeDate<string>): void {
    this.value = value;

    this.onChange(value);
    this.onTouched();
    this.detect();
  }

  public setRange(date: Moment, position: DateRange): void {
    const value: string = dateStartReset(date?.toJSON(), position);
    const candidateRange: TRangeDate<string> = assign(this.value, {
      [position]: value,
    });
    const range = createRange(candidateRange);

    this.setValue(range);
  }

  override resetValue(e: Event): void {
    e.stopPropagation();
    this.setValue(new RangeValue());
  }

  override get isShowResetIcon(): boolean {
    return (
      super.isShowResetIcon && Boolean(this.value.dateFrom || this.value.dateTo)
    );
  }

  override isDisabledReset(): boolean {
    return (
      this.disabled ||
      !new RangeValue(this.value?.dateFrom, this.value?.dateTo).isActive()
    );
  }

  public writeValue(value: TRangeDate<string | Date>): void {
    const dateFrom: Date = checkDateRange(
      value?.dateFrom,
      this.minDate,
      this.maxDate
    );
    const dateTo: Date = checkDateRange(
      value?.dateTo,
      this.minDate,
      this.maxDate
    );
    const range: TRangeDate<string> = createRange({
      dateFrom: dateStartReset<Date>(dateFrom, 'dateFrom'),
      dateTo: dateStartReset<Date>(dateTo, 'dateTo'),
    });

    this.value = range;
    this.detect();
  }
}
