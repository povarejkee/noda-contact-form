import { EnPaymentCurrency } from '../enums/payment.enums';

export function getCurrency(locationId: number): string {
  return EnPaymentCurrency[locationId] || 'EUR';
}
