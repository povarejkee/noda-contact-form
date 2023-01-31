export interface ITransactionRefund {
  currency: string;
  refundReason: string;
  status: number; // * EnTransactionsRefundStatus
  amount: number;
  referenceId: string;
  date: string;
}
