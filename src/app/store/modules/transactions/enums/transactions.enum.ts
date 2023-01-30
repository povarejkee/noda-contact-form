export enum EnTransactionsStatus {
  New = 1,
  Processing = 2,
  Failed = 3,
  'Awaiting confirmation' = 4,
  Done = 5,
}

export enum EnTransactionType {
  Purchase = 1,
  Refund = 2,
}

export enum EnTransactionsRefundStatus {
  New = 1,
  Processing = 2,
  Failed = 3,
  'Awaiting confirmation' = 4,
  Done = 5,
  Sent = 6,
}
