import { Observable } from 'rxjs';

export interface OnInitErrorPicker {
  pickFormControlErrors: (formControlName: string) => Observable<string[]>;
}
