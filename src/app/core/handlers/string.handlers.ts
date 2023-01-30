import { isJSType } from './condition.handlers';

export function titlecase<T extends string = string>(str: T): Capitalize<T> {
  return (str[0].toUpperCase() + str.slice(1)) as Capitalize<T>;
}

export function addPrefixIfNot(str: string, prefixStr: string) {
  if (!str || !prefix) return str;

  const isContainPrefix: boolean = str.startsWith(prefixStr);

  return isContainPrefix ? str : prefix(str, prefixStr);
}

export function replace(
  str: string,
  from: string,
  to: string | number,
  flags: string = 'gi'
): string {
  const reg: RegExp = new RegExp(`${from}`, flags);

  return str.replace(reg, String(to));
}

export function prefix(str: unknown, tag: string): string {
  return `${tag}${String(str)}`;
}

export function suffix(str: unknown, tag: string): string {
  return `${String(str)}${tag}`;
}

export function trim(str: any): string {
  if (isJSType(str, 'string')) {
    return str.replace(/\s+/g, ' ').trim();
  }

  return str;
}

export function removeSpaces(str: string): string {
  if (isJSType(str, 'string')) {
    return str.replace(/\s+/g, '').trim();
  }

  return str;
}

export function trimStringValues<T extends object>(
  obj: T,
  removeValSpaces: boolean = false
): T {
  const trimMethod = removeValSpaces ? removeSpaces : trim;

  return Object.entries(obj).reduce((accum, [key, value]) => {
    const isString: boolean = isJSType(value, 'string');
    (accum as T)[key as keyof T] = isString ? trimMethod(value) : value;

    return accum;
  }, {} as T);
}

export function joinUrl(
  args: (string | number)[],
  separator: string = '/'
): string {
  return args.join(separator);
}

export function wrapString(
  str: string,
  startWith: string,
  endWith: string = startWith
): string {
  return `${startWith}${str}${endWith}`;
}

export function testIncludeWord(str: string, word: string): boolean {
  const regexp = new RegExp(`\\b${word}\\b`);

  return regexp.test(str);
}

export function isEqualStrings(str1: string, str2: string): boolean {
  const isExistStrings: boolean =
    isJSType(str1, 'string') && isJSType(str2, 'string');

  if (isExistStrings) {
    return str1.toLowerCase() === str2.toLowerCase();
  }

  return false;
}
