import { Injectable } from '@angular/core';
import { ExtendsFactory } from '@core/managers/handlers/managers.handlers';
import { State } from '@core/managers/StateService.manager';
import { TShopsQuery } from '@page/account/types/account.types';
import { ControllersStoreModule } from '@store/store/modules/controllers.store.module';
import { Store } from '@store/store/store';
import { Observable } from 'rxjs';
import { IMerchantShop } from '../merchants/interfaces/IMerchantShop';
import { IShop } from './interfaces/IShop';
import { IShopCategory } from './interfaces/IShopCategory';
import { ShopsApiService } from './shops.api.service';
import { ShopsControllerFlags } from './states/shops.controller.flags';

@Injectable({
  providedIn: ControllersStoreModule,
})
export class ShopsController extends ExtendsFactory(
  State({ flags: ShopsControllerFlags })
) {
  constructor(private store: Store, private shopsService: ShopsApiService) {
    super();
  }

  public getShopsCategories(): Observable<IShopCategory[]> {
    const isLoad: boolean = this.getState('flags', 'isLoadCategories');

    if (!isLoad) {
      this.setState('flags', 'isLoadCategories', true);

      this.shopsService
        .getCategories()
        .subscribe((shopsCategories: IShopCategory[]) => {
          this.store.updateStore({ shopsCategories });
        });
    }

    return this.store.select('shopsCategories', true);
  }

  public getShops(query: TShopsQuery): Observable<IMerchantShop[]> {
    return this.shopsService.getShops(query);
  }

  public saveShop(shop: IShop): Observable<IMerchantShop> {
    return this.shopsService.saveShop(shop);
  }

  public editShop(id: string, shop: IShop): Observable<IMerchantShop> {
    return this.shopsService.editShop(id, shop);
  }
}
