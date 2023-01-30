import { forwardRef, Type } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export class FormControlProvider {
  public provide = NG_VALUE_ACCESSOR;
  public useExisting: Type<any>;
  public multi: boolean = true;

  constructor(Component: any) {
    this.useExisting = forwardRef(() => Component);
  }
}
