import { IManager } from '@store/modules/managers/interfaces/IManager';
import { ICountry } from '@store/modules/locations/interfaces/ICountry';
import { EnManagerSelectionStatus } from '@store/modules/onboarding/enums/onboarding.enums';

export interface IAccountMerchant {
  id: string;
  name: string;
  registrationNumber: string;
  location: string;
  sortCode: string;
  iban: string;
  useNodaAccount: boolean;
  userId: string;
  status: number; // * EnMerchantStatus
  apiKey: string;
  signKey: string;
  testApiKey: string;
  testSignKey: string;
  routingNumber: string;
  applicationFormStatus: number; // * DocumentsFormStatus
  agreementStatus: number; // * DocumentsFormStatus
  ndaStatus: number; // * DocumentsFormStatus
  locationId: number;
  isActive: boolean;
  lastActivation: string;
  country: ICountry;
  manager: IManager;
  managerSelectionStatus: EnManagerSelectionStatus;
}
