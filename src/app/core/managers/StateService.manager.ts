import { Enumerable } from '@core/decorators/decorators';
import { IStateManagers } from '@core/managers/interfaces/IStateManagers';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HelperMethods } from './classes/StateHelper';
import { DatabaseManager } from './Database.manager';
import { StateManager } from './State.manager';
import {
  Constructor,
  IfElse,
  IfElseKeys,
  TServiceState,
  TStateChange,
  TStateConstructors,
  TStates,
  TStateValue,
} from './types/managers.types';

function registerState<S extends object | Constructor<unknown>>(
  key: keyof IStateManagers,
  State: S
) {
  if (!State) return null;

  switch (key) {
    case 'flags':
    case 'state': {
      return new StateManager(
        new (State as Constructor<InstanceType<any>>)(),
        State as Constructor<InstanceType<any>>
      );
    }
    case 'db': {
      return new DatabaseManager(State as object);
    }
  }
}

export function State<
  F extends Constructor<InstanceType<F>> = null,
  S extends Constructor<InstanceType<S>> = null,
  DB extends object = null
>({ flags, state, db }: TStateConstructors<F, S, DB>) {
  class StateController {
    static initializeMethod: string = '_initializeStates';

    private _stateManagers!: IStateManagers<F, S, DB>;

    @Enumerable()
    private _initializeStates(): void {
      this._stateManagers = {
        flags: registerState('flags', flags) as any,
        state: registerState('state', state) as any,
        db: registerState('db', db) as DatabaseManager<DB>,
      };
    }

    @Enumerable()
    public getDataFromDB<
      V,
      K1 extends keyof DB = keyof DB,
      K2 extends keyof DB[K1] = keyof DB[K1],
      K3 extends keyof DB[K1][K2] = keyof DB[K1][K2],
      K4 extends keyof DB[K1][K2][K3] = keyof DB[K1][K2][K3]
    >(keys: [K1, K2?, K3?, K4?], isCopy: boolean = true): V {
      return this._stateManagers.db.get(keys, isCopy);
    }

    @Enumerable()
    public getFullState<M extends TServiceState>(
      managerType: M
    ): IfElse<M, 'flags', InstanceType<F>, InstanceType<S>> {
      return (this._stateManagers[managerType] as StateManager<any>).getFull();
    }

    @Enumerable()
    public setFullState<M extends TServiceState>(
      managerType: M,
      state: TStates<InstanceType<F>, InstanceType<S>, DB>[M]
    ): void {
      this._stateManagers[managerType].setFullState(state as any);
    }

    @Enumerable()
    public getState<
      M extends TServiceState,
      K extends Exclude<
        IfElseKeys<
          M,
          'flags',
          InstanceType<F> & object,
          InstanceType<S> & object
        >,
        HelperMethods
      >
    >(
      managerType: M,
      prop: K
    ): TStateValue<InstanceType<F> & object, InstanceType<S> & object, K> {
      return (this._stateManagers[managerType] as StateManager<any>).get(prop);
    }

    @Enumerable()
    public setState<
      M extends TServiceState,
      K extends Exclude<
        IfElseKeys<
          M,
          'flags',
          InstanceType<F> & object,
          InstanceType<S> & object
        >,
        HelperMethods
      >
    >(
      managerType: M,
      prop: K,
      value: TStateValue<InstanceType<F> & object, InstanceType<S> & object, K>
    ): void {
      (this._stateManagers[managerType] as StateManager<any>).set(prop, value);
    }

    @Enumerable()
    public destroyStates(...managerTypes: TServiceState[]): void {
      managerTypes.forEach((managerType: TServiceState) => {
        (this as any)._stateManagers[managerType]?.reset();
      });
    }

    @Enumerable()
    public stateChanges<M extends TServiceState>(
      managerType: M,
      filterProps?: string[]
    ): Observable<
      TStateChange<M, InstanceType<F> & object, InstanceType<S> & object>
    > {
      return this._stateManagers[managerType]?.listen().pipe(
        // @ts-ignore
        filter(({ property }) => {
          if (filterProps) return filterProps.includes(property);

          return true;
        })
      ) as any;
    }
  }

  return new StateController();
}
