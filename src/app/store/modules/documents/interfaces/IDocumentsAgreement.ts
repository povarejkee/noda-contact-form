import { IDocument } from './IDocument';

export interface IDocumentsAgreement {
  transactionCost: number;
  reversal: string;
  disputesProcessing: string;
  chargebackProcessing: string;
  onboardingFee: string;
  agreementNumber: string;
  document: IDocument;
}
