import { ICountry } from '@store/modules/locations/interfaces/ICountry';
import { ILocation } from '@store/modules/locations/interfaces/ILocation';
import { IUserLocation } from '@store/modules/locations/interfaces/IUserLocation';
import { IStore } from '../interfaces/IStore';

export class StoreModel implements IStore {
  // *api/locations
  public userLocation: IUserLocation = null;
  public countries: ICountry[] = null;
  // *api/locations

  // *api/account
  public locations: ILocation[] = null;
}
