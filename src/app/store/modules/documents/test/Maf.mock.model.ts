import { IDocument } from '../interfaces/IDocument';
import { IDocumentsMafMember } from '../interfaces/IDocumentsMaf';

export class MafModel {
  ownedByParent: boolean = false;
  name: string = 'Name';
  tradeName: string = 'Trade name';
  typeOfBusiness: string = 'Bussiness type';
  registrationNumber: string = 'Registration number';
  companyAddress = {
    country: 'US',
    city: '110992',
    state: 'CA',
    street: 'Testing street',
    houseNumber: '123',
    postalCode: '1234567891234',
  };
  countryCode: string = '+358';
  phoneNumber: string = '12312312312';
  licenseNumber: string = '123123123';
  incorporationDate: string = '2022-02-24T13:53:03Z';
  taxIdentificationNumber: string = 'AA1234';
  listedOnStockExchange: boolean = false;
  nonProfit: boolean = true;
  billingAddress: {
    country: 'US';
    city: '111111';
    state: 'OR';
    street: 'Testing street';
    houseNumber: '123';
    postalCode: '1234567891234';
  };
  members: Array<IDocumentsMafMember> = [
    {
      id: '09b8924c-e2ea-400c-ba56-33074e676c21',
      type: 0,
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '2022-02-24T13:53:03Z',
      country: 'US',
      city: '110992',
      state: 'CA',
      homeAddress: 'Testing home address',
      postalCode: '1234567891234',
      countryCode: '+358',
      phoneNumber: '12321312',
      passportId: '1234567',
      ownership: 0,
    },
    {
      id: '768aae8e-95c0-4a1f-ae60-c9d1df5acb97',
      type: 1,
      firstName: 'Joan',
      lastName: 'Doe',
      dateOfBirth: '2022-02-24T13:53:03Z',
      country: 'US',
      city: '110992',
      state: 'CA',
      homeAddress: 'Testing home address',
      postalCode: '1234567891234',
      countryCode: '+358',
      phoneNumber: '12321312',
      passportId: '1234567',
      ownership: 30,
    },
    {
      id: '69a8910d-a046-4973-ac7b-7eb3ede229a1',
      type: 1,
      firstName: 'Mr. Pumpkin',
      lastName: 'Vegetable',
      dateOfBirth: '2022-02-21T21:00:00Z',
      country: 'US',
      city: '110992',
      state: 'CA',
      homeAddress: 'Test home address',
      postalCode: '2323123123',
      countryCode: '+358',
      phoneNumber: '12321312',
      passportId: '1233331231231231',
      ownership: 29,
    },
  ];
  serviceDescription: string = 'Testing service description';
  yearsInBusiness: number = 0;
  companyOwnsDomains: boolean = false;
  filedForBankruptcy: boolean = true;
  bankruptcyFiling: string = '2022-02-24T13:53:03Z';
  companyPrimaryCurrency: string = 'EUR';
  avgTransaction: number = 10.0;
  expectedMonthlyTurnover: number = 1.0;
  highestTransaction: number = 1;
  hasRecurringPayments: boolean = false;
  hasFreeTrialPeriods: boolean = false;
  paymentsPrimaryCurrency: string = 'EUR';
  bankName: string = 'Bank name';
  accountHolder: string = 'Account holder';
  swiftCode: string = 'aaaaaaaa123';
  sortCode: string = null;
  routingNumber: string = null;
  iban: string = 'da12321321321312321312';
  principalContact = {
    firstName: 'First name',
    lastName: 'Last name',
    email: 'test@mail.ru',
    phoneNumber: '12345678',
    countryCode: '+7',
    messenger: 'Telegram',
  };
  comments: string = null;
  filled: boolean = false;
  document: IDocument = {
    id: '348dcde2-7d19-4cef-87a7-06da32669d30',
    name: 'MAF',
    status: 1,
    description: 'MAF',
    url: null,
    rejectReason: null,
  };
}
