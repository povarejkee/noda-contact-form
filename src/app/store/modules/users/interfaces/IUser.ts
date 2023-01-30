import { IUserContacts } from './IUserContacts';
import { EnUserRole } from '@store/modules/users/enums/users.enums';
import { EnMerchantStatus } from '@store/modules/merchants/enums/merchants.enums';

export interface IUser {
  id: string;
  email: string;
  role: EnUserRole;
  contact: IUserContacts;
  merchantStatus: EnMerchantStatus;
}
