import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Params } from '@angular/router';
import { TrackBy } from '@core/decorators/decorators';
import { RangeValue } from '@core/modules/form/classes/RangeValue';
import { TRangeDate } from '@core/modules/form/types/form.types';
import { TableFilterOption } from '../../classes/TableFilterOption';

@Component({
  selector: 'ng-table-column-filter',
  templateUrl: './table-column-filter.component.html',
  styleUrls: ['./table-column-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableColumnFilterComponent {
  public dateRangeControl: FormControl = new FormControl(null);
  public query: Params = {};

  @Input('filterOption') public filterOption: TableFilterOption;
  @Input('query') private set _query(value: Params) {
    this.query = value;
    this.checkControl(value);
  }
  @Output('filter') private _filter = new EventEmitter<Params>();

  private checkControl(query: Params): void {
    const {
      params: { controlType },
    } = this.filterOption;

    switch (controlType) {
      case 'date-range': {
        const { dateFrom = null, dateTo = null } = query;
        const value = new RangeValue(dateFrom, dateTo);

        this.dateRangeControl.setValue(value, {
          emitEvent: false,
          emitViewToModelChange: false,
        });

        break;
      }
    }
  }

  @TrackBy('property', 'id')
  public trackByCols() {}

  public changeDateRange(range: TRangeDate<string>): void {
    this._filter.emit(range as any);
  }

  public changeValue(value: any): void {
    const { id } = this.filterOption;

    const filter: Params = { [id]: value };

    this._filter.emit(filter);
  }
}
