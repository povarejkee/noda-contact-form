import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toHttpParams } from '@core/handlers/utility.handlers';
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
import { ApiStoreModule } from '@store/store/modules/api.store.module';
import { Observable } from 'rxjs';
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
import { MerchantSave } from './models/MerchantSave.model';
import {
  KYCQuery,
  MerchantsQuery,
  TMerchantCountriesBody,
  TMerchantLimitsBody,
} from './types/merchants.types';

@Injectable({
  providedIn: ApiStoreModule,
})
export class MerchantsApiService {
  constructor(private http: HttpClient) {}

  public fetch(query: MerchantsQuery): Observable<IPaginationData<IMerchant>> {
    const params: HttpParams = new HttpParams({
      fromObject: query as any,
    });

    return this.http.get<IPaginationData<IMerchant>>(`@/merchants`, {
      params,
    });
  }

  public getById(merchantId: string): Observable<IMerchantDetails> {
    return this.http.get<IMerchantDetails>(`@/merchants/${merchantId}`);
  }

  public editMerchantDetails(
    merchantId: string,
    merchant: Partial<IMerchantDetails>
  ): Observable<void> {
    return this.http.put<void>(`@/merchants/${merchantId}`, merchant);
  }

  public setStatus(merchantId: string, status: number): Observable<void> {
    return this.http.put<void>(`@/merchants/${merchantId}/${status}`, null);
  }

  public getMerchantsShops(
    merchantId: string,
    query: TShopsQuery
  ): Observable<IPaginationData<IMerchantShop>> {
    const params: HttpParams = new HttpParams({
      fromObject: query as any,
    });

    return this.http.get<IPaginationData<IMerchantShop>>(
      `@/merchants/${merchantId}/shops`,
      {
        params,
      }
    );
  }

  public getMerchantsDocuments(
    merchantId: string,
    params: KYCQuery
  ): Observable<IPaginationData<IDocument>> {
    return this.http.get<IPaginationData<IDocument>>(
      `@/merchants/${merchantId}/documents`,
      {
        params: toHttpParams(params),
      }
    );
  }

  public getMerchantDocumentComments(
    merchantId: string,
    documentId: string
  ): Observable<ICommentGetResponse> {
    return this.http.get<ICommentGetResponse>(
      `@/merchants/${merchantId}/documents/${documentId}/comments`
    );
  }

  public addMerchantDocument(
    merchantId: string,
    document: IMerchantsSaveDocument
  ): Observable<IDocument> {
    return this.http.post<IDocument>(
      `@/merchants/${merchantId}/documents`,
      document
    );
  }

  public editMerchantDocument(
    merachantId: string,
    documentId: string,
    document: IMerchantEditDocument
  ): Observable<IDocument> {
    return this.http.put<IDocument>(
      `@/merchants/${merachantId}/documents/${documentId}`,
      document
    );
  }

  public removeMerchantDocument(
    merachantId: string,
    documentId: string
  ): Observable<void> {
    return this.http.delete<void>(
      `@/merchants/${merachantId}/documents/${documentId}`
    );
  }

  public setMerchantDocumentStatus(
    merachantId: string,
    documentId: string,
    reason: IMerchantSetDocumentStatus
  ): Observable<IDocument> {
    return this.http.put<IDocument>(
      `@/merchants/${merachantId}/documents/${documentId}/status`,
      reason
    );
  }

  public sendMerchantDocuments(
    merchantId: string,
    documents: FormData
  ): Observable<IDocument[]> {
    return this.http.put<IDocument[]>(
      `@/merchants/${merchantId}/documents`,
      documents
    );
  }

  public notifyMerchantDocuments(merchantId: string): Observable<void> {
    return this.http.post<void>(
      `@/merchants/${merchantId}/documents/notify`,
      null
    );
  }

