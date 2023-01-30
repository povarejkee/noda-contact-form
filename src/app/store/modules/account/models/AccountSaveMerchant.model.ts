import { trimStringValues } from '@core/handlers/string.handlers';
import { IAccountSaveMerchant } from '../interfaces/IAccountSaveMerchant';
import {EnManagerSelectionID, EnManagerSelectionStatus} from '@page/onboarding/enums/onboarding.enum';

export class AccountSaveMerchant implements IAccountSaveMerchant {
  public name: string;
  public registrationNumber: string;
  public location: string;
  public sortCode: string;
  public routingNumber: string;
  public iban: string;
  public countrycode: string;
  public managerId: string = null;
  public managerSelectionStatus: EnManagerSelectionStatus;

  constructor(document: Partial<IAccountSaveMerchant> = {}) {
    const { managerId, ...rest } = document;

    Object.assign(this, trimStringValues(rest));

    switch (managerId) {
      case EnManagerSelectionID["By myself"]:
        this.managerSelectionStatus = EnManagerSelectionStatus['By myself'];
        break;

      case EnManagerSelectionID["Dont remember"]:
        this.managerSelectionStatus = EnManagerSelectionStatus['Dont remember'];
        break;

      default:
        this.managerId = managerId;
        this.managerSelectionStatus = EnManagerSelectionStatus.Selected;
    }
  }
}
