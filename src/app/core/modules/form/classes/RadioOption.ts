import { randomid } from '@core/handlers/shared.handlers';

export class RadioOption<V = any> {
  public id: string = randomid();

  constructor(
    public label: string,
    public value: V,
    public description: string = null
  ) {}

  setID(id: string): RadioOption {
    this.id = id;

    return this;
  }
}
