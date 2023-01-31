import { IAccountMerchant } from '@store/modules/account/interfaces/IAccountMerchant';
import { EnMerchantStatus } from '../enums/merchants.enums';

export function isBlockedMerchant(merchant: IAccountMerchant): boolean {
  return merchant?.status === EnMerchantStatus['Blocked'];
}
