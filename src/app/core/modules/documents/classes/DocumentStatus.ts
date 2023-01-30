import { EnDocumentsStatus } from '@store/modules/documents/enums/documents.enums';
import { TDocumentStatus } from '@store/modules/merchants/types/merchants.types';

export class DocumentStatus {
  static isRequested(docStatus: number): boolean {
    return EnDocumentsStatus.Requested === docStatus;
  }

  static isReview(docStatus: number): boolean {
    return EnDocumentsStatus['In review'] === docStatus;
  }

  static isRejected(docStatus: number): boolean {
    return EnDocumentsStatus.Rejected === docStatus;
  }

  static isAccepted(docStatus: number): boolean {
    return EnDocumentsStatus.Done === docStatus;
  }

  static isNotReview(docStatus: number): boolean {
    return !DocumentStatus.isReview(docStatus);
  }

  static isNotRequested(docStatus: number): boolean {
    return !DocumentStatus.isRequested(docStatus);
  }

  static isNotRejected(docStatus: number): boolean {
    return !DocumentStatus.isRejected(docStatus);
  }

  static isNotAccepted(docStatus: number): boolean {
    return !DocumentStatus.isAccepted(docStatus);
  }

  static isExistDocStatus(
    docStatus: number,
    statuses: TDocumentStatus[]
  ): boolean {
    const statusesValues: number[] = statuses.map((s) => EnDocumentsStatus[s]);

    return statusesValues.includes(docStatus);
  }
}
