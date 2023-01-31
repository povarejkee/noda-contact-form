import { TSortDirection } from '@core/types/state.types';
import { IPage } from '@core/utils/pagination/interfaces/IPage';
import { ICountry } from '@store/modules/locations/interfaces/ICountry';
import { IMerchantLimits } from '../interfaces/IMerchantLimits';

export type MerchantsQuery = {
  orderBy?: TSortDirection;
} & object &
  IPage;

export type KYCQuery = IPage;

export type TMerchantCountriesBody = {
  excluded: Array<ICountry>;
};

export type TMerchantStatusName =
  | 'PendingReview'
  | 'PendingApproval'
  | 'Approved'
  | 'Blocked';

export type TDocumentStatus = 'Requested' | 'In review' | 'Done' | 'Rejected';

export type TMerchantLimitsBody = Omit<IMerchantLimits, 'id'>;
