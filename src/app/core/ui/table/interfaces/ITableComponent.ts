import { IPaginationData } from '@core/utils/pagination/interfaces/IPaginationData';

export interface ITableComponent {
  updateRows: (cb: TableUpdateRowsCb) => void;
  addRow: <T = any>(row: T) => void;
  editRow: <T = any>(row: T, prop: keyof T) => void;
}

export type TableUpdateRowsCb = (
  rows: IPaginationData<any>
) => IPaginationData<any>;
