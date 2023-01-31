import { EnPagination } from '../enums/pagination.enum';
import { IPage } from '../interfaces/IPage';

export class Page implements IPage {
  constructor(
    public pageSize: number = EnPagination.DEFAULT_PAGE_SIZE,
    public pageNumber: number = 0
  ) {}

  public nextPage(): void {
    this.pageNumber++;
  }

  public setPage(page: number): void {
    this.pageNumber = page;
  }

  public setSize(size: number): void {
    this.pageSize = size;
  }

  public set(page: IPage): void {
    Object.assign(this, page);
  }

  public reset(): void {
    Object.assign(this, new Page());
  }
}
