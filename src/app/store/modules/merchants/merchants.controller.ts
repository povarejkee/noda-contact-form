import { Injectable } from '@angular/core';
import { IPaginationData } from '@core/utils/pagination/interfaces/IPaginationData';
import {
  IComment,
  ICommentGetResponse,
  TShopsQuery,
} from '@page/account/types/account.types';
import { MyMerchantsQuery } from '@page/my-merchants/types/my-merchants.types';
import { TransactionsQuery } from '@page/transactions/types/transactions.types';
import { ITransaction } from '@store/modules/transactions/interfaces/ITransaction';
import { ITransactionDetails } from '@store/modules/transactions/interfaces/ITransactionDetails';
import { ControllersStoreModule } from '@store/store/modules/controllers.store.module';
import { Store } from '@store/store/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IDocument } from '../documents/interfaces/IDocument';
import { IDocumentsAgreement } from '../documents/interfaces/IDocumentsAgreement';
import { IDocumentsMaf } from '../documents/interfaces/IDocumentsMaf';
import { IDocumentsNda } from '../documents/interfaces/IDocumentsNda';
import { ITransactionRefund } from '../transactions/interfaces/ITransactionRefund';
import { IMerchant } from './interfaces/IMerchant';
import { IMerchantAgreement } from './interfaces/IMerchantAgreement';
import { IMerchantDetails } from './interfaces/IMerchantDetails';
import { IMerchantEditDocument } from './interfaces/IMerchantEditDocument';
import { IMerchantLimits } from './interfaces/IMerchantLimits';
import { IMerchantProfile } from './interfaces/IMerchantProfile';
import { IMerchantsSaveDocument } from './interfaces/IMerchantSaveDocument';
import { IMerchantSetDocumentStatus } from './interfaces/IMerchantSetDocumentStatus';
import { IMerchantShop } from './interfaces/IMerchantShop';
import { InviteLink } from './interfaces/InviteLink';
import { IReseller } from './interfaces/IReseller';
import { IResellerSave } from './interfaces/IResellerSave';
import { MerchantsApiService } from './merchants.api.service';
import { MerchantSave } from './models/MerchantSave.model';
import {
  KYCQuery,
  MerchantsQuery,
  TMerchantCountriesBody,
  TMerchantLimitsBody,
} from './types/merchants.types';

@Injectable({
  providedIn: ControllersStoreModule,
})
export class MerchantsController {
  constructor(
    private store: Store,
    private merchantsService: MerchantsApiService
  ) {}

  public fetch(query: MerchantsQuery): Observable<IPaginationData<IMerchant>> {
    return this.merchantsService.fetch(query);
  }

  public getMerchantById(id: string): Observable<IMerchantDetails> {
    return this.merchantsService.getById(id);
  }

  public setStatus(id: string, status: number): Observable<void> {
    return this.merchantsService.setStatus(id, status).pipe(
      tap(() => {
        this.store.mergeStore('accountMerchant', {
          status,
        });
      })
    );
  }

  public editMerchantDetails(
    merchantId: string,
    merchant: Partial<IMerchantDetails>
  ): Observable<void> {
    return this.merchantsService.editMerchantDetails(merchantId, merchant).pipe(
      tap(() => {
        this.store.mergeStore('accountMerchant', merchant);
      })
    );
  }

  public getMerchantsShops(
    merchantId: string,
    query: TShopsQuery
  ): Observable<IPaginationData<IMerchantShop>> {
    return this.merchantsService.getMerchantsShops(merchantId, query);
  }

  public getMerchantsDocuments(
    merchantId: string,
    query: KYCQuery
  ): Observable<IPaginationData<IDocument>> {
    return this.merchantsService.getMerchantsDocuments(merchantId, query);
  }

  public getMerchantDocumentComments(
    merchantId: string,
    documentId: string
  ): Observable<ICommentGetResponse> {
    return this.merchantsService
      .getMerchantDocumentComments(merchantId, documentId)
      .pipe(
        tap((response: ICommentGetResponse) => {
          this.store.updateStore({ comments: response.items });
        })
      );
  }

  public addMerchantDocument(
    merchantId: string,
    document: IMerchantsSaveDocument
  ): Observable<IDocument> {
    return this.merchantsService.addMerchantDocument(merchantId, document);
  }

