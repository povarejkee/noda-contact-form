import { Params } from '@angular/router';
import { IStateAction } from '@core/managers/interfaces/IStateAction';
import { SelectOption } from '@core/modules/form/classes/SelectOption';
import {
  TFormControl,
  TInput,
  TMask,
  TNumberMask,
} from '@core/modules/form/types/form.types';
import { IPaginationData } from '@core/utils/pagination/interfaces/IPaginationData';
import { Observable } from 'rxjs';

export type TSortAction = 'unsort' | 'sort_asc' | 'sort_desc';

export type TableHeaderMenuAction =
  | 'filter'
  | 'hide'
  | 'show_columns'
  | TSortAction;

export type TableRowsRequest$<Row extends object = any> = (
  query?: Params
) => Observable<IPaginationData<Row>>;

export type TableActions<Row = unknown> = IStateAction<
  'fetch',
  IPaginationData<Row>
>;

export type TableFilterOptionParams = {
  // all
  controlType: TFormControl;
  // input-text
  type?: Extract<TInput, 'text' | 'number'>;
  mask?: string;
  dropSpecialCharacters?: boolean;
  allowNegativeNumbers?: boolean;
  // input-text & input-number
  maskType?: TMask | TNumberMask;
  // input-number
  float?: number;
  // select
  options?: SelectOption[];
};

export type TLoaderContentMode = 'small' | 'standard';
