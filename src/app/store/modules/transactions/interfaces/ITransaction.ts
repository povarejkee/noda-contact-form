export interface ITransaction {
  id: string;
  orderId: string;
  type: number; // * EnTransactionType
  bank: string;
  country: string;
  shop: string;
  amount: number;
  currency: string;
  date: string;
  status: string;
  customerId: string;
  email: string;
  ip: string;
  userAgent: string;
  referenceId: string;
  remitterIban: string;
  remitterName: string;
  originalPaymentId: string;
}
