import { Injectable } from '@angular/core';
import { ControllersStoreModule } from '@store/store/modules/controllers.store.module';
import { Observable } from 'rxjs';

import { OnboardingApiService } from '@store/modules/onboarding/onboarding.api.service';

import { IAccountMerchant } from '@store/modules/account/interfaces/IAccountMerchant';
import { IAccountSaveMerchant } from '@store/modules/account/interfaces/IAccountSaveMerchant';
import { IService } from '@store/modules/onboarding/interfaces/IService';
import { IWelcomeStep } from './interfaces/IWelcomeStep';

@Injectable({
  providedIn: ControllersStoreModule,
})
export class OnboardingController {
  constructor(private onboardingService: OnboardingApiService) {}

  public createMerchant(
    merchant: IAccountSaveMerchant
  ): Observable<IAccountMerchant> {
    return this.onboardingService.createMerchant(merchant);
  }

  public createService(service: IService): Observable<IService> {
    return this.onboardingService.createService(service);
  }

  public getWelcomeSteps(): Observable<IWelcomeStep[]> {
    return this.onboardingService.getWelcomeSteps();
  }
}
