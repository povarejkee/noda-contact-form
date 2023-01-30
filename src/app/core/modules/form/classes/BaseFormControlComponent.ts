import {
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { ANStyles } from '@core/animations/animations';
import {
  isEqual,
  isNotNullish,
  isNullish,
} from '@core/handlers/condition.handlers';
import { getDataFromDB } from '@core/handlers/shared.handlers';
import { ISimple } from '@core/interfaces/ISimple';
import { ControlErrorMessagesDB } from '../db/control-error-messages.db';
import { Bind } from '../decorators/decorators';
import { completeFormCtrlErrors } from '../handlers/form.handlers';
import {
  TControlErrorModule,
  TControlMode,
  TErrorStrategy,
} from '../types/form.types';
import { ErrorMatcher } from './ErrorStateMatcher';

@Component({
  selector: 'base-form-control',
  template: '',
  animations: [
    ANStyles({
      animationName: 'ANShowResetIcon',
      fromStyle: {
        overflow: 'hidden',
        width: '0px',
      },
      toStyle: {
        overflow: 'hidden',
        width: '*',
      },
    }),
  ],
})
export abstract class BaseFormControlComponent<T = any>
  implements ControlValueAccessor, OnInit
{
  public value: T;
  public disabled: boolean;
  public formControl: NgControl;
  public errors: string[];
  public errorMatcher: ErrorMatcher;
  public errorStrategy: TErrorStrategy = 'pristine';
  public required: boolean = false;
  public appearance: MatFormFieldAppearance = 'outline';

  @Input('fieldName') public fieldName: string = '';
  @Input('formControlName') public formControlName: string;
  @Input('locator') public locator: string;
  /**
   * @param mode equal  "theme"  for all components in project
   * @param mode equal  "table" for only TableColumnFilterComponent
   */
  @Input('mode') public mode: TControlMode = 'theme';
  @Input('label') public label: string = 'Enter a value';
  @Input('errorStrategy') public set _errorStrategy(
    errorStrategy: TErrorStrategy
  ) {
    this.errorStrategy = errorStrategy ?? 'pristine';
    this.errorMatcher?.setStrategy(errorStrategy);
  }
  @Input('errors') private set _errors(value: string[]) {
    if (value) {
      this.updateCustomErrors(value);
      this.formControl.control.updateValueAndValidity();
    }
  }
  @Input('errorModule') public errorModule: TControlErrorModule;

  @Input('reset') public reset: boolean;
  @Input('readonly') public readonly: boolean = false;
  @Input('resetValue') public resetVal: any = null;

  @Input('required') private set _required(value: boolean) {
    this.required = value;

    setTimeout(() => {
      this.checkedRequiredValidator(this.required);
    }, 0);
  }

  protected onChange: (v: any) => void = (v: any) => {};
  public onTouched: () => void = () => {};

  constructor(protected injector: Injector, protected cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initFormControl();
  }

  private initFormControl(): void {
    this.formControl = this.injector.get(NgControl);

    this.errorMatcher = new ErrorMatcher(
      this.formControl,
      this.isExistCustomErrors,
      this.errorStrategy
    );
  }

  abstract setValue(value: unknown): void;
  abstract writeValue(value: unknown): void;

  public detect(): void {
    this.cdr.detectChanges();
  }

  registerOnChange(cb: (v: any) => void): void {
    this.onChange = cb;
  }

  registerOnTouched(cb: () => void): void {
    this.onTouched = cb;
  }

  setDisabledState(status: boolean): void {
    this.disabled = status;
    this.detect();
  }

  public resetValue(e: Event): void {
    e.stopPropagation();
    this.setValue(this.resetVal);
  }

  @Bind()
  protected isExistCustomErrors(): boolean {
    return Boolean(this.errors) && Array.isArray(this.errors);
  }

  protected updateCustomErrors(errors: string[]): void {
    this.errors = errors;
    this.formControl.control.updateValueAndValidity();
  }

  private getControlErrorModule(): ISimple<string> {
    return this.errorModule
      ? getDataFromDB([this.errorModule], ControlErrorMessagesDB)
      : {};
  }

  public getErrorsMessages(): string[] {
    const errors: ValidationErrors = this.formControl?.errors;
    const erorrsArray: string[] =
      completeFormCtrlErrors(
        errors,
        this.fieldName || this.label,
        this.getControlErrorModule()
      ) || [];

    if (this.isExistCustomErrors()) {
      erorrsArray.push(...this.errors);
    }

    return erorrsArray;
  }

  private checkedRequiredValidator(required: boolean): void {
    const { control } = this.formControl;
    const isAddValidator: boolean =
      !control.hasValidator(Validators.required) && required;
    const isRemoveValidator: boolean =
      control.hasValidator(Validators.required) && !required;

    if (isAddValidator) {
      control.addValidators(Validators.required);
    }

    if (isRemoveValidator) {
      control.removeValidators(Validators.required);
    }

    control.updateValueAndValidity();
    this.detect();
  }

  public get isShowResetIcon(): boolean {
    const { reset, disabled, readonly } = this;
    const flags: boolean[] = [
      reset || isEqual(this.mode, 'table'),
      !disabled,
      !readonly,
      isNotNullish(this.value),
    ];

    return flags.every((flag) => flag);
  }

  public isDisabledReset(): boolean {
    const { readonly } = this;
    const { disabled } = this.formControl;

    return disabled || readonly || isNullish(this.value);
  }

  public controlToDefaultState(): void {
    this.formControl.control.markAsPristine();
    this.formControl.control.markAsUntouched();
  }
}
