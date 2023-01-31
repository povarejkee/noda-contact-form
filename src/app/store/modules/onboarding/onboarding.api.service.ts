import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiStoreModule } from '@store/store/modules/api.store.module';

import { IAccountMerchant } from '@store/modules/account/interfaces/IAccountMerchant';
import { IAccountSaveMerchant } from '@store/modules/account/interfaces/IAccountSaveMerchant';
import { IService } from '@store/modules/onboarding/interfaces/IService';
import { IWelcomeStep } from './interfaces/IWelcomeStep';

@Injectable({
  providedIn: ApiStoreModule,
})
export class OnboardingApiService {
  constructor(private http: HttpClient) {}

  public createMerchant(
    merchant: IAccountSaveMerchant
  ): Observable<IAccountMerchant> {
    return this.http.post<IAccountMerchant>(
      '@/v1/onboarding/merchant',
      merchant
    );
  }

  public createService(service: IService): Observable<IService> {
    return this.http.post<IService>('@/v1/onboarding/service', service);
  }

  public getWelcomeSteps(): Observable<IWelcomeStep[]> {
    return this.http.get<IWelcomeStep[]>('@/v1/onboarding');
  }
}
