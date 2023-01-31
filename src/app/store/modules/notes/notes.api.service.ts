import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiStoreModule } from '@store/store/modules/api.store.module';
import { INote } from '@store/modules/notes/interfaces/INote';
import { INoteQuery } from '@store/modules/notes/interfaces/INoteQuery';
import { IPaginationData } from '@core/utils/pagination/interfaces/IPaginationData';

@Injectable({
  providedIn: ApiStoreModule,
})
export class NotesApiService {
  constructor(private http: HttpClient) {}

  public getNote(merchantId: string): Observable<IPaginationData<INote>> {
    const query: INoteQuery = {
      accountId: merchantId,
      scope: 'Services',
    };

    const params: HttpParams = new HttpParams({
      fromObject: query as any,
    });

    return this.http.get<IPaginationData<INote>>('@/v1/notes', { params });
  }

  public createNote(notes: INote): Observable<INote> {
    return this.http.post<INote>('@/v1/notes', notes);
  }
}
