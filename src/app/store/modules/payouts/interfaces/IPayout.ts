export interface IPayout {
  id: string;
  amount: number;
  currency: string;
  beneficiaryName: string;
  beneficiaryRef: string;
  iban: string;
  createdAt: string;
  fee: string;
  status: number; // *EnPayoutStatus
  type: number; // *EnPayoutType
}
