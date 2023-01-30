import { isNotNullish } from '@core/handlers/condition.handlers';
import { IStore } from '@store/store/interfaces/IStore';
import { Store } from '@store/store/store';
import { StoreValue } from '@store/types/store.types';
import { Observable } from 'rxjs';

export abstract class BaseController<API extends { [key: string]: any } = any> {
  constructor(protected store: Store, private apiService: API) {}

  protected getObserver<
    K extends keyof IStore,
    M extends keyof API,
    P extends Parameters<API[M]>
  >(storeKey: K, apiMethodKey: M, params?: P): Observable<StoreValue<K>> {
    const currentValue = this.store.getValue(storeKey);

    if (isNotNullish(currentValue)) {
      return this.store.select(storeKey) as any;
    }

    return (
      this.apiService[apiMethodKey] as unknown as (
        ...params: P[]
      ) => Observable<StoreValue<K>>
    )(...(params as any))
      .pipe
      // tap((value: StoreValue<K>) => {
      //   if (isUpdateStore) {
      //     this.store.updateStore(storeKey, value);
      //   }
      // })
      ();
  }
}
