import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ANShowFade } from '@core/animations/animations';
import { Initialize, TrackBy } from '@core/decorators/decorators';
import {
  isEmptyObject,
  isEqual,
  isNotNullish,
  isNullish,
} from '@core/handlers/condition.handlers';
import { assign } from '@core/handlers/shared.handlers';
import { testIncludeWord } from '@core/handlers/string.handlers';
import {
  excludeObjProps,
  getNextSortDirection,
  setObjectValues,
} from '@core/handlers/utility.handlers';
import { TDetectionEvent } from '@core/managers/types/managers.types';
import { Bind } from '@core/modules/form/decorators/decorators';
import { NSMaterial } from '@core/modules/material/material.namespace';
import { TInsert, TSortDirection } from '@core/types/state.types';
import { Page } from '@core/utils/pagination/classes/Page';
import { PaginationData } from '@core/utils/pagination/classes/PaginationData';
import { PaginationDataManager } from '@core/utils/pagination/classes/PaginationData.manager';
import { IPaginationData } from '@core/utils/pagination/interfaces/IPaginationData';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { TableColumn } from '../../classes/TableColumn';
import { TableToggleColumn } from '../../classes/TableToggleColumn';
import {
  ITableComponent,
  TableUpdateRowsCb,
} from '../../interfaces/ITableComponent';
import { TableDataService } from '../../services/table.data.service';
import { TableViewService } from '../../services/table.view.service';
import { TableDataFlags } from '../../states/table.data.flags';
import { TableViewFlags } from '../../states/table.view.flags';
import { TableViewState } from '../../states/table.view.state';
import {
  TableActions,
  TableRowsRequest$,
  TLoaderContentMode,
} from '../../types/table.types';

@UntilDestroy()
@Component({
  selector: 'ng-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [TableDataService, TableViewService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ANShowFade()],
})
export class TableComponent implements OnInit, AfterViewInit, ITableComponent {
  @Input() public mode: 'default' | 'transparent' | 'filtered' = 'default';
  @Input() public headerTitle: string;
  @Input() public emptyMessage: string = 'No rows yet';
  @Input() public fixedLayout: boolean = false;
  @Input() public defaultFilter: any;
  @Input() public defaultSortField: string = null;
  @Input('columns') public tableColumns: TableColumn[];
  @Input() public sizeOptions = NSMaterial.SizeOptions as number[];
  @Input() public clickableRow: boolean = false;
  @Input('rows') public set _rows(value: PaginationData<any>) {
    if (value) {
      setTimeout(() => {
        this.changeRows(value);
      }, 0);
    }
  }
  @Input('rowsRequest') public rowsRequest$: TableRowsRequest$;

  @Output('rowClick') private _rowClick = new EventEmitter<any>();
  @Output('initialize') private _initialize = new EventEmitter<any>();

  @ViewChild('tableRef', { read: MatTable }) tableRef$: MatTable<any>;
  @ContentChild('TableHeaderTemplate', { read: TemplateRef })
  public tableHeaderTemplate: TemplateRef<any>;
  @ContentChild('TableCellTemplate', { read: TemplateRef })
  public tableCellTemplate: TemplateRef<any>;
  @ContentChild('TableDetailsTemplate', { read: TemplateRef })
  public tableDetailsTemplate: TemplateRef<any>;

  public rows$: Observable<IPaginationData<any>> = this.dataService.getStream(
    'rows$'
  );
  public columns$: Observable<TableColumn[]> = this.viewService.getStream(
    'columns$'
  );

  public readonly dataFlags: TableDataFlags = this.dataService.getFullState(
    'flags'
  );
  public readonly viewFlags: TableViewFlags = this.viewService.getFullState(
    'flags'
  );
  public readonly viewState: TableViewState = this.viewService.getFullState(
    'state'
  );

  constructor(
    private cdr: ChangeDetectorRef,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private dataService: TableDataService,
    public viewService: TableViewService
  ) {}

  ngOnInit(): void {
    this.viewService.initColumns(this.tableColumns);

    if (this.rowsRequest$) {
      this.dataService.initFetchSub(this.rowsRequest$);
      this.initDefaultSort();
      this.initRouterSub();
    }
  }

  ngAfterViewInit(): void {
    this._initialize.emit();
  }

  ngOnDestroy(): void {
    this.dataService.destroy();
    this.dataService.destroyStreams(['fetch$', 'rows$']);
  }

