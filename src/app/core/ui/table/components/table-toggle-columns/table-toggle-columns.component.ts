import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { ANStyles } from '@core/animations/animations';
import { TShowState } from '@core/types/state.types';
import { TableColumn } from '../../classes/TableColumn';
import { TableToggleColumn } from '../../classes/TableToggleColumn';

@Component({
  selector: 'ng-table-toggle-columns',
  templateUrl: './table-toggle-columns.component.html',
  styleUrls: ['./table-toggle-columns.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    ANStyles({
      fromStyle: {
        transform: 'scale(0)',
        opacity: 0,
      },
      toStyle: { transform: 'scale(1)', opacity: 1 },
      animationName: 'ANShowMenu',
    }),
  ],
})
export class TableToggleColumnsComponent {
  public searchValue: string = '';
  public columns: TableColumn[] = [];
  public actionStatus: 'hide-all' | 'show-all' | 'default' = 'default';
  public toggleColumns: TableToggleColumn[] = [];

  @Input('columns') private set _columns(columns: TableColumn[]) {
    this.columns = columns;
    this.initToggleColumns(columns);
  }
  @Input('defaultColumns') public defaultColumns: TableColumn[] = [];
  @Input('loading') public loading: boolean = false;

  @Output('close')
  private _close: EventEmitter<void> = new EventEmitter();
  @Output('apply')
  private _apply: EventEmitter<TableToggleColumn[]> = new EventEmitter();

  @HostBinding('@ANShowMenu') private ANShowMenu: unknown;

  private initToggleColumns(columns: TableColumn[]): void {
    this.toggleColumns = columns.map(
      ({ columnDef, header: title, active }) =>
        new TableToggleColumn(columnDef, title, active)
    );
  }

  public getEmptyText(searchValue: string): string {
    return `No column matching "${searchValue}"`;
  }

  public toggle(column: TableToggleColumn): void {
    column.setActiveStatus(!column.active);
  }

  public all(state: TShowState): void {
    const isActive: boolean = state === 'hide' ? false : true;

    this.toggleColumns = this.toggleColumns.map((c) =>
      c.setActiveStatus(isActive)
    );
  }

  public close(): void {
    this._close.emit();
  }

  public reset(): void {
    this.toggleColumns = this.defaultColumns.map(
      ({ columnDef, header: title, active }) =>
        new TableToggleColumn(columnDef, title, active)
    );
  }

  public apply(): void {
    this._apply.emit(this.toggleColumns);
  }
}
