import { formatDate } from '@angular/common';
import { EnApp } from '@core/enums/app.enum';
import { isEmptyObject } from '@core/handlers/condition.handlers';
import { isValidDate } from '@core/handlers/utility.handlers';
import { dateStartReset } from '../handlers/form.handlers';
import { TRangeDate } from '../types/form.types';

export class RangeValue<T = unknown> {
  constructor(public dateFrom: T = null, public dateTo: T = null) {}

  public isActive(): boolean {
    return Boolean(this.dateFrom) || Boolean(this.dateTo);
  }

  public toJSON(): TRangeDate {
    const { dateFrom, dateTo } = this;
    const range: Partial<RangeValue> = {};

    if (isValidDate(dateFrom)) {
      range.dateFrom = dateStartReset(dateFrom as any, 'dateFrom', true);
    }

    if (isValidDate(dateTo)) {
      range.dateTo = dateStartReset(dateTo as any, 'dateTo', true);
    }

    return isEmptyObject(range) ? null : (range as TRangeDate);
  }

  public toStringPeriod(
    separator: string = ' - ',
    format: string = 'dd/MM/YYYY'
  ): string {
    const { dateFrom, dateTo } = this;
    const dates = [
      formatDate(new Date(dateFrom as any), format, EnApp.DATE_LOCALE),
      formatDate(new Date(dateTo as any), format, EnApp.DATE_LOCALE),
    ];

    return dates.join(separator);
  }
}
