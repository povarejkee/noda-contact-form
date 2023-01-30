import { IContactFormData } from '@store/modules/contact-form/interfaces/IContactFormData';

export interface IFormRequest {
  id: string; // Form Id
  name: string; // Form Name
  referrer: string; // Form Url
  data: IContactFormData;
}
