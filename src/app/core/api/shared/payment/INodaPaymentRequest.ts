export interface INodaPaymentRequest {
  apiKey: string;
  sortCode: string;
  routingNumber: string;
  currency: string;
  amount: number;
  iin: number;
  description: string;
  country: string;
  paymentId: string;
  disabled: boolean;
  returnUrl: string;
  env: string;
}
