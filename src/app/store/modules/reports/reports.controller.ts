import { Injectable } from '@angular/core';
import { IPage } from '@core/utils/pagination/interfaces/IPage';
import { IPaginationData } from '@core/utils/pagination/interfaces/IPaginationData';
import { ControllersStoreModule } from '@store/store/modules/controllers.store.module';
import { Observable } from 'rxjs';
import { IReport } from './interfaces/IReport';
import { ReportsApiService } from './reports.api.service';

@Injectable({
  providedIn: ControllersStoreModule,
})
export class ReportsController {
  constructor(private reportsService: ReportsApiService) {}

  public getReports(query: IPage): Observable<IPaginationData<IReport>> {
    return this.reportsService.getReports(query);
  }

  public removeReport(reportId: string): Observable<IReport> {
    return this.reportsService.removeReport(reportId);
  }
}
