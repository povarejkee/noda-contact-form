import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { EnApi } from '@core/api/enums/api.enums';
import { StateAction } from '@core/managers/classes/StateAction';
import { ExtendsFactory } from '@core/managers/handlers/managers.handlers';
import { State } from '@core/managers/StateService.manager';
import { StreamManager } from '@core/managers/Stream.manager';
import { IPaginationData } from '@core/utils/pagination/interfaces/IPaginationData';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, finalize, switchMap } from 'rxjs/operators';
import { TableDataFlags } from '../states/table.data.flags';
import { TableActions, TableRowsRequest$ } from '../types/table.types';

@Injectable()
export class TableDataService<Row extends object = any> extends ExtendsFactory(
  State({
    flags: TableDataFlags,
  }),
  StreamManager<TableActions>()
) {
  private readonly fetch$: Subject<Params> = new Subject();
  private readonly rows$: BehaviorSubject<IPaginationData<Row>> =
    new BehaviorSubject(null);

  constructor() {
    super();
  }

  public initFetchSub(rowsRequest$: TableRowsRequest$): void {
    this.getStream('fetch$')
      .pipe(
        debounceTime(EnApi.DEBOUNCE_TIME),
        switchMap((query: Params) => {
          this.setState('flags', 'isFetched', true);
          this.detect('fetch');

          return rowsRequest$(query);
        }),
        finalize(() => {
          this.detect('default');
        }),
        this.untilDestroyed()
      )
      .subscribe((response: IPaginationData<Row>) => {
        this.setState('flags', 'isFetched', false);
        this.action(new StateAction('fetch', response));
        this.emitToStream('rows$', response);
      });
  }

  public fetch(query: Params): void {
    this.emitToStream('fetch$', query);
  }

  public destroy(): void {
    this.destroyStates('flags', 'state');
    this.unsubscribe();
  }
}
