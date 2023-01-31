import { IDocumentsAgreement } from '@store/modules/documents/interfaces/IDocumentsAgreement';

export interface IMerchantAgreement
  extends Omit<IDocumentsAgreement, 'document'> {}
