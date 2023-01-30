export enum DocumentsFormStatus {
  None = 1,
  Ready = 2,
  Signed = 3,
  Rejected = 4,
}

export enum DocumentFormStatusType {
  'default' = DocumentsFormStatus['None'],
  'warning' = DocumentsFormStatus['Ready'],
  'success' = DocumentsFormStatus['Signed'],
}

export enum EnDocumentsStatusTypes {
  'Not requested' = 'warning_dash',
  Requested = 'warning_exclamation',
  'In review' = 'default',
  Done = 'success',
  Rejected = 'error',
}
