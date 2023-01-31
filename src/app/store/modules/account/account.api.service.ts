import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiStoreModule } from '@store/store/modules/api.store.module';
import { Observable } from 'rxjs';
import { IManager } from '../managers/interfaces/IManager';
import { IMerchantDetails } from '../merchants/interfaces/IMerchantDetails';
import { IAccountMerchant } from './interfaces/IAccountMerchant';
import { IAccountSaveMerchant } from './interfaces/IAccountSaveMerchant';

@Injectable({
  providedIn: ApiStoreModule,
})
export class AccountApiService {
  constructor(private http: HttpClient) {}

  public getAccountMerchant(): Observable<IMerchantDetails> {
    return this.http.get<IMerchantDetails>('@/account/merchant');
  }

  public saveMerchant(
    merchant: IAccountSaveMerchant
  ): Observable<IAccountMerchant> {
    return this.http.post<IAccountMerchant>('@/account/merchant', merchant);
  }

  public editMerchant(
    candidate: Partial<IAccountMerchant>
  ): Observable<IAccountMerchant> {
    return this.http.put<IAccountMerchant>('@/account/merchant', candidate);
  }

  public getManager(): Observable<IManager> {
    return this.http.get<IManager>('@/account/merchant/manager');
  }
}
