import { IAccountMerchant } from '@store/modules/account/interfaces/IAccountMerchant';

export interface IMerchantDetails extends IAccountMerchant {
  resellers: TReseller[];
}

export class TReseller {
  email: string;
}