  @Initialize()
  initDetectionChanges(): void {
    this.dataService
      .detectChanges()
      .pipe(untilDestroyed(this))
      .subscribe((action: TDetectionEvent<TableActions>) => {
        this.cdr.detectChanges();
      });

    this.viewService
      .detectChanges()
      .pipe(untilDestroyed(this))
      .subscribe((action: TDetectionEvent<TableActions>) => {
        this.cdr.detectChanges();
      });
  }

  private initRouterSub(): void {
    this.activatedRoute.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((params: Params) => {
        const query: Params = Object.assign(
          new Page(this.sizeOptions[0]),
          params
        );
        const filter: Params = this.getCurrentFilter();

        this.viewService.setState('state', 'filter', filter);

        this.fetch(query);
      });
  }

  public initDefaultSort(): void {
    const orderBy: string = this.activatedRoute.snapshot.queryParamMap.get(
      'orderBy'
    );
    const isCanApplyDefaultFilter: boolean =
      isNullish(orderBy) && isNotNullish(this.defaultSortField);

    if (isCanApplyDefaultFilter) {
      const column: TableColumn = this.viewService.getColumnByDef(
        this.defaultSortField
      );

      this.sortColumn(column, 'desc');
    }
  }

  @TrackBy('property', 'default')
  public trackByCellFn() {}

  @TrackBy('property', 'id')
  public trackById() {}

  public loaderContentMode(rows: IPaginationData<any>): TLoaderContentMode {
    return rows.items.length <= 2 ? 'small' : 'standard';
  }

  public loaderContentDiameter(rows: IPaginationData<any>): number {
    return rows.items.length <= 2 ? 40 : 100;
  }

  public rowClick(row: any): void {
    this._rowClick.emit(row);
  }

  public updateRows(cb: TableUpdateRowsCb): void {
    const rows: IPaginationData<any> = this.dataService.getStreamValue('rows$');
    const updatedRows: IPaginationData<any> = cb(rows);

    this.dataService.emitToStream('rows$', updatedRows);
  }

  public changeRows(rows: IPaginationData<any>): void {
    this.dataService.emitToStream('rows$', rows);
  }

  public changeColumns(cb: (cols: TableColumn[]) => TableColumn[]): void {
    const currentCols: TableColumn[] = this.viewService.getStreamValue(
      'columns$'
    );
    const updateColumns: TableColumn[] = cb(currentCols);

    this.viewService.updateColumns(updateColumns);
  }

  public removeColumns(columnDefs: string[]): void {
    const currentCols: TableColumn[] = this.viewService.getStreamValue(
      'columns$'
    );
    const filteredCols: TableColumn[] = currentCols.filter(
      (column: TableColumn) => {
        return !columnDefs.includes(column.columnDef);
      }
    );

    this.viewService.updateColumns(filteredCols);
  }

  public getRows<T>(): IPaginationData<T> {
    return this.dataService.getStreamValue('rows$');
  }

  public addRow<T = any>(row: T, insertType: TInsert = 'end'): void {
    const rows: IPaginationData<any> = this.dataService.getStreamValue('rows$');
    const updatedRows: IPaginationData<any> = new PaginationDataManager(
      rows
    ).insertItem(row, insertType);

    this.dataService.emitToStream('rows$', updatedRows);
  }

  public editRow<T = any>(row: T, prop: keyof T): void {
    const {
      items,
      totalItems,
    }: IPaginationData<any> = this.dataService.getStreamValue('rows$');
    const idx: number = items.findIndex((r) => r[prop] === row[prop]);

    if (~idx) {
      items[idx] = row;
    }

    this.dataService.emitToStream(
      'rows$',
      new PaginationData(items.concat(), totalItems)
    );
  }

  public isDisabledResetFiltersBtn(): boolean {
    const filters: Params = this.getCurrentFilter();
    const isEmptyFilters: boolean = isEmptyObject(filters);

    return isEmptyFilters;
  }

  public isDisabledSortedBtn(): boolean {
    return !this.activatedRoute.snapshot.queryParamMap.has('orderBy');
  }

  @Bind()
  public filterActiveColumns(columns: TableColumn[]): TableColumn[] {
    return columns.filter((c) => c.active);
  }

