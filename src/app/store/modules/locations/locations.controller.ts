import { Injectable } from '@angular/core';
import { ExtendsFactory } from '@core/managers/handlers/managers.handlers';
import { State } from '@core/managers/StateService.manager';
import { ControllersStoreModule } from '@store/store/modules/controllers.store.module';
import { Store } from '@store/store/store';
import { Observable } from 'rxjs';
import { ICountry } from './interfaces/ICountry';
import { IGeolocation } from './interfaces/IGeolocation';
import { ILocation } from './interfaces/ILocation';
import { IUserLocation } from './interfaces/IUserLocation';
import { LocationsApiService } from './locations.api.service';
import { LocationsControllerFlags } from './states/locations.controller.flags';
import {
  LocationCityQuery,
  LocationCountryQuery,
  LocationStateQuery,
} from './types/locations.types';

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

  public getLocations(): Observable<ILocation[]> {
    const isLoad: boolean = this.getState('flags', 'isLoadLocations');

    if (!isLoad) {
      this.setState('flags', 'isLoadLocations', true);

      this.locationService
        .getLocations()
        .subscribe((locations: ILocation[]) => {
          this.store.updateStore({ locations });
        });
    }

    return this.store.select('locations', true);
  }

  public getLocationByIP(): Observable<IUserLocation> {
    const isLoad: boolean = this.getState('flags', 'isLoadLocation');

    if (!isLoad) {
      this.setState('flags', 'isLoadLocation', true);

      this.locationService
        .getLocationByIP()
        .subscribe((userLocation: IUserLocation) => {
          this.store.updateStore({ userLocation });
        });
    }

    return this.store.select('userLocation', true);
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

  public getStates(query: LocationStateQuery): Observable<IGeolocation[]> {
    return this.locationService.getStates(query);
  }

  public getCities(query: LocationCityQuery): Observable<IGeolocation[]> {
    return this.locationService.getCities(query);
  }

  public getCountry(country: string): Observable<ICountry> {
    return this.locationService.getCountry(country);
  }

  public getCountryState(
    state: string,
    countryCode: string
  ): Observable<IGeolocation> {
    return this.locationService.getState(state, countryCode);
  }

  public getCity(city: string, country: string): Observable<IGeolocation> {
    return this.locationService.getCity(city, country);
  }
}
