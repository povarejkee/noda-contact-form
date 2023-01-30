import { ICountry } from '@store/modules/locations/interfaces/ICountry';
import { ILocation } from '@store/modules/locations/interfaces/ILocation';
import { IUserLocation } from '@store/modules/locations/interfaces/IUserLocation';

export interface IStore {
  // *api/locations
  countries: ICountry[];
  userLocation: IUserLocation;
  // *api/locations

  // *api/account
  locations: ILocation[];
  // *api/account
}
