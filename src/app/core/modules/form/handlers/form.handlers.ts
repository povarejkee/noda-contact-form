import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { IResponseError } from '@core/api/interfaces/IResponseError';
import { EnApp } from '@core/enums/app.enum';
import {
  isEmptyObject,
  isEqual,
  isInstance,
} from '@core/handlers/condition.handlers';
import { assign } from '@core/handlers/shared.handlers';
import { replace } from '@core/handlers/string.handlers';
import { excludeObjValues, isValidDate } from '@core/handlers/utility.handlers';
import { ISimple } from '@core/interfaces/ISimple';
import { RangeValue } from '../classes/RangeValue';
import { SelectOption } from '../classes/SelectOption';
import { GeneralErrorMessagesDB } from '../db/general-error-messages.db';
import { IValidationLength } from '../interfaces/IValidationLength';
import {
  DateRange,
  TFormErrorEntry,
  TRange,
  TRangeDate,
} from '../types/form.types';

export function completeFormCtrlErrors(
  errors: ISimple<any>,
  fieldName: string,
  errorsModule: ISimple<string>
): string[] {
  if (!errors) return null;

  const errorsDB: ISimple<string> = assign(
    GeneralErrorMessagesDB,
    errorsModule
  );

  return Object.entries(errors).reduce(
    (accum: string[], [errorKey, errorValue]: TFormErrorEntry) => {
      const errorWithTags: string = errorsDB[errorKey] || `Incorrect input`;
      const errorTags: string[] = Object.assign({ fieldName }, errorValue);
      const completedErrorMsg: string = Object.entries(errorTags).reduce(
        (errorMsg, [tag, value]) => {
          errorMsg = replace(errorMsg, `{{${tag}}}`, value);

          return errorMsg;
        },
        errorWithTags
      );

      accum.push(completedErrorMsg);

      return accum;
    },
    []
  );
}

export function getRange<
  M extends IValidationLength,
  L extends TRange,
  K extends keyof M[L]
>(validationMap: M, ctrlName: K, rangeType: L): number {
  const lengthMap: IValidationLength[L] = validationMap[rangeType];

  return lengthMap[ctrlName];
}

export function isDisabledForm(form: FormGroup, ...flags: boolean[]): boolean {
  const { invalid, pristine } = form;

  return invalid || pristine || flags.includes(true);
}

export function makePureFilter<T extends object>(
  filter: T,
  ...values: any[]
): T | Partial<T> | null {
  values = values.length ? values : [null, ''];
  const pureFilter: T | Partial<T> = excludeObjValues(filter, values);

  return isEmptyObject(pureFilter) ? null : pureFilter;
}

export function isEmptyFilter(form: FormGroup) {
  return Boolean(makePureFilter(form.value));
}

export function transfromToSelectOptions<T extends object>(
  options: T[],
  bindTitle: keyof T,
  bindValue: keyof T
): SelectOption[] {
  return options.map((opt: T) => {
    const title = opt[bindTitle] as unknown as string;
    const value = opt[bindValue] as any;

    return new SelectOption(title, value);
  });
}

export function createRange<T extends string | Date = string>(
  range: TRangeDate<T>
): TRangeDate<T> {
  const { dateFrom = null, dateTo = null } = range;

  return new RangeValue(dateFrom, dateTo);
}

export function dateStartReset<T extends string | Date = any>(
  date: T,
  position: DateRange,
  toJSON: boolean = true
) {
  if (!date || !isValidDate(date)) return null;

  const resetDate = new Date(date);

  const startTime = [0, 0, 0, 0] as const;
  const endTime = [23, 59, 59, 59];

  const time = (
    isEqual(position, 'dateFrom') ? startTime : endTime
  ) as typeof startTime;

  resetDate.setHours(...time);

  if (toJSON) return resetDate.toJSON() as any;

  return resetDate as any;
}

export function transformToStrError(error: IResponseError): string {
  const { propertyName, errorMessage } = error;
  const prop: string = propertyName ? `Property "${propertyName}" invalid` : '';
  const msg: string = errorMessage || '';

  return `${prop}. ${msg}`;
}

export function getErrorMessages(err: HttpErrorResponse): string[] {
  if (isInstance(err.error, Array)) {
    return err.error.map(transformToStrError);
  }

  return [err.message];
}

export function getControlErrorMessages(
  { error: errors }: HttpErrorResponse,
  formControlName: string
) {
  if (!Array.isArray(errors)) return [];

  const pickedErrors: string[] = errors
    .filter((e: IResponseError) => formControlName === e.propertyName)
    .map((e: IResponseError) => e.errorMessage);

  return pickedErrors;
}

export function getResponseErrorMessages({
  error: errors,
}: HttpErrorResponse): string[] {
  return Object.values(errors.errors).reduce(
    (accum: string[], msgs: string[]) => {
      if (Array.isArray(msgs)) {
        accum = accum.concat(msgs);
      }

      return accum;
    },
    []
  ) as string[];
}

export function resetControls(form: FormGroup, controls: string[]): void {
  controls.forEach((c) => form.get(c)?.reset());
}

// * forms values decorators

export function decorateFormValueToDateFormat<V extends object = any>(
  formValue: V,
  format: string,
  controlsNames: Array<keyof V>
): void {
  controlsNames.forEach((controlName: keyof V) => {
    const dateValue: any = formValue[controlName];
    const isCanChange: boolean = isValidDate(dateValue);

    if (isCanChange) {
      formValue[controlName] = formatDate(
        dateValue,
        format,
        EnApp.DATE_LOCALE
      ) as unknown as V[keyof V];
    }
  });
}

export function decorateFormValueReplaceValues<V extends object = any>(
  formValue: V,
  controlsNames: Array<keyof V>,
  fromValue: any,
  toValue: any
): void {
  controlsNames.forEach((c: keyof V) => {
    const controlValue: V[keyof V] = formValue[c];
    const isCanChange: boolean =
      c in formValue && isEqual(controlValue, fromValue);

    if (isCanChange) {
      formValue[c] = toValue;
    }
  });
}
