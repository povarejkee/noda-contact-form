import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
//  *RxJS

export type TRxSubject<T> = Subject<T> | BehaviorSubject<T> | ReplaySubject<T>;

// *Typescript

export type Entries<
  T extends object,
  K extends keyof T = keyof T
> = (K extends infer Key ? [Key, T[K]] : [K, T[K]])[];

export type Titlecase<T extends string> = T extends `${infer F}${infer L}`
  ? `${Uppercase<F>}${L}`
  : T;
export type Keys<T> = keyof T;
export type ExtractKeys<T, K extends keyof T> = K;
export type ExtractValues<T, K extends T> = K;
export type KeysFiller<T extends object, V> = {
  [K in keyof T]?: V;
};
export type TKeyValue<K, V> = {
  key: K;
  value: V;
};
export type EnumKeys<T = object> = keyof T;
export type EnumValues<T = object> = T[EnumKeys<T>];

export type MixedRequired<T extends object, R extends keyof T> = Partial<
  Omit<T, R>
> & {
  [K in R]: T[K];
};

//  *JS
export type JSDataType =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function';
