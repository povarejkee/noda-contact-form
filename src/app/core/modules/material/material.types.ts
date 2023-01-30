export type TMaterialBtn =
  | 'basic'
  | 'raised'
  | 'stroked'
  | 'flat'
  | 'icon'
  | 'fab'
  | 'mini-fab';

export type TMaterialTabelColumn<T> = {
  columnDef: string;
  header: string;
  cell: (cellElement: T) => T[keyof T] | unknown;
};
