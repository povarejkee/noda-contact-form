import { EnManagerSelectionStatus } from '@page/onboarding/enums/onboarding.enum';

export interface IAccountSaveMerchant {
  name: string;
  registrationNumber: string;
  location: string;
  sortCode: string;
  routingNumber: string;
  iban: string;
  countrycode: string;
  managerId: string;
  managerSelectionStatus: EnManagerSelectionStatus;
}
