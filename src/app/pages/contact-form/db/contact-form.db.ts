import { ListOption } from '@core/classes/ListOption';
import { SelectOption } from '@core/modules/form/classes/SelectOption';

export const ContactFormDb = {
  form: {
    controls: [
      new ListOption({
        type: 'input-text',
        label: 'First name',
        // required: true,
        controlName: 'name',
        placeholder: 'Enter a first name',
      }),
      new ListOption({
        type: 'input-text',
        label: 'Last name',
        // required: true,
        controlName: 'surname',
        placeholder: 'Enter a last name',
      }),
      new ListOption({
        type: 'input-text',
        label: 'Work email',
        // required: true,
        controlName: 'email',
        placeholder: 'Enter an email',
      }),
      new ListOption({
        type: 'input-text',
        label: 'Work phone',
        // required: true,
        controlName: 'phone',
        placeholder: 'Enter a phone',
        mask: '+0*',
      }),
      new ListOption({
        type: 'input-text',
        label: 'Company name',
        // required: true,
        controlName: 'companyName',
        placeholder: 'Enter a company name',
      }),
      new ListOption({
        type: 'input-text',
        label: 'Company website',
        // required: true,
        controlName: 'website',
        placeholder: 'example.com',
      }),
      new ListOption({
        type: 'select',
        label: 'Company size',
        // required: true,
        controlName: 'companySize',
        options: [
          new SelectOption('1-99', 0),
          new SelectOption('100-999', 1),
          new SelectOption('1000-4999', 2),
          new SelectOption('500+', 3),
        ],
        placeholder: 'Select a range of employees',
      }),
      new ListOption({
        type: 'input-autocomplete',
        label: 'Country',
        // required: true,
        controlName: 'country',
        placeholder: 'Select a country',
      }),
      new ListOption({
        type: 'select',
        label: 'Payments volume',
        // required: true,
        controlName: 'paymentsVolume',
        options: [
          new SelectOption('Less than $50,000', 0),
          new SelectOption('$50,000 to $100,000', 1),
          new SelectOption('$100,000 to $1,000,000', 2),
          new SelectOption('$1,000,000 to $10,000,000', 3),
          new SelectOption('More than $10,000,000', 4),
        ],
        placeholder: 'Select a monthly amount',
      }),
    ],
  },
} as const;
