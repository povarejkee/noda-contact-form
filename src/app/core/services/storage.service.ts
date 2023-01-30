import { Inject, Injectable } from '@angular/core';
import { EnApi } from '@core/api/enums/api.enums';
import { isNullish } from '@core/handlers/condition.handlers';
import { WINDOW } from '@core/injection/app.tokens';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(@Inject(WINDOW) private window: Window) {}

  public get<T>(
    key: string,
    storage: TStorage = EnApi.DEFAULT_STORAGE,
    isParsed: boolean = true
  ): T {
    const value: string = this.window[storage].getItem(key);

    if (isNullish(value)) {
      console.warn(`Key "${key}" not found in ${storage}`);
      return value as any;
    }

    if (isParsed) return JSON.parse(value);

    return value as any;
  }

  public remove(key: string, storage: TStorage = EnApi.DEFAULT_STORAGE): void {
    this.window[storage].removeItem(key);
  }

  public set<T>(
    key: string,
    value: T,
    storage: TStorage = EnApi.DEFAULT_STORAGE
  ): void {
    this.window[storage].setItem(key, JSON.stringify(value));
  }

  public clear(): void {
    this.window.localStorage.clear();
    this.window.sessionStorage.clear();
  }

  public reset(storage: TStorage = EnApi.DEFAULT_STORAGE): void {
    this.window[storage].clear();
  }

  public getStorage(storage: TStorage = EnApi.DEFAULT_STORAGE): Storage {
    return this.window[storage];
  }
}

export type TStorage = 'localStorage' | 'sessionStorage';
