import { EnDocumentsStatus } from '@store/modules/documents/enums/documents.enums';

export interface IDocument {
  name: string;
  status: EnDocumentsStatus;
  description: string;
  url: string;
  rejectReason: string;
  id?: string;
  fileName?: string;
  deleteAllowed?: boolean;
  commentAllowed?: boolean;
  commentsCount?: number;
}
