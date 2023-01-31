import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toHttpParams } from '@core/handlers/utility.handlers';
import { IPaginationData } from '@core/utils/pagination/interfaces/IPaginationData';
import { ApiStoreModule } from '@store/store/modules/api.store.module';
import { Observable } from 'rxjs';
import { IPayout } from './interfaces/IPayout';
import { IPayoutsBalance } from './interfaces/IPayoutsBalance';
import { TPayoutsQuery } from './types/payouts.store.types';

@Injectable({
  providedIn: ApiStoreModule,
})
export class PayoutsApiService {
  constructor(private http: HttpClient) {}

  public getPayouts(
    merchantId: string,
    params: TPayoutsQuery
  ): Observable<IPaginationData<IPayout>> {
    return this.http.get<IPaginationData<IPayout>>('@/payouts', {
      params: toHttpParams({ ...params, merchantId }),
    });
  }

  public getPayoutsBalance(): Observable<IPayoutsBalance> {
    return this.http.get<IPayoutsBalance>('@/payouts/balance');
  }
}
