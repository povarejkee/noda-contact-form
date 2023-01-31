import { Injectable } from '@angular/core';
import { TRangeDate } from '@core/modules/form/types/form.types';
import { IPaginationData } from '@core/utils/pagination/interfaces/IPaginationData';
import { TransactionsQuery } from '@page/transactions/types/transactions.types';
import { ControllersStoreModule } from '@store/store/modules/controllers.store.module';
import { Observable } from 'rxjs';
import { ITransaction } from './interfaces/ITransaction';
import { ITransactionCreateRefund } from './interfaces/ITransactionCreateRefund';
import { ITransactionDetails } from './interfaces/ITransactionDetails';
import { ITransactionRefund } from './interfaces/ITransactionRefund';
import { ITransactionsBalance } from './interfaces/ITransactionsBalance';
import { TransactionsApiService } from './transactions.api.service';

@Injectable({
  providedIn: ControllersStoreModule,
})
export class TransactionsController {
  constructor(private transactionsService: TransactionsApiService) {}

  public fetch(
    query: TransactionsQuery
  ): Observable<IPaginationData<ITransaction>> {
    return this.transactionsService.fetch(query);
  }

  public getById(id: string): Observable<ITransactionDetails> {
    return this.transactionsService.getById(id);
  }

  public getBalance(period: TRangeDate): Observable<ITransactionsBalance> {
    return this.transactionsService.getBalance(period);
  }

  public generateReport(query: TransactionsQuery): Observable<void> {
    return this.transactionsService.generateReport(query);
  }

  public getRefunds(
    transactionId: string
  ): Observable<IPaginationData<ITransactionRefund>> {
    return this.transactionsService.getRefunds(transactionId);
  }

  public createRefund(
    transactionId: string,
    candidate: ITransactionCreateRefund
  ): Observable<ITransactionRefund> {
    return this.transactionsService.createRefund(transactionId, candidate);
  }
}
