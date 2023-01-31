import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toHttpParams } from '@core/handlers/utility.handlers';
import { TRangeDate } from '@core/modules/form/types/form.types';
import { IPaginationData } from '@core/utils/pagination/interfaces/IPaginationData';
import { ApiStoreModule } from '@store/store/modules/api.store.module';
import { Observable } from 'rxjs';
import { TransactionsQuery } from '../../../pages/transactions/types/transactions.types';
import { ITransaction } from './interfaces/ITransaction';
import { ITransactionCreateRefund } from './interfaces/ITransactionCreateRefund';
import { ITransactionDetails } from './interfaces/ITransactionDetails';
import { ITransactionRefund } from './interfaces/ITransactionRefund';
import { ITransactionsBalance } from './interfaces/ITransactionsBalance';

@Injectable({
  providedIn: ApiStoreModule,
})
export class TransactionsApiService {
  constructor(private http: HttpClient) {}

  public fetch(
    query: TransactionsQuery
  ): Observable<IPaginationData<ITransaction>> {
    const params: HttpParams = toHttpParams(query);

    return this.http.get<IPaginationData<ITransaction>>(`@/transactions`, {
      params,
    });
  }

  public getById(id: string): Observable<ITransactionDetails> {
    return this.http.get<ITransactionDetails>(`@/transactions/${id}`);
  }

  public getBalance(period: TRangeDate): Observable<ITransactionsBalance> {
    const params: HttpParams = toHttpParams(period);

    return this.http.get<ITransactionsBalance>('@/transactions/amount', {
      params,
    });
  }

  public generateReport(query: TransactionsQuery): Observable<void> {
    return this.http.post<void>('@/transactions/create-report', query);
  }

  public getRefunds(
    transactionId: string
  ): Observable<IPaginationData<ITransactionRefund>> {
    return this.http.get<IPaginationData<ITransactionRefund>>(
      `@/transactions/${transactionId}/refunds`
    );
  }

  public createRefund(
    transactionId: string,
    candidate: ITransactionCreateRefund
  ): Observable<ITransactionRefund> {
    return this.http.post<ITransactionRefund>(
      `@/transactions/${transactionId}/refunds`,
      candidate
    );
  }
}
