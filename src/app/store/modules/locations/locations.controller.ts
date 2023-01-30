import { Injectable } from '@angular/core';
import { ExtendsFactory } from '@core/managers/handlers/managers.handlers';
import { State } from '@core/managers/StateService.manager';
import { ControllersStoreModule } from '@store/store/modules/controllers.store.module';
import { Store } from '@store/store/store';
import { Observable } from 'rxjs';
import { ICountry } from './interfaces/ICountry';
import { LocationsApiService } from './locations.api.service';
import { LocationsControllerFlags } from './states/locations.controller.flags';
import { LocationCountryQuery } from './types/locations.types';

@Injectable({
  providedIn: ControllersStoreModule,
})
export class LocationsController extends ExtendsFactory(
  State({ flags: LocationsControllerFlags })
) {
  constructor(
    private locationService: LocationsApiService,
    private store: Store
  ) {
    super();
  }

  public getCountries(
    query: LocationCountryQuery = null
  ): Observable<ICountry[]> {
    const isLoad: boolean = this.getState('flags', 'isLoadCountries');

    if (!isLoad) {
      this.setState('flags', 'isLoadCountries', true);

      this.locationService
        .getCountries(query)
        .subscribe((countries: ICountry[]) => {
          this.store.updateStore({ countries });
        });
    }

    return this.store.select('countries');
  }
}