  public editMerchantDocument(
    merachantId: string,
    documentId: string,
    document: IMerchantEditDocument
  ): Observable<IDocument> {
    return this.merchantsService.editMerchantDocument(
      merachantId,
      documentId,
      document
    );
  }

  public removeMerchantDocument(
    merachantId: string,
    documentId: string
  ): Observable<void> {
    return this.merchantsService.removeMerchantDocument(
      merachantId,
      documentId
    );
  }

  public setMerchantDocumentStatus(
    merachantId: string,
    documentId: string,
    reason: IMerchantSetDocumentStatus
  ): Observable<IDocument> {
    return this.merchantsService.setMerchantDocumentStatus(
      merachantId,
      documentId,
      reason
    );
  }

  public sendMerchantDocuments(
    merchantId: string,
    documents: FormData
  ): Observable<IDocument[]> {
    return this.merchantsService.sendMerchantDocuments(merchantId, documents);
  }

  public notifyMerchantDocuments(merchantId: string): Observable<void> {
    return this.merchantsService.notifyMerchantDocuments(merchantId);
  }

  public getMerchantTransactions(
    merchantId: string,
    query: TransactionsQuery
  ): Observable<IPaginationData<ITransaction>> {
    return this.merchantsService.getMerchantTransactions(merchantId, query);
  }

  public getMerchantTransactionById(
    merchantId: string,
    transactionId: string
  ): Observable<ITransactionDetails> {
    return this.merchantsService.getMerchantTransactionById(
      merchantId,
      transactionId
    );
  }

  public getMerchantTransactionRefunds(
    merchantId: string,
    transactionId: string
  ): Observable<IPaginationData<ITransactionRefund>> {
    return this.merchantsService.getMerchantTransactionRefunds(
      merchantId,
      transactionId
    );
  }

  public addMerchant(merchant: MerchantSave): Observable<void> {
    return this.merchantsService.addMerhant(merchant);
  }

  public getMerchantProfile(id: string): Observable<IMerchantProfile> {
    return this.merchantsService.getMerchantProfile(id);
  }

  public getResellers(
    query: MyMerchantsQuery
  ): Observable<IPaginationData<IReseller>> {
    return this.merchantsService.getResellers(query);
  }

  public addReseller(candidate: IResellerSave): Observable<IReseller> {
    return this.merchantsService.addReseller(candidate);
  }

  public getResellerInviteLink(): Observable<InviteLink> {
    return this.merchantsService.getResellerInviteLink();
  }

  public getMerchantMaf(merchantId: string): Observable<IDocumentsMaf> {
    return this.merchantsService.getMerchantMaf(merchantId);
  }

  public getMerchantNda(merchantId: string): Observable<IDocumentsNda> {
    return this.merchantsService.getMerchantNda(merchantId);
  }

  public getMerchantAgreement(
    merchantId: string
  ): Observable<IDocumentsAgreement> {
    return this.merchantsService.getMerchantAgreement(merchantId);
  }

  public approveMaf(merchantId: string): Observable<IDocument> {
    return this.merchantsService.approveMaf(merchantId);
  }

  public declineMaf(merchantId: string): Observable<IDocument> {
    return this.merchantsService.declineMaf(merchantId);
  }

  public saveAgreement(
    merchantId: string,
    candidate: IMerchantAgreement
  ): Observable<IMerchantAgreement> {
    return this.merchantsService.saveAgreement(merchantId, candidate);
  }

  public getMerchantCountries(
    merchantId: string
  ): Observable<TMerchantCountriesBody> {
    return this.merchantsService.getMerchantCountries(merchantId);
  }

  public updateMerchantCountries(
    merchantId: string,
    countries: TMerchantCountriesBody
  ): Observable<TMerchantCountriesBody> {
    return this.merchantsService.updateMerchantCountries(merchantId, countries);
  }

  public getLimits(merchantId: string): Observable<IMerchantLimits> {
    return this.merchantsService.getLimits(merchantId);
  }

  public saveLimits(
    merchantId: string,
    limits: TMerchantLimitsBody
  ): Observable<IMerchantLimits> {
    return this.merchantsService.saveLimits(merchantId, limits);
  }
}
