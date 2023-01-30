import { TUserRole } from '@store/modules/users/types/users.types';

export type TRolesData = {
  type: 'allow' | 'exclude';
  roles: TUserRole[];
};
