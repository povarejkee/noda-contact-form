import { DocumentsFormStatus } from '../enums/documents.shared.enums';

export const DocumentsDB = {
  statuses: {
    warning: [
      DocumentsFormStatus.None,
      DocumentsFormStatus.Ready,
      DocumentsFormStatus.Rejected,
    ],
    success: [DocumentsFormStatus.Signed],
  },
} as const;
