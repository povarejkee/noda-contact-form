import { JSDataType } from '@core/types/libs.types';

export function isNotNullish(value: unknown): boolean {
  switch (value) {
    case null:
    case undefined:
      return false;
    default:
      return true;
  }
}

export function isNullish(value: unknown) {
  return !isNotNullish(value);
}

export function isJSType(value: any, type: JSDataType): boolean {
  return isEqual(typeof value, type);
}

export function isEveryJSType(type: JSDataType, ...values: any[]): boolean {
  return values.every((v) => isJSType(v, type));
}

export function isInstance(value: any, Constructor: { new (): any }): boolean {
  return value instanceof Constructor;
}

export function isEqual(v1: any, v2: any): boolean {
  return Object.is(v1, v2);
}

export function isNotEqual(v1: any, v2: any): boolean {
  return !Object.is(v1, v2);
}

export function isEqualJSON(v1: any, v2: any): boolean {
  return (
    Boolean(v1) &&
    Boolean(v2) &&
    isEqual(JSON.stringify(v1), JSON.stringify(v2))
  );
}

export function isNotEqualJSON(v1: any, v2: any): boolean {
  return !isEqual(JSON.stringify(v1), JSON.stringify(v2));
}

export function isEmptyObject<T>(object: T): boolean {
  return Object.keys(object).length === 0;
}

export function arraysIsContain(
  searchElement: unknown,
  ...arrays: Array<unknown[]>
): boolean {
  return arrays.some((arr) => arr?.includes(searchElement));
}

export function isDate(value: any): boolean {
  return !Number.isNaN(Date.parse(value));
}
