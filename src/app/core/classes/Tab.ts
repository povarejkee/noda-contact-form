import { isJSType } from '@core/handlers/condition.handlers'
export class Tab {

  private _index: number;

  public constructor(
    private _title: string,
    private _description: string = '',
    private _isDisabled: boolean = false,
    private _isChangable: boolean = false
  ) {}

  public get index() {
    return this._index;
  }

  public set index(value: number) {
    const condition = isJSType(this._index, 'number') && !this._isChangable;
  
    if (condition) {
      console.warn('Index already set');
      return;
    }

    this._index = value;
  }

  public get title() {
    return this._title;
  }

  public set title(value: string) {
    if (!this._isChangable) {
      return;
    }
    this._title = value;
  }

  public get description() {
    return this._description;
  }

  public set description(value: string) {
    if (!this._isChangable) {
      return;
    }
    this._description = value;
  }

  public get isDisabled() {
    return this._isDisabled;
  }

  public set isDisabled(value: boolean) {
    if (!this._isChangable) {
      return;
    }
    this._isDisabled = value;
  }

  public get isChangable() {
    return this._isChangable;
  }

  public set isChangable(value: boolean) {
    if (!this._isChangable) {
      return;
    }

    this._isChangable = value
  }
}
