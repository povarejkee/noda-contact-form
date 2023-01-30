import { TemplateRef } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Moment } from 'moment';
import { Observable } from 'rxjs';

//  * Validations

export type TValueChecker<T> = (value: T) => boolean;
export type TRange = 'min' | 'max';
export type TRangeDate<T extends Moment | Date | string = Date> = Partial<
  Record<DateRange, T>
>;

export type DateRange = 'dateFrom' | 'dateTo';
// *Form Controls

export type TFormControl =
  | 'input-text'
  | 'input-number'
  | 'input-autocomplete'
  | 'select'
  | 'radio'
  | 'date'
  | 'date-range'
  | 'date-time-picker';
export type TControlMode = 'theme' | 'table';
export type TControlStatus = 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED';
export type TextControl = 'textarea' | 'input';
export type TInput = 'text' | 'password' | 'file' | 'number' | 'tel';
export type TInputText = Extract<TInput, 'text' | 'password'>;
export type TAffix = 'prefix' | 'suffix';
export type TContolAffix = TAffixTemplate | TAffixTag;
export type TAffixTemplate = TemplateRef<any>;
export type TPengingTemplate = TemplateRef<any> | string;
export type TAffixTag = 'hide' | 'reset' | 'email' | 'search';
export type TAllowStatus = 'disabled' | 'enabled';
export type TimeValue = 'minutes' | 'hours';
export type TFormState = 'edited' | 'readonly';
export type TFormMode = 'create' | 'edit';
export type TMask =
  | 'default'
  | 'tax'
  | 'swift'
  | 'iban'
  | 'sort-routing'
  | 'string'
  | 'uppercase'
  | 'lowercase'
  | 'number'
  | 'phone';
export type TNumberMask = 'default' | 'negative';
export type TAutocomplete = 'default' | 'country' | 'calling-codes';
export type TInputSelectOptions = any[];
export type TControlOption<T = unknown> = {
  id: number;
  label: string;
  value: T;
};

//  ! Errors types

export type TFormErrorEntry = [string, any];
export type TControlErrorModule = 'form-radio';
export type TErrorStrategy = 'default' | 'pristine';

// * FormValidator Types

export type TAsyncDebounceParams<T> = [
  (v: any) => Observable<T>,
  (v: T) => ValidationErrors
];
