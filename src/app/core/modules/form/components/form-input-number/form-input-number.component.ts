import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ANRepeatState } from '@core/animations/animations';
import { isNotNullish, isNullish } from '@core/handlers/condition.handlers';
import { nativeElement } from '@core/handlers/shared.handlers';
import { sumNumber, toFixed } from '@core/handlers/utility.handlers';
import { TMathAction } from '@core/types/utils.types';
import { BaseFormControlComponent } from '../../classes/BaseFormControlComponent';
import { FormControlProvider } from '../../classes/FormControlProvider';
import { TNumberMask, TRange } from '../../types/form.types';
import { Validators } from '@angular/forms';

@Component({
  selector: 'ng-form-input-number',
  templateUrl: './form-input-number.component.html',
  styleUrls: ['./form-input-number.component.scss'],
  providers: [new FormControlProvider(FormInputNumberComponent)],
  animations: [
    ANRepeatState({
      fromStyle: {
        transform: 'scale(0)',
        opacity: '0',
      },
      toStyle: {
        transform: 'scale(1)',
        opacity: '1',
      },
    }),
  ],
})
export class FormInputNumberComponent
  extends BaseFormControlComponent
  implements OnInit
{
  public maxlength: string = '';
  public min: number = null;
  public max: number = null;

  @Input('min')
  private set _min(value: number) {
    this.min = value;

    setTimeout(() => {
      this.checkedMinValidator(this.min);
    }, 0);
  }

  @Input('max')
  private set _max(value: number) {
    this.max = value;

    setTimeout(() => {
      this.checkedMaxValidator(this.max);
    }, 0);
  }

  @Input('maxlength')
  private set _maxlength(value: string | number) {
    if (isNotNullish(value)) {
      const repeatCount: number = Number(value) - 1;
      const repeatValue: string = '0'.repeat(repeatCount);

      this.maxlength = `1${repeatValue}`;
    }
  }

  @Input() public step: number = 1;
  @Input() public mask: string = '0*';
  @Input() public maskType: TNumberMask = 'default';
  @Input() public dropSpecialCharacters: boolean = true;
  @Input() public allowNegativeNumbers: boolean = false;
  @Input() public thousandSeparator: string = '';
  @Input() public float: number = 0;
  @Input() public currency: string;
  @Input() public placeholder: string = 'Type your value';

  @ViewChild('inputRef')
  public inputRef: ElementRef<HTMLInputElement>;

  override ngOnInit() {
    super.ngOnInit();
    this.initMaskByType(this.maskType);
  }

  private initMaskByType(maskType: TNumberMask): void {
    this.mask = `separator.${this.float}`;

    switch (maskType) {
      case 'negative': {
        this.allowNegativeNumbers = true;
        this.dropSpecialCharacters = false;

        break;
      }
    }
  }

  public setValue(originalValue: any): void {
    const value = this.getParsedValue(originalValue);
    const isCorrectValue: boolean = !Number.isNaN(value);

    if (isCorrectValue) {
      this.value = value;
      this.onChange(this.value);
      this.onTouched();
    }
  }

  private getParsedValue(originalValue: any): number {
    switch (originalValue) {
      case null:
      case '': {
        return null;
      }

      default: {
        return parseFloat(originalValue);
      }
    }
  }

  public setValueByStep(action: TMathAction): void {
    const currentValue: number = isNullish(this.value) ? this.min : this.value;
    const nextValue: number = sumNumber(currentValue, this.step, action);

    this.setValue(nextValue);
  }

  public isDisabledStep(action: TMathAction): boolean {
    if (action === 'inc') {
      const isMoreOrEqualNextStep: boolean =
        isNotNullish(this.max) &&
        (this.value + this.step > this.max || this.value === this.max);

      return isMoreOrEqualNextStep;
    } else {
      const isLessOrEqualNextStep: boolean =
        isNotNullish(this.max) &&
        (this.value - this.step < this.min || this.value === this.min);

      return isLessOrEqualNextStep;
    }
  }

  public blur(): void {
    this.checkValue();
    this.onTouched();
  }

  private checkValue(): void {
    const input$: HTMLInputElement = nativeElement(this.inputRef);
    const value: number = parseFloat(input$.value);

    if (Number.isNaN(value)) {
      this.value = null;
      input$.value = null;
      this.onChange(null);
      this.detect();
    }
  }

  // todo оставлю на всякий эту функцию
  private checkRange(type: TRange): void {
    const isExistsValues: boolean =
      isNotNullish(this[type]) && isNotNullish(this.value);

    if (isExistsValues) {
      const isNotInRange: boolean =
        type === 'min' ? this.value < this.min : this.value > this.max;

      isNotInRange ? this.setValue(this[type]) : void 0;
    }
  }

  private transformToNumber(value: any): number {
    const isIncorrectValue: boolean =
      isNaN(value) || isNullish(value) || value === '';

    return isIncorrectValue ? null : toFixed(value, this.float);
  }

  public writeValue(value: any): void {
    this.value = this.transformToNumber(value);
  }

  private checkedMinValidator(min: number): void {
    const { control } = this.formControl;
    const isAddValidator: boolean =
      !control.hasValidator(Validators.min(min)) && !isNaN(min);
    const isRemoveValidator: boolean =
      control.hasValidator(Validators.min(min)) && !min;

    if (isAddValidator) {
      control.addValidators(Validators.min(min));
    }

    if (isRemoveValidator) {
      control.removeValidators(Validators.min(min));
    }

    control.updateValueAndValidity();
    this.detect();
  }

  private checkedMaxValidator(max: number): void {
    const { control } = this.formControl;
    const isAddValidator: boolean =
      !control.hasValidator(Validators.max(max)) && !isNaN(max);
    const isRemoveValidator: boolean =
      control.hasValidator(Validators.max(max)) && !max;

    if (isAddValidator) {
      control.addValidators(Validators.max(max));
    }

    if (isRemoveValidator) {
      control.removeValidators(Validators.max(max));
    }

    control.updateValueAndValidity();
    this.detect();
  }
}
