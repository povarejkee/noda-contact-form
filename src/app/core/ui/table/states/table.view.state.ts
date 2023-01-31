import { Params } from '@angular/router';
import { TableColumn } from '../classes/TableColumn';
import { TableFilterOption } from '../classes/TableFilterOption';

export class TableViewState {
  public filter: Params = {};
  public defaultColumns: TableColumn[] = [];
  public defaultFilterOptions: TableFilterOption[] = [];
  public isHideAllColumns: boolean = false;
}
