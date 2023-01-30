export interface IMerchant {
  id: string;
  name: string;
  registrationNumber: string;
  sortCode: string;
  routingNumber: string;
  iban: string;
  status: number;
  role: number; // * EnUserRole
  documentsStatus: number; // * EnDocumentsStatus
  isActive: boolean;
}
