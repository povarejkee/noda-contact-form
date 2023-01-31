export interface ITransactionDetails {
  paymentInfo: {
    transactionType: number; // *EnTransactionType
    status: string; // * EnTransactionsStatus
    country: string;
    bank: string;
    amount: number;
    currency: string;
    date: string;
    transactionId: string;
    orderId: string;
    shop: string;
    url: string;
  };
  customerInfo: {
    id: string;
    email: string;
    ipAddress: string;
    userAgent: string;
  };
}
