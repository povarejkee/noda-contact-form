import { DatabaseManager } from '@core/managers/Database.manager';
import { StateManager } from '@core/managers/State.manager';
import { Constructor } from '../types/managers.types';

export interface IStateManagers<
  F extends Constructor<InstanceType<F>> = any,
  S extends Constructor<InstanceType<S>> = any,
  DB extends object = any
> {
  // TODO
  // @ts-ignore
  flags: StateManager<F>;
  // TODO
  // @ts-ignore
  state: StateManager<S>;
  db: DatabaseManager<DB>;
}
