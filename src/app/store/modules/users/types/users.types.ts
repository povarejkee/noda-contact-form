import { EnumKeys } from '@core/types/libs.types';
import { EnUserRole } from '@store/modules/users/enums/users.enums';

export type TUserRole = EnumKeys<typeof EnUserRole>;
