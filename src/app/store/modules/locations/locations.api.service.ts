import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toHttpParams } from '@core/handlers/utility.handlers';
import { ApiStoreModule } from '@store/store/modules/api.store.module';
import { Observable } from 'rxjs';
import { ICountry } from './interfaces/ICountry';
import { LocationCountryQuery } from './types/locations.types';

@Injectable({
  providedIn: ApiStoreModule,
})
export class LocationsApiService {
  constructor(private http: HttpClient) {}

  public getCountries(query: LocationCountryQuery): Observable<ICountry[]> {
    return this.http.get<ICountry[]>('@/locations/countries', {
      params: toHttpParams(query),
    });
  }
}
