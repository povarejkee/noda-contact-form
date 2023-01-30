import { Injectable } from '@angular/core';
import { isEqualJSON } from '@core/handlers/condition.handlers';
import { assign } from '@core/handlers/shared.handlers';
import { pairwiseValues } from '@core/handlers/utility.handlers';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StoreModel } from './classes/Store.model';
import { IStore } from './interfaces/IStore';

@Injectable()
export class Store {
  private store$: BehaviorSubject<IStore> = new BehaviorSubject(
    new StoreModel()
  );

  public getStore(): IStore {
    return this.store$.getValue();
  }

  public getValue<K extends keyof IStore>(key: K): IStore[K] {
    return this.store$.getValue()[key];
  }

  public listen(): Observable<IStore> {
    return this.store$.asObservable();
  }

  public select<K extends keyof IStore>(
    key: K,
    emitEqualValues: boolean = false
  ): Observable<IStore[K]> {
    return this.store$.asObservable().pipe(
      pairwiseValues(),
      filter(([previous, current]) => {
        const isEqualValues: boolean = isEqualJSON(
          previous?.[key],
          current?.[key]
        );

        return !isEqualValues || (isEqualValues && emitEqualValues);
      }),
      map(([, current]) => current?.[key])
    );
  }

  public updateStore(value: Partial<IStore>): void {
    const currentStore: IStore = this.getStore();
    const updatedStore: IStore = assign(currentStore, value);

    this.store$.next(updatedStore);
  }

  public mergeStore<K extends keyof IStore, V extends Partial<IStore[K]>>(
    key: K,
    value: V
  ) {
    const item = this.getValue(key);
    const newValue: IStore[K] = assign(item, value);

    this.updateStore({ [key]: newValue });
  }
}
