import { Injectable } from '@angular/core';
import { IPaginationData } from '@core/utils/pagination/interfaces/IPaginationData';
import { ControllersStoreModule } from '@store/store/modules/controllers.store.module';
import { Store } from '@store/store/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DocumentsApiService } from './documents.api.service';
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
import { IPage } from '@core/utils/pagination/interfaces/IPage';

@Injectable({
  providedIn: ControllersStoreModule,
})
export class DocumentsController {
  constructor(
    private documentsService: DocumentsApiService,
    private store: Store
  ) {}

  public getDocuments(query: IPage): Observable<IPaginationData<IDocument>> {
    return this.documentsService.getDocuments(query);
  }

  public sendDocuments(documents: FormData): Observable<IDocument[]> {
    return this.documentsService.sendDocuments(documents);
  }

  public addDocument(document: FormData): Observable<IDocument> {
    return this.documentsService.addDocument(document);
  }

  public deleteDocument(documentId: string): Observable<void> {
    return this.documentsService.deleteDocument(documentId);
  }

  public getComments(documentId: string): Observable<ICommentGetResponse> {
    return this.documentsService.getComments(documentId).pipe(
      tap((response: ICommentGetResponse) => {
        this.store.updateStore({ comments: response.items });
      })
    );
  }

  public sendComment(
    documentId: string,
    comment: IComment
  ): Observable<ICommentAddResponse> {
    return this.documentsService.sendComment(documentId, comment);
  }

  public getMaf(): Observable<IDocumentsMaf> {
    return this.documentsService.getMaf().pipe(
      tap((maf: IDocumentsMaf) => {
        this.store.updateStore({ maf });
      })
    );
  }

  public saveMaf(maf: IDocumentsSaveMaf): Observable<IDocumentsSaveMaf> {
    return this.documentsService.saveMaf(maf).pipe(
      tap((maf: IDocumentsMaf) => {
        this.store.mergeStore('maf', maf);
      })
    );
  }

  public signMaf(info: DocumentsSignInfo): Observable<void> {
    return this.documentsService.signMaf(info);
  }

  public getAgreement(): Observable<IDocumentsAgreement> {
    return this.documentsService.getAgreement();
  }

  public signAgreement(info: DocumentsSignInfo): Observable<void> {
    return this.documentsService.signAgreement(info);
  }

  public getNda(): Observable<IDocumentsNda> {
    return this.documentsService.getNda();
  }

  public signNda(info: DocumentsSignInfo): Observable<void> {
    return this.documentsService.signNda(info);
  }
}
