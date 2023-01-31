import { EnManagerContact } from '../enums/managers.enums';

export interface IManager {
  id: string;
  name: string;
  photoUri: string;
  contacts: IManagerContact[];
}

export interface IManagerContact {
  type: EnManagerContact;
  title: string;
  uri: string;
}
