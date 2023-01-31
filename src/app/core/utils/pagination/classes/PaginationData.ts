import { IPaginationData } from '../interfaces/IPaginationData';

export class PaginationData<T> implements IPaginationData<T> {
  constructor(public items: T[], public totalItems: number) {}
}
