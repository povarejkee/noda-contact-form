import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPaginationData } from '@core/utils/pagination/interfaces/IPaginationData';
import { ApiStoreModule } from '@store/store/modules/api.store.module';
import { Observable } from 'rxjs';
import { IDocument } from './interfaces/IDocument';
import { IDocumentsAgreement } from './interfaces/IDocumentsAgreement';
import { IDocumentsMaf } from './interfaces/IDocumentsMaf';
import { IDocumentsNda } from './interfaces/IDocumentsNda';
import { IDocumentsSaveMaf } from './interfaces/IDocumentsSaveMaf';
import { DocumentsSignInfo } from './models/DocumentsSignInfo.model';
import {
  IComment,
  ICommentAddResponse,
  ICommentGetResponse,
} from '@page/account/types/account.types';
import { toHttpParams } from '@core/handlers/utility.handlers';
import { IPage } from '@core/utils/pagination/interfaces/IPage';

@Injectable({
  providedIn: ApiStoreModule,
})
export class DocumentsApiService {
  constructor(private http: HttpClient) {}

  public getDocuments(query: IPage): Observable<IPaginationData<IDocument>> {
    const params: HttpParams = toHttpParams(query);

    return this.http.get<IPaginationData<IDocument>>('@/documents', { params });
  }

  public sendDocuments(documents: FormData): Observable<IDocument[]> {
    return this.http.put<IDocument[]>('@/documents', documents);
  }

  public addDocument(document: FormData): Observable<IDocument> {
    return this.http.post<IDocument>('@/documents', document);
  }

  public deleteDocument(documentId: string): Observable<void> {
    return this.http.delete<void>(`@/documents/${documentId}`);
  }

  public getComments(documentId: string): Observable<ICommentGetResponse> {
    return this.http.get<ICommentGetResponse>(
      `@/documents/${documentId}/comments`
    );
  }

  public sendComment(
    documentId: string,
    comment: IComment
  ): Observable<ICommentAddResponse> {
    return this.http.post<ICommentAddResponse>(
      `@/documents/${documentId}/comments`,
      comment
    );
  }

  public getMaf(): Observable<IDocumentsMaf> {
    return this.http.get<IDocumentsMaf>('@/documents/application-form');
  }

  public saveMaf(maf: IDocumentsSaveMaf): Observable<IDocumentsSaveMaf> {
    return this.http.put<IDocumentsSaveMaf>(
      '@/documents/application-form',
      maf
    );
  }

  public signMaf(info: DocumentsSignInfo): Observable<void> {
    return this.http.post<void>('@/documents/application-form/esign', info);
  }

  public getAgreement(): Observable<IDocumentsAgreement> {
    return this.http.get<IDocumentsAgreement>('@/documents/agreement');
  }

  public signAgreement(info: DocumentsSignInfo): Observable<void> {
    return this.http.post<void>('@/documents/agreement/esign', info);
  }

  public getNda(): Observable<IDocumentsNda> {
    return this.http.get<IDocumentsNda>('@/documents/nda');
  }

  public signNda(info: DocumentsSignInfo): Observable<void> {
    return this.http.post<void>('@/documents/nda/esign', info);
  }
}
