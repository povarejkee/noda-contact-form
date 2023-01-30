import { randomid } from '@core/handlers/shared.handlers';

export class SelectOption<T extends object = null> {
  public id: string = randomid();

  constructor(public title: string, public value: any, public params?: T) {}
}
