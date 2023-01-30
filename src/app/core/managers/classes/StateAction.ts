import { IStateAction } from '../interfaces/IStateAction';

export class StateAction<T extends string, V = null>
  implements IStateAction<T, V>
{
  constructor(public type: T, public payload: V = null) {}
}
