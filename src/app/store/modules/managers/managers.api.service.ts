import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiStoreModule } from '@store/store/modules/api.store.module';
import { IManager } from '@store/modules/managers/interfaces/IManager';
import {IPaginationData} from "@core/utils/pagination/interfaces/IPaginationData";

@Injectable({
  providedIn: ApiStoreModule,
})
export class ManagersApiService {
  constructor(private http: HttpClient) {}

  public getManager(id: string): Observable<IManager> {
    return this.http.get<IManager>(`@/v1/managers/${id}`);
  }

  public getManagers(): Observable<IPaginationData<IManager>> {
    return this.http.get<IPaginationData<IManager>>('@/v1/managers');
  }
}
