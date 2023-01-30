import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toHttpParams } from '@core/handlers/utility.handlers';
import { ApiStoreModule } from '@store/store/modules/api.store.module';
import { Observable } from 'rxjs';
import { ICountry } from './interfaces/ICountry';
import { IGeolocation } from './interfaces/IGeolocation';
import { ILocation } from './interfaces/ILocation';
import { IUserLocation } from './interfaces/IUserLocation';
import {
  LocationCityQuery,
  LocationCountryQuery,
  LocationStateQuery,
} from './types/locations.types';

@Injectable({
  providedIn: ApiStoreModule,
})
export class LocationsApiService {
  constructor(private http: HttpClient) {}

  public getLocations(): Observable<ILocation[]> {
    return this.http.get<ILocation[]>('@/locations');
  }

  public getLocationByIP(): Observable<IUserLocation> {
    return this.http.get<IUserLocation>('@/locations/userlocation');
  }

  public getCountries(query: LocationCountryQuery): Observable<ICountry[]> {
    return this.http.get<ICountry[]>('@/locations/countries', {
      params: toHttpParams(query),
    });
  }

  public getStates(query: LocationStateQuery): Observable<IGeolocation[]> {
    return this.http.get<IGeolocation[]>('@/locations/states', {
      params: toHttpParams(query),
    });
  }

  public getCities(query: LocationCityQuery): Observable<IGeolocation[]> {
    return this.http.get<IGeolocation[]>('@/locations/cities', {
      params: toHttpParams(query),
    });
  }

  public getCountry(country: string): Observable<ICountry> {
    return this.http.get<ICountry>(`@/locations/countries/${country}`);
  }

  public getState(
    state: string,
    countryCode: string
  ): Observable<IGeolocation> {
    return this.http.get<IGeolocation>(`@/locations/states/${state}`, {
      params: toHttpParams({ countryCode }),
    });
  }

  public getCity(city: string, country: string): Observable<IGeolocation> {
    return this.http.get<IGeolocation>(`@/locations/cities/${city}`, {
      params: toHttpParams({ country }),
    });
  }
}
