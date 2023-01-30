import { Component, Input } from '@angular/core';
import { BaseFormControlComponent } from './BaseFormControlComponent';

@Component({
  selector: 'ng-form-text-control',
  template: '',
})
export abstract class TextControlComponent extends BaseFormControlComponent {
  @Input('placeholder') public placeholder: string;
  @Input('minlength') public minlength: string;
  @Input('maxlength') public maxlength: string;

  public getPlaceholder(): string {
    return this.placeholder || `Введите "${this.fieldName}"`;
  }

  public setValue(value: string | number): void {
    this.onChange(value);
    this.onTouched();
    this.cdr.detectChanges();
  }

  public resetValue(): void {
    this.setValue(null);
  }
}
