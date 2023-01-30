import {
  EnCompanySize,
  EnPaymentsVolume,
} from '@store/modules/contact-form/enums/contact-form.enum';

export interface IContactFormData {
  name: string; // First name
  surname: string; // Last name
  email: string; // Work email
  phone: string; // Work phone
  company_name: string; // Company name
  website: string; // Company website
  company_size: EnCompanySize; // Company size
  country: string; // ISO 3166-1 alpha-2 country code // Country
  payments_volume: EnPaymentsVolume; // Payments volume
  comment: string | null; // null for empty field // Anything else?
}
