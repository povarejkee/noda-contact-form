import { ElementRef, InjectionToken, Provider } from '@angular/core';
import { isJSType } from './condition.handlers';
import { titlecase } from './string.handlers';

export type TUseProvider = 'class' | 'value' | 'existing' | 'factory';
export function DIProvider<V, T extends InjectionToken<V>>(
  provide: T,
  value: V,
  use: TUseProvider = 'class',
  multi: boolean = true
): Provider {
  const useKey = `use${titlecase(use)}` as `use${Capitalize<TUseProvider>}`;

  return {
    provide,
    [useKey]: value,
    multi,
  } as unknown as Provider;
}

export function deepCopy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function getDataFromDB<
  V,
  T extends object,
  K1 extends keyof T = keyof T,
  K2 extends keyof T[K1] = keyof T[K1],
  K3 extends keyof T[K1][K2] = keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3] = keyof T[K1][K2][K3]
>(keys: [K1, K2?, K3?, K4?], db: T, isCopy: boolean = true, idx = 0): V {
  const value = (db as any)[keys[idx] as string];
  const nextKey = keys[idx + 1];

  if (!isJSType(nextKey, 'string') && idx + 1 < keys.length) {
    throw new Error(
      `Invalid path key.The key type must be a string. 
        Key: ${nextKey as any}, 
        Index: ${idx + 1},
        Path: ${JSON.stringify(keys, (key, value) =>
          !value ? String('undefined') : value
        )}
      `
    );
  }

  if (nextKey && value) {
    return getDataFromDB(keys, value, isCopy, idx + 1);
  }

  return isCopy ? deepCopy(value) : value;
}

export function randomid(arrSize: number = 1): string {
  const id: Uint32Array = new Uint32Array(arrSize);

  window.crypto.getRandomValues(id);

  return id.toString().replace(/,/g, '');
}

export function nativeElement<T extends HTMLElement>(el$: ElementRef<T>): T {
  return el$.nativeElement;
}

export function assign(...args: any[]) {
  return Object.assign({}, ...args);
}
