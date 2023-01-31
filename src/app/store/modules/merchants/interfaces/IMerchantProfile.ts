import { TUserRole } from '@store/modules/users/types/users.types';

export interface IMerchantProfile {
  id: string;
  email: string;
  role: TUserRole;
  contact: IMerchantProfileContact;
  createdDate: string;
}

export interface IMerchantProfileContact {
  name: string;
  typeOfMessenger: string;
  messengerProfileName: string;
  countryCode: string;
}
