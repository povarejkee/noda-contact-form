import { Injectable } from '@angular/core';
import { IPaginationData } from '@core/utils/pagination/interfaces/IPaginationData';
import { ControllersStoreModule } from '@store/store/modules/controllers.store.module';
import { Observable } from 'rxjs';
import { IPayout } from './interfaces/IPayout';
import { IPayoutsBalance } from './interfaces/IPayoutsBalance';
import { PayoutsApiService } from './payouts.api.service';
import { TPayoutsQuery } from './types/payouts.store.types';

@Injectable({
  providedIn: ControllersStoreModule,
})
export class PayoutsController {
  constructor(private payoutsService: PayoutsApiService) {}

  public getPayouts(
    merchantId: string,
    params: TPayoutsQuery
  ): Observable<IPaginationData<IPayout>> {
    return this.payoutsService.getPayouts(merchantId, params);
  }

  public getPayoutsBalance(): Observable<IPayoutsBalance> {
    return this.payoutsService.getPayoutsBalance();
  }
}
