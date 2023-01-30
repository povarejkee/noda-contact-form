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
import {IComment} from "@store/modules/account/interfaces/IComment";

export interface IStore {
  // *api/users
  user: IUser;
  callingCodes: ICallingCode[];
  userContacts: IUserContacts;
  // *api/users

  // *api/locations
  countries: ICountry[];
  userLocation: IUserLocation;
  // *api/locations

  // *api/account
  locations: ILocation[];
  accountMerchant: IAccountMerchant;
  // *api/account

  // *api/merchants
  merchant: IMerchantDetails;
  // *api/merchants

  // *api/shops
  shopsCategories: IShopCategory[];
  // *api/shops

  // *api/documents
  maf: IDocumentsMaf;
  // *api/documents

  // *api/documents
  // *api/merchants
  comments: IComment[];
  // *api/documents
  // *api/merchants
}
