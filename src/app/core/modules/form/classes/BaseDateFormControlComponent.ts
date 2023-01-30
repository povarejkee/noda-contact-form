import {
  ChangeDetectorRef,
  Component,
  Inject,
  Injector,
  Input,
} from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { WINDOW } from '@core/injection/app.tokens';
import { dateStartReset } from '../handlers/form.handlers';
import { DateRange } from '../types/form.types';
import { BaseFormControlComponent } from './BaseFormControlComponent';

@Component({
  selector: 'base-date-form-control',
  template: '',
})
export abstract class BaseDateFormControlComponent extends BaseFormControlComponent {
  public minDate: Date = null;
  public maxDate: Date = null;

  @Input('minDate') private set _minDate(value: Date | 'now') {
    this.changeRange(value, 'dateFrom');
  }
  @Input('maxDate') private set _maxDate(value: Date | 'now') {
    this.changeRange(value, 'dateTo');
  }
  @Input('timepicker') public timepicker: boolean = false;
  @Input('readonly') public readonly: boolean = false;
  @Input('placeholder') public placeholder: string = 'Select a date';
  @Input('copy') public copy: boolean = false;
  @Input('label') public label: string = 'Select a date';

  constructor(
    protected injector: Injector,
    protected cdr: ChangeDetectorRef,
    @Inject(WINDOW) protected window: Window,
    protected adapter: DateAdapter<any>
  ) {
    super(injector, cdr);
  }

  private changeRange(value: Date | 'now', position: DateRange): void {
    if (value) {
      value =
        value === 'now' ? dateStartReset(new Date(), position, false) : value;
    }

    const rangeType = position === 'dateTo' ? 'maxDate' : 'minDate';

    this[rangeType] = value as Date;
  }
}
