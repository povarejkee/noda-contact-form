import { getDataFromDB } from '@core/handlers/shared.handlers';

export class DatabaseManager<T extends object> {
  constructor(private db: T) {}

  get<
    V,
    K1 extends keyof T = keyof T,
    K2 extends keyof T[K1] = keyof T[K1],
    K3 extends keyof T[K1][K2] = keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3] = keyof T[K1][K2][K3]
  >(keys: [K1, K2?, K3?, K4?], isCopy: boolean = true): V {
    return getDataFromDB<V, T, K1, K2, K3, K4>(keys, this.db, isCopy);
  }
}
