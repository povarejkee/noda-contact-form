import { IAccountMerchant } from '@store/modules/account/interfaces/IAccountMerchant';
import { IDocumentsMaf } from '@store/modules/documents/interfaces/IDocumentsMaf';
import { ICountry } from '@store/modules/locations/interfaces/ICountry';
import { ILocation } from '@store/modules/locations/interfaces/ILocation';
import { IUserLocation } from '@store/modules/locations/interfaces/IUserLocation';
import { IMerchantDetails } from '@store/modules/merchants/interfaces/IMerchantDetails';
import { IShopCategory } from '@store/modules/shops/interfaces/IShopCategory';
import { ICallingCode } from '@store/modules/users/interfaces/ICallingCode';
import { IUser } from '@store/modules/users/interfaces/IUser';
import { IUserContacts } from '@store/modules/users/interfaces/IUserContacts';
import { IStore } from '../interfaces/IStore';
import {IComment} from "@store/modules/account/interfaces/IComment";

export class StoreModel implements IStore {
  // *api/users
  public user: IUser = null;
  public userContacts: IUserContacts = null;
  public callingCodes: ICallingCode[] = null;
  // *api/users

  // *api/locations
  public userLocation: IUserLocation = null;
  public countries: ICountry[] = null;
  // *api/locations

  // *api/account
  public locations: ILocation[] = null;
  public accountMerchant: IAccountMerchant = null;
  // *api/account

  // *api/merhants
  public merchant: IMerchantDetails = null;
  // *api/merhants

  // *api/shops
  public shopsCategories: IShopCategory[];
  // *api/shops

  // *api/documents
  public maf: IDocumentsMaf = null;
  // *api/documents

  // *api/documents
  // *api/merchants
  public comments: IComment[] = null;
  // *api/documents
  // *api/merchants
}
