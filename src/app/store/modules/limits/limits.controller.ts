import { Injectable } from '@angular/core';
import { ControllersStoreModule } from '@store/store/modules/controllers.store.module';
import { Observable } from 'rxjs';
import { ILimits } from './interfaces/ILimits';
import { LimitsApiService } from './limits.api.service';

@Injectable({
  providedIn: ControllersStoreModule,
})
export class LimitsController {
  constructor(private limitsService: LimitsApiService) {}

  public getLimits(): Observable<ILimits> {
    return this.limitsService.getLimits();
  }

  public saveLimits(limits: ILimits): Observable<ILimits> {
    return this.limitsService.saveLimits(limits);
  }
}