  public getMerchantTransactions(
    merchantId: string,
    query: TransactionsQuery
  ): Observable<IPaginationData<ITransaction>> {
    const params: HttpParams = new HttpParams({
      fromObject: query as any,
    });

    return this.http.get<IPaginationData<ITransaction>>(
      `@/merchants/${merchantId}/transactions`,
      { params }
    );
  }

  public getMerchantTransactionById(
    merchantId: string,
    transactionId: string
  ): Observable<ITransactionDetails> {
    return this.http.get<ITransactionDetails>(
      `@/merchants/${merchantId}/transactions/${transactionId}`
    );
  }

  public getMerchantTransactionRefunds(
    merchantId: string,
    transactionId: string
  ): Observable<IPaginationData<ITransactionRefund>> {
    return this.http.get<IPaginationData<ITransactionRefund>>(
      `@/merchants/${merchantId}/transactions/${transactionId}/refunds`
    );
  }

  public addMerhant(merchant: MerchantSave): Observable<void> {
    return this.http.post<void>(`@/merchants`, merchant);
  }

  public getMerchantProfile(merchantId: string): Observable<IMerchantProfile> {
    return this.http.get<IMerchantProfile>(`@/merchants/${merchantId}/profile`);
  }

  public getResellers(
    query: MyMerchantsQuery
  ): Observable<IPaginationData<IReseller>> {
    const params = new HttpParams({ fromObject: query } as any);

    return this.http.get<IPaginationData<IReseller>>('@/merchants/resellers', {
      params,
    });
  }

  public addReseller(candidate: IResellerSave): Observable<IReseller> {
    return this.http.post<IReseller>('@/merchants/resellers', candidate);
  }

  public getResellerInviteLink(): Observable<InviteLink> {
    return this.http.get<InviteLink>('@/merchants/resellers/invite-link');
  }

  public getMerchantMaf(merchantId: string): Observable<IDocumentsMaf> {
    return this.http.get<IDocumentsMaf>(
      `@/merchants/${merchantId}/documents/application-form`
    );
  }

  public getMerchantNda(merchantId: string): Observable<IDocumentsNda> {
    return this.http.get<IDocumentsNda>(
      `@/merchants/${merchantId}/documents/nda`
    );
  }

  public getMerchantAgreement(
    merchantId: string
  ): Observable<IDocumentsAgreement> {
    return this.http.get<IDocumentsAgreement>(
      `@/merchants/${merchantId}/documents/agreement`
    );
  }

  public approveMaf(merchantId: string): Observable<IDocument> {
    return this.http.put<IDocument>(
      `@/merchants/${merchantId}/documents/application-form/approve`,
      null
    );
  }

  public declineMaf(merchantId: string): Observable<IDocument> {
    return this.http.put<IDocument>(
      `@/merchants/${merchantId}/documents/application-form/decline`,
      null
    );
  }

  public saveAgreement(
    merchantId: string,
    candidate: IMerchantAgreement
  ): Observable<IMerchantAgreement> {
    return this.http.put<IMerchantAgreement>(
      `@/merchants/${merchantId}/documents/agreement`,
      candidate
    );
  }

  public getMerchantCountries(
    merchantId: string
  ): Observable<TMerchantCountriesBody> {
    return this.http.get<TMerchantCountriesBody>(
      `@/merchants/${merchantId}/countries`
    );
  }

  public updateMerchantCountries(
    merchantId: string,
    countries: TMerchantCountriesBody
  ): Observable<TMerchantCountriesBody> {
    return this.http.put<TMerchantCountriesBody>(
      `@/merchants/${merchantId}/countries`,
      countries
    )
  }

  public getLimits(merchantId: string): Observable<IMerchantLimits> {
    return this.http.get<IMerchantLimits>(`@/merchants/${merchantId}/limits`);
  }

  public saveLimits(
    merchantId: string,
    limits: TMerchantLimitsBody
  ): Observable<IMerchantLimits> {
    return this.http.put<IMerchantLimits>(
      `@/merchants/${merchantId}/limits`,
      limits
    );
  }
}
