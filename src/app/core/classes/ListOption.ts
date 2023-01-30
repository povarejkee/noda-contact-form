import { randomid } from '@core/handlers/shared.handlers';
import { IOption, OptionParams } from '@core/interfaces/IOption';

export class ListOption<
  T extends Array<keyof OptionParams> = [],
  V extends object = object
> implements IOption<T, V>
{
  public id: any = randomid();

  constructor(public params?: IOption<T, V>['params']) {}

  public setID(id: any): ListOption<T, V> {
    this.id = id;

    return this;
  }
}
