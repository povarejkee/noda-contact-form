import { TSortDirection } from '@core/types/state.types';
import { IPage } from '@core/utils/pagination/interfaces/IPage';

export type TPayoutsQuery = {
  orderBy?: TSortDirection;
} & object &
  IPage;
