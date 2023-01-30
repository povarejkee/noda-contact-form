import { TUserRole } from '@store/modules/users/types/users.types';

export class MerchantSave {
  constructor(public email: string, public role: TUserRole) {}
}
