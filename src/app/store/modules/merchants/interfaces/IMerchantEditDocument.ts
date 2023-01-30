import { IDocument } from '@store/modules/documents/interfaces/IDocument';

export interface IMerchantEditDocument extends Partial<Omit<IDocument, 'id'>> {}
