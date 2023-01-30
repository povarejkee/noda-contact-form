import { Injectable } from '@angular/core';
import { assign } from '@core/handlers/shared.handlers';
import { ExtendsFactory } from '@core/managers/handlers/managers.handlers';
import { State } from '@core/managers/StateService.manager';
import { StreamManager } from '@core/managers/Stream.manager';
import { BehaviorSubject } from 'rxjs';
import { TableColumn } from '../classes/TableColumn';
import { TableFilterOption } from '../classes/TableFilterOption';
import { TableToggleColumn } from '../classes/TableToggleColumn';
import { TableDB } from '../db/table.db';
import { TableViewFlags } from '../states/table.view.flags';
import { TableViewState } from '../states/table.view.state';

@Injectable()
export class TableViewService<Row extends object = any> extends ExtendsFactory(
  State({
    flags: TableViewFlags,
    state: TableViewState,
    db: TableDB,
  }),
  StreamManager()
) {
  private columns$: BehaviorSubject<TableColumn[]> = new BehaviorSubject([]);

  public initColumns(columns: TableColumn[]): void {
    const defaultColumns: TableColumn[] = columns.map((c) =>
      assign(c)
    ) as TableColumn[];

    this.setState('state', 'defaultColumns', columns);
    this.emitToStream('columns$', defaultColumns);
  }

  public initFilterOptions(options: TableFilterOption[]): void {
    this.setState('state', 'defaultFilterOptions', options);
  }

  public getColumnByDef(columnDef: string): TableColumn {
    const columns: TableColumn[] = this.getStreamValue('columns$');

    return columns.find((c) => c.columnDef === columnDef);
  }

  public getDefaultColumns(): TableColumn[] {
    const defaultColumns: TableColumn<Row>[] = this.getState(
      'state',
      'defaultColumns'
    );

    return defaultColumns.map((c) => assign(c)) as TableColumn[];
  }

  public setColumnsList(toggleColumns: TableToggleColumn[]): TableColumn[] {
    const currentColumns: TableColumn[] = this.getStreamValue('columns$');
    const columns: TableColumn[] = currentColumns.map((c) => {
      const toggleCol: TableToggleColumn = toggleColumns.find(
        (item) => item.columnDef === c.columnDef
      );

      c.active = toggleCol.active;

      return c;
    });
    const isHideAllColumns: boolean = columns.every((c) => !c.active);

    this.setState('state', 'isHideAllColumns', isHideAllColumns);
    this.updateColumns(columns);

    return columns;
  }

  public resetColumns(): void {
    this.setState('state', 'isHideAllColumns', false);
    this.updateColumns(this.getDefaultColumns());
  }

  public updateColumns(columns: TableColumn[]): void {
    this.emitToStream('columns$', columns);
    this.detect('default');
  }
}
