import { IMerchantsSaveDocument } from '../interfaces/IMerchantSaveDocument';

export class MerchantSaveDocument implements IMerchantsSaveDocument {
  constructor(public name: string, public description: string = null) {}
}
