import { NgControl } from '@angular/forms';

export interface AppFormControl {
  value: any;
  disabled: boolean;
  fieldName: string;
  label: string;
  formControl: NgControl;
}
