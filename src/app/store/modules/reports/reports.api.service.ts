import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toHttpParams } from '@core/handlers/utility.handlers';
import { IPage } from '@core/utils/pagination/interfaces/IPage';
import { IPaginationData } from '@core/utils/pagination/interfaces/IPaginationData';
import { ApiStoreModule } from '@store/store/modules/api.store.module';
import { Observable } from 'rxjs';
import { IReport } from './interfaces/IReport';

@Injectable({
  providedIn: ApiStoreModule,
})
export class ReportsApiService {
  constructor(private http: HttpClient) {}

  public getReports(query: IPage): Observable<IPaginationData<IReport>> {
    const params: HttpParams = toHttpParams(query);

    return this.http.get<IPaginationData<IReport>>('@/reports', { params });
  }

  public removeReport(reportId: string): Observable<IReport> {
    return this.http.delete<IReport>('@/reports', {
      params: toHttpParams({ id: reportId }),
    });
  }
}
