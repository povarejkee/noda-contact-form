import { isEqual } from '@core/handlers/condition.handlers';
import { assign } from '@core/handlers/shared.handlers';

export type HelperMethods = keyof StateHelper<any>;

export class StateHelper<T extends object> {
  public loadID(
    this: T,
    key: Exclude<keyof T, HelperMethods>,
    action: 'add' | 'remove',
    id: string
  ): void {
    if (isEqual(action, 'add')) {
      this[key] = (this[key] as any).concat(id);
    } else {
      this[key] = (this[key] as any).filter((currId: string) => currId !== id);
    }
  }

  public addOrEditItem<
    K extends keyof T,
    Item = T[K] extends [infer A] ? A : null
  >(
    this: T,
    key: Exclude<keyof T, HelperMethods>,
    item: Item,
    findProp: keyof Item
  ): void {
    type Items = T[K] & any[];
    const previousItems = (this[key] as any).concat();
    const idx: number = previousItems.findIndex(
      (curr: any) => curr[findProp] === item[findProp]
    );

    if (~idx) {
      const current: Item = (this[key] as any)[idx];
      const edited: Item = assign(current, item);
      previousItems[idx] = edited;
    } else {
      previousItems.push(item);
    }

    (this as T)[key as keyof T] = previousItems as Items;
  }
}
