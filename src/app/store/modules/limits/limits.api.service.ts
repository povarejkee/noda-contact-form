import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiStoreModule } from '@store/store/modules/api.store.module';
import { Observable } from 'rxjs';
import { ILimits } from './interfaces/ILimits';

@Injectable({
  providedIn: ApiStoreModule,
})
export class LimitsApiService {
  constructor(private http: HttpClient) {}

  public getLimits(): Observable<ILimits> {
    return this.http.get<ILimits>('@/v1/limits');
  }

  public saveLimits(limits: ILimits): Observable<ILimits> {
    return this.http.put<ILimits>('@/v1/limits', limits);
  }
}