  public get isExistFooterColumn(): boolean {
    const footerColumn: TableColumn = this.tableColumns.find((c) =>
      isNotNullish(c.footer)
    );

    return Boolean(footerColumn);
  }

  public getFooterCellText(
    column: TableColumn,
    rows: IPaginationData<any>
  ): string | number {
    return isNotNullish(column.footer) ? column.footer(rows) : '';
  }

  public getFromParams(key: string): any {
    return this.activatedRoute.snapshot.queryParamMap.get(key);
  }

  private isSortedColumn({ columnDef }: TableColumn): boolean {
    const orderBy: string = this.getQueryItem('orderBy');

    if (orderBy) {
      const [columnName] = orderBy.split(' ');

      return isEqual(columnDef, columnName);
    }

    return false;
  }

  public setColumnsList(columns: TableToggleColumn[]): void {
    const updatedColumns: TableColumn[] = this.viewService.setColumnsList(
      columns
    );
    const hideColumns: TableColumn[] = updatedColumns.filter((c) => !c.active);

    this.resetColumnsFilter(hideColumns);
  }

  private resetColumnsFilter(columns: TableColumn[]): void {
    const query: Params = columns.reduce((accum, column) => {
      const { columnDef } = column;
      const isFiltered: boolean = Boolean(this.getQueryItem(columnDef));
      const isSorted: boolean = this.isSortedColumn(column);

      if (isSorted) {
        accum.orderBy = null;
      }

      if (isFiltered) {
        accum[columnDef] = null;
      }

      return accum;
    }, {} as any);

    if (!isEmptyObject(query)) {
      this.setParams(query);
    }
  }

  public getParsedQuery(): Params {
    return Object.entries(this.getCurrentQuery()).reduce(
      (accum, [key, value]) => {
        const isInteger: boolean = value && String(+value) === value;
        const isBoolean: boolean = ['true', 'false'].includes(value);

        if (isInteger || isBoolean) {
          value = JSON.parse(value);
        }

        (accum as any)[key] = value;

        return accum;
      },
      {}
    );
  }

  public getCurrentQuery(): Params {
    const { queryParams } = this.activatedRoute.snapshot;

    return queryParams;
  }

  public getQueryItem(key: string): any {
    const { queryParams } = this.activatedRoute.snapshot;

    return queryParams[key];
  }

  public filter(filter: Params): void {
    this.setParams(Object.assign({}, filter, { pageNumber: 0 }));
  }

  public resetFilters(): void {
    const currentParams: Params = this.getCurrentQuery();
    const clearParams: Params = setObjectValues(currentParams, null);
    const { pageSize } = currentParams;
    const params = assign(clearParams, new Page(pageSize));

    this.setParams(params);
  }

  public getCurrentFilter(): any {
    const query: Params = this.getCurrentQuery();

    return excludeObjProps(query, ['pageSize', 'pageNumber', 'orderBy']);
  }

  public isActiveSortColumn(columnDef: string): boolean {
    return Boolean(this.getSortedDir(columnDef));
  }

  public getSortedDir(columnDef: string): TSortDirection {
    const orderBy: string = this.activatedRoute.snapshot.queryParamMap.get(
      'orderBy'
    );

    if (!orderBy || !testIncludeWord(orderBy, columnDef)) return '';

    const [, dir] = orderBy.split(' ');

    return dir as TSortDirection;
  }

  public async sortColumn(
    column: TableColumn,
    dir?: TSortDirection
  ): Promise<void> {
    if (column.sort) {
      const { columnDef } = column;
      const sort = this.getSortedDir(columnDef);
      const sortDir: TSortDirection = dir ?? getNextSortDirection(sort);
      const query: Pick<Params, 'orderBy'> = {
        orderBy: null,
      };

      if (Boolean(sortDir)) query.orderBy = `${columnDef} ${sortDir}`;

      this.sort(query);
    }
  }

  public async sort(query: Pick<Params, 'orderBy'>): Promise<void> {
    await this.setParams(query);
  }

  public resetSort(): void {
    this.sort({ orderBy: null });
  }

  public setPage(event: PageEvent): void {
    const { pageSize, pageIndex: pageNumber } = event;

    this.setParams({ pageSize, pageNumber });
  }

  public setParams(queryParams: Partial<Params>): Promise<boolean> {
    return this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  public fetch(query: Params): void {
    this.dataService.fetch(query);
  }
}
