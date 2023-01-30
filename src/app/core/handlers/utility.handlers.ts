import { HttpParams } from '@angular/common/http';
import { TimeValue, TRange } from '@core/modules/form/types/form.types';
import { TSortDirection } from '@core/types/state.types';
import { TMathAction } from '@core/types/utils.types';
import * as moment from 'moment';
import { Moment } from 'moment';
import { MonoTypeOperatorFunction, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { isEqual, isNullish } from './condition.handlers';
import { assign } from './shared.handlers';

export function redirectTo(
  url: string,
  target: '_self' | '_blank' = '_blank'
): void {
  const link$: HTMLAnchorElement = document.createElement('a');

  link$.setAttribute('href', url);
  link$.setAttribute('target', target);

  link$.click();
}

export function isValidDate(date: any): boolean {
  if (isNullish(date)) return false;

  const toDate = +new Date(date);

  return !Number.isNaN(toDate);
}

export function checkDateRange(
  date: Date | string,
  minDate: Date,
  maxDate: Date
): Date {
  const isDate: boolean = isValidDate(date);
  if (!date || !isDate) return null;

  const momentDate: Moment = moment(new Date(date));
  const isLess: boolean = momentDate.isBefore(minDate);
  const isMore: boolean = momentDate.isAfter(maxDate);

  return isLess ? minDate : isMore ? maxDate : new Date(date);
}

export function skipDateChanges(date: Date, minDate: Date, maxDate: Date) {
  if (!date) return null;

  const momentDate: Moment = moment(date);
  const isLess: boolean = momentDate.isBefore(minDate);
  const isMore: boolean = momentDate.isAfter(maxDate);

  return isLess || isMore;
}

export function getWeekDays(
  type: 'previous-week' | 'current-week',
  date: Date = new Date()
): Date[] {
  date = copyDate(date);
  const firstWeekDay: number = 1;
  const lastWeekDay: number = 7;
  const currentDay: number = date.getDay() || lastWeekDay;
  const days: Date[] = [];
  const isNotFirstWeekDay: boolean = date.getDay() !== firstWeekDay;

  if (isNotFirstWeekDay) {
    date.setDate(date.getDate() - (currentDay - 1));
  }

  if (type === 'previous-week') {
    date.setDate(date.getDate() - lastWeekDay);
  }

  while (days.length < 7) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  if (type === 'current-week') {
    days.splice(currentDay);
  }

  return days;
}

export function getFirstAndLastElements<T = any>(array: T[]): [T, T] {
  const firstElement: T = array[0];
  const lastElement: T = array.length >= 1 ? array[array.length - 1] : null;

  return [firstElement, lastElement];
}

export function preventDisabledSetDate(
  date: Date,
  rangeDate: Date,
  time: TimeValue,
  rangeType: TRange,
  offset: number = 1
): boolean {
  if (!date || !rangeDate) return false;

  const offsetValue: number = isEqual(rangeType, 'min') ? -offset : offset;

  const momentDate: Moment = moment(date).add(offsetValue, time);
  const compareMethod = isEqual(rangeType, 'min') ? 'isBefore' : 'isAfter';

  return momentDate[compareMethod](rangeDate);
}

export function getNextSortDirection(sortDir: TSortDirection): TSortDirection {
  switch (sortDir) {
    case '': {
      return 'asc';
    }
    case 'asc': {
      return 'desc';
    }
    case 'desc': {
      return '';
    }
  }
}

export function excludeObjValues<T extends object>(
  obj: T,
  values: any[] = ['', null, undefined]
): Partial<T> {
  return Object.entries(obj).reduce((accum, [key, value]) => {
    if (values.includes(value)) return accum;

    accum[key as keyof T] = value;

    return accum;
  }, {} as Partial<T>);
}

export function excludeObjProps<T extends object, K extends keyof T = null>(
  obj: T,
  keys: K[]
): Omit<T, typeof keys[number]> {
  return Object.entries(obj).reduce((accum, [key, value]) => {
    const isIncludeProp: boolean = keys.includes(key as K);

    if (!isIncludeProp) {
      accum[key as keyof Omit<T, typeof keys[number]>] = value;
    }

    return accum;
  }, {} as Omit<T, typeof keys[number]>);
}

export function pickObjectProps<T extends object, V extends object>(
  parent: T,
  child: V
): Partial<T> {
  return Object.keys(parent).reduce((accum, key) => {
    if (key in child) {
      accum[key as keyof T] = (<any>child)[key as keyof T];
    }
    return accum;
  }, {} as Partial<T>);
}

export function selectObjectProps<
  T extends object,
  K extends Array<keyof T> = Array<keyof T>
>(object: T, props: K): { [Key in K[number]]: T[Key] } {
  return props.reduce((accum, key) => {
    (accum as any)[key] = object[key];

    return accum;
  }, {}) as any;
}

export function setObjectValues<T extends object = any>(
  object: T,
  value: any
): T {
  return Object.entries(object).reduce((accum, [key]) => {
    (accum as T)[key as keyof T] = value;

    return accum;
  }, {} as T);
}

export function copyDate(date: any): Date {
  return new Date(date);
}

export function findIndexByProp<T, K extends keyof T>(
  items: T[],
  prop: K,
  value: T[K]
): number {
  return items.findIndex((curr) => curr[prop] === value);
}

export function removeItemByProp<T>(items: T[], item: T, prop: keyof T): T[] {
  return items.filter((curr) => curr[prop] !== item[prop]);
}

export function removeItem<T>(items: T[], item: T): T[] {
  return items.filter((curr) => curr !== item);
}

export function updateItem<T>(items: T[], item: T | Partial<T>, prop: keyof T) {
  const currentIdx: number = findIndexByProp(items, prop, item[prop]);

  if (~currentIdx) {
    const updateItem: T = assign(items[currentIdx], item);

    items[currentIdx] = updateItem;

    return items.concat();
  }

  return items;
}

export function findAndMergeItems<T extends object>(
  newItems: T[],
  currentItems: T[],
  prop: keyof T
): T[] {
  currentItems = currentItems.concat();

  newItems.forEach((item) => {
    const idx: number = findIndexByProp(currentItems, prop, item[prop]);

    if (~idx) {
      currentItems[idx] = assign(currentItems[idx], item);
    }
  });

  return currentItems;
}

export function createRangeArray(from: number, to: number): number[] {
  const length: number = to - from;

  return Array.from({ length }, (v, i) => from + i);
}

export function toHttpParams<T extends object = any>(query: T): HttpParams {
  const params = new HttpParams({ fromObject: query as any });

  return params;
}

export function ofType<T extends string>(
  ...actions: T[]
): MonoTypeOperatorFunction<T> {
  return filter((action: T) => actions.includes(action));
}

export function pairwiseValues<T>() {
  let previousValue: T = null;

  return pipe(
    map((nextValue: T) => {
      const pair: [T, T] = [previousValue, nextValue];
      previousValue = nextValue;

      return pair;
    })
  );
}

export function toFixed(num: string | number, fixed: number): number {
  num = String(num);

  const isFractional: boolean = String(num).includes('.');

  if (!isFractional) return Number(num);

  const [integer, float] = num.split('.');

  if (fixed === 0) {
    return Number(integer);
  }
  const slicedFloatValue: string = float.slice(0, fixed);
  const value: string = `${integer}.${slicedFloatValue}`;

  return Number(value);
}

export function sumNumber(a: number, b: number, action: TMathAction): number {
  const isFloat: boolean = b.toString().includes('.');

  if (isFloat) {
    a = +(a * 100).toFixed(0);
    b = +(b * 100).toFixed(0);
  }

  const value: number = action === 'inc' ? a + b : a - b;

  return isFloat ? value / 100 : value;
}
