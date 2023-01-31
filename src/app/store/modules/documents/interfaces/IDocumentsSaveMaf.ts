import { IDocumentsMaf } from './IDocumentsMaf';

export interface IDocumentsSaveMaf
  extends Omit<IDocumentsMaf, 'filled' | 'document'> {}
