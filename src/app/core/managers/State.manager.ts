import { Observable, Subject } from 'rxjs';
import { StateChange } from './classes/StateChange';
import { IStateChange } from './interfaces/IStateChange';
import { Constructor } from './types/managers.types';

export class StateManager<T extends Constructor<T>> {
  private currentState!: InstanceType<T>;
  private change$: Subject<IStateChange<T, keyof T>> = new Subject();

  constructor(state: InstanceType<T>, private StateConstructor: T) {
    this.initialize(state);
  }

  private initialize(state: InstanceType<T>): void {
    this.currentState = state;
  }

  public get<K extends keyof T>(key: K): T[K] {
    return this.currentState[key];
  }

  public set<K extends keyof T>(key: K, value: InstanceType<T>[K]): void {
    const previous: T[K] = this.get(key);

    this.currentState[key] = value;
    this.next(key, previous, value);
  }

  public getFull(): T {
    return this.currentState;
  }

  public listen(): Observable<IStateChange<T, keyof T>> {
    return this.change$.asObservable();
  }

  private next<K extends keyof T>(
    property: K,
    previous: T[K],
    current: T[K]
  ): void {
    const change: IStateChange<T, K> = new StateChange(
      property,
      previous,
      current
    );

    this.change$.next(change);
  }

  public setFullState(state: InstanceType<T>): void {
    this.initialize(state);
  }

  public reset(): void {
    this.currentState = new this.StateConstructor() as InstanceType<T>;
  }
}
