import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TShopsQuery } from '@page/account/types/account.types';
import { ApiStoreModule } from '@store/store/modules/api.store.module';
import { Observable } from 'rxjs';
import { IMerchantShop } from '../merchants/interfaces/IMerchantShop';
import { IShop } from './interfaces/IShop';
import { IShopCategory } from './interfaces/IShopCategory';

@Injectable({
  providedIn: ApiStoreModule,
})
export class ShopsApiService {
  constructor(private http: HttpClient) {}

  public getShops(query: TShopsQuery): Observable<IMerchantShop[]> {
    const params = new HttpParams({ fromObject: query as any });

    return this.http.get<IMerchantShop[]>('@/shops', { params });
  }

  public getCategories(): Observable<IShopCategory[]> {
    return this.http.get<IShopCategory[]>('@/shops/categories');
  }

  public saveShop(shop: IShop): Observable<IMerchantShop> {
    return this.http.post<IMerchantShop>('@/shops', shop);
  }

  public editShop(id: string, shop: IShop): Observable<IMerchantShop> {
    return this.http.put<IMerchantShop>(`@/shops/${id}`, shop);
  }
}
