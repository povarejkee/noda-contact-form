import { Injectable } from '@angular/core';
import { ControllersStoreModule } from '@store/store/modules/controllers.store.module';
import { Observable } from 'rxjs';

import { ManagersApiService } from '@store/modules/managers/managers.api.service';
import { IManager } from '@store/modules/managers/interfaces/IManager';
import { IPaginationData } from '@core/utils/pagination/interfaces/IPaginationData';

@Injectable({
  providedIn: ControllersStoreModule,
})
export class ManagersController {
  constructor(private managersService: ManagersApiService) {}

  public getManager(id: string): Observable<IManager> {
    return this.managersService.getManager(id);
  }

  public getManagers(): Observable<IPaginationData<IManager>> {
    return this.managersService.getManagers();
  }
}
