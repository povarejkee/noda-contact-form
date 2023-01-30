import { Directive, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Directive({
  selector: '[ngUpdateFormValue]',
  exportAs: 'formValueRef',
})
export class UpdateFormValueDirective {
  @Input('ngUpdateFormValueType') private type: 'form' | 'control' = 'form';
  @Input('formControl')
  private formControl: FormControl = null;
  @Input('formGroup') private formGroup: FormGroup = null;

  @Input('ngUpdateFormValue') private _ngUpdateFormValue(value: any) {
    const el$ = this.getControlElement();

    if (el$) {
      this.update(el$, value);
    } else {
      setTimeout(this.update, 0, el$, value);
    }
  }

  private getControlElement(): FormGroup | FormControl {
    return this.type === 'form' ? this.formGroup : this.formControl;
  }

  private update(el$: FormGroup | FormControl, value: any) {
    el$.patchValue(value);
  }

  public getValue(): any {
    const el$ = this.getControlElement();

    return el$.value;
  }
}
