import { assign } from '@core/handlers/shared.handlers';
import { findIndexByProp } from '@core/handlers/utility.handlers';
import { TInsert } from '@core/types/state.types';
import { IPaginationData } from '../interfaces/IPaginationData';
import { PaginationData } from './PaginationData';

export class PaginationDataManager<T = any> {
  public items: T[];
  private totalItems: number;
  private full: boolean;

  constructor({ items, totalItems }: IPaginationData<T>) {
    this.items = items.concat();
    this.totalItems = totalItems;
  }

  public getItems(): IPaginationData<T> {
    const { items, totalItems } = this;

    return new PaginationData<T>(items, totalItems);
  }

  public insertItem(
    item: T,
    insertType: TInsert = 'replace'
  ): IPaginationData<T> {
    const { items, totalItems } = this;

    switch (insertType) {
      case 'replace':
        this.items = items.concat();
        this.totalItems = totalItems;
        break;
      case 'begin': {
        this.items = [item, ...this.items];
        this.totalItems++;
        break;
      }
      case 'end': {
        this.items = this.items.concat(item);
        this.totalItems++;
        break;
      }
    }

    return this.getItems();
  }

  public removeItem(item: T, prop: keyof T): IPaginationData<T> {
    const idx: number = findIndexByProp(this.items, prop, item[prop]);

    if (~idx) {
      this.items.splice(idx, 1);
      this.totalItems--;
    }

    return this.getItems();
  }

  public editItem(item: T, prop: keyof T): IPaginationData<T> {
    const idx: number = findIndexByProp(this.items, prop, item[prop]);

    if (~idx) {
      const current: T = this.items[idx];

      const updateItem: T = assign(current, item);
      this.items[idx] = updateItem;
    }

    return this.getItems();
  }

  public resetItems(): IPaginationData<T> {
    this.items = [];
    this.totalItems = 0;
    this.full = true;

    return this.getItems();
  }

  public isFullItems(): boolean {
    return !(this.items.length < this.totalItems);
  }
}
