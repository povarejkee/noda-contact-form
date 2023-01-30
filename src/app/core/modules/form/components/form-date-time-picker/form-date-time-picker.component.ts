import { formatDate } from '@angular/common';
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
import { EnApp } from '@core/enums/app.enum';
import { getDataFromDB } from '@core/handlers/shared.handlers';
import { checkDateRange } from '@core/handlers/utility.handlers';
import { Moment } from 'moment';
import { BaseDateFormControlComponent } from '../../classes/BaseDateFormControlComponent';
import { FormControlProvider } from '../../classes/FormControlProvider';
import { FormDB } from '../../db/form.db';

@Component({
  selector: 'ng-form-date-time-picker',
  templateUrl: './form-date-time-picker.component.html',
  styleUrls: ['./form-date-time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    new FormControlProvider(FormDateTimePickerComponent),
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
export class FormDateTimePickerComponent
  extends BaseDateFormControlComponent
  implements OnInit
{
  public setValue(date: Moment): void {
    this.value = date?.toJSON() || null;
    this.onChange(this.value);
    this.onTouched();
    this.detect();
  }

  public writeValue(value: Date) {
    this.value = checkDateRange(value, this.minDate, this.maxDate);
    this.detect();
  }

  public copyValue(): void {
    this.window.navigator.clipboard.writeText(
      formatDate(this.value, 'd.MM.y', EnApp.DATE_LOCALE)
    );
  }
}
