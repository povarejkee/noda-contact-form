import { ExtractKeys } from '@core/types/libs.types';
import { IStateAction } from '../interfaces/IStateAction';
import { IStateChange } from '../interfaces/IStateChange';
import { IStateManagers } from '../interfaces/IStateManagers';

export type TDestroyStream<T = unknown> =
  | string
  | { streamKey: string; value: T };
export type TErrorEvent<A extends IStateAction> =
  | 'error'
  | `error-${A['type']}`;
export type TRequestError<A extends IStateAction> = {
  type: TErrorEvent<A>;
  errors: string[];
};
export type TDetectionEvent<A extends IStateAction> = A['type'] | 'default';

// * Extends Factory
export type Constructor<T = {}> = new (...args: any[]) => T;
export type MixinInitializer<T extends object = object> = {
  new (...args: any[]): T;
  initializeMethod: string;
};

// * Extends Factory

// * State Manager

export type TStateValue<
  F extends object,
  S extends object,
  P
> = P extends keyof F ? F[P] : P extends keyof S ? S[P] : unknown;

export type TServiceState = ExtractKeys<IStateManagers, 'flags' | 'state'>;
export type IfElse<V1, V2, R1, R2> = V1 extends V2 ? R1 : R2;

export type IfElseKeys<
  V1,
  V2,
  R1 extends object,
  R2 extends object
> = keyof IfElse<V1, V2, R1, R2>;

export type TStateChange<
  M extends TServiceState,
  F extends object,
  S extends object
> = M extends 'flags'
  ? IStateChange<F, keyof F>
  : M extends 'state'
  ? IStateChange<S, keyof S>
  : never;

export type TStates<F, S, DB> = {
  flags?: F;
  state?: S;
  db?: DB;
};

export type TStateConstructors<
  F extends Constructor<InstanceType<F>> = null,
  S extends Constructor<InstanceType<S>> = null,
  DB extends object = null
> = {
  flags?: F;
  state?: S;
  db?: DB;
};

// * State Manager

// * Stream Manager

export type TStreamManager = 'unsubscribe' | 'action' | 'error' | 'detector';

// * Stream Manager
