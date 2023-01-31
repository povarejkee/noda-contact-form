export class MerchantSetDocumentStatus {
  constructor(
    public rejectReason: string,
    public status: number // * EnDocumentsStatus
  ) {}
}
