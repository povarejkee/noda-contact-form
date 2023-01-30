import { randomid } from '@core/handlers/shared.handlers';
import { TMaterialTabelColumn } from '@core/modules/material/material.types';
import { IPaginationData } from '@core/utils/pagination/interfaces/IPaginationData';
import { TableFilterOption } from './TableFilterOption';

export class TableColumn<T = any> implements TMaterialTabelColumn<T> {
  public columnDef: string;
  public header: string;
  public cell: (cellElement: T) => unknown = (cellElement: T) => cellElement;
  public type: string;
  public filter: boolean = false;
  public filterOption: TableFilterOption = null;
  public sort: boolean = false;
  public copy: boolean = false;
  public active: boolean = true;
  public width: string = null;
  public merge: boolean = false;
  public footer: (rows: IPaginationData<any>) => string | number = null;
  public payload: any = null;
  public id: string = randomid();

  constructor(params: Partial<TableColumn<T>>) {
    Object.assign(this, params);
  }
}
