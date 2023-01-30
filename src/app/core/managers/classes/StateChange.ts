import { IStateChange } from '../interfaces/IStateChange';

export class StateChange<T extends object, K extends keyof T>
  implements IStateChange<T, K> {
  constructor(
    public property: K,
    public previous: T[K],
    public current: T[K],
  ) {}
}
