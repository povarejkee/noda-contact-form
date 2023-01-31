import { Injectable } from '@angular/core';
import { assign } from '@core/handlers/shared.handlers';
import { ExtendsFactory } from '@core/managers/handlers/managers.handlers';
import { State } from '@core/managers/StateService.manager';
import { ControllersStoreModule } from '@store/store/modules/controllers.store.module';
import { Store } from '@store/store/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IManager } from '../managers/interfaces/IManager';
import { IMerchantDetails } from '../merchants/interfaces/IMerchantDetails';
import { AccountApiService } from './account.api.service';
import { IAccountMerchant } from './interfaces/IAccountMerchant';
import { IAccountSaveMerchant } from './interfaces/IAccountSaveMerchant';
import { AccountControllerFlags } from './states/account.controller.flags';

@Injectable({
  providedIn: ControllersStoreModule,
})
export class AccountController extends ExtendsFactory(
  State({ flags: AccountControllerFlags })
) {
  constructor(private store: Store, private accountService: AccountApiService) {
    super();
  }

  public getAccountMerchant(): Observable<IAccountMerchant> {
    return this.accountService.getAccountMerchant().pipe(
      tap((accountMerchant: IAccountMerchant) => {
        this.store.updateStore({ accountMerchant });
      })
    );
  }

  public createAccountMerchant(
    merchant: IAccountSaveMerchant
  ): Observable<IAccountMerchant> {
    return this.accountService.saveMerchant(merchant);
  }

  public editAccountMerchant(
    candidate: Partial<IAccountMerchant>
  ): Observable<IAccountMerchant> {
    return this.accountService.editMerchant(candidate).pipe(
      tap(() => {
        const currentAccount: IAccountMerchant =
          this.store.getValue('accountMerchant');
        const accountMerchant: IMerchantDetails = assign(
          currentAccount,
          candidate
        );

        this.store.updateStore({ accountMerchant });
      })
    );
  }

  public getManager(): Observable<IManager> {
    return this.accountService.getManager();
  }
}
