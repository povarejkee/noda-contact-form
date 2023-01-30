import { IDocument } from './IDocument';

export interface IDocumentsMaf {
  ownedByParent: boolean;
  companyInfo: IMafCompany;
  parentCompanyInfo: IMafCompany;
  nonProfit: boolean;
  listedOnStockExchange: boolean;
  members: IDocumentsMafMember[];
  serviceDescription: string;
  yearsInBusiness: number;
  companyOwnsDomains: boolean;
  filedForBankruptcy: boolean;
  bankruptcyFiling: string;
  companyPrimaryCurrency: string;
  avgTransaction: number;
  expectedMonthlyTurnover: number;
  highestTransaction: number;
  hasRecurringPayments: boolean;
  hasFreeTrialPeriods: boolean;
  hasRelationToUS: boolean;
  fatcaGiin: string;
  hasSignificantControlUSResidents: boolean;
  paymentsPrimaryCurrency: string;
  accountHolder: string;
  sortCode: string;
  routingNumber: string;
  iban: string;
  principalContact: IMafContact;
  comments: string;
  filled: boolean;
  document: IDocument;
}

export interface IMafCompany {
  name: string;
  registrationNumber: string;
  tradeName: string;
  typeOfBusiness: string;
  licenseNumber: string;
  taxIdentificationNumber: string;
  incorporationDate: string;
  address: IAddress;
  billingAddress: string;
  countryCode: string;
  phoneNumber: string;
}

export interface IMafContact {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  messenger: string;
}

export interface IAddress {
  country: string;
  city: string;
  state: string;
  street: string;
  houseNumber: string;
  postalCode: string;
}

export interface IDocumentsMafMember {
  id?: string;
  type: number;
  fullName: string;
  dateOfBirth: string;
  country: string;
  city: string;
  state: string;
  homeAddress: string;
  postalCode: string;
  countryCode: string;
  taxResidenceCountryCode: string;
  taxIdentificationNumber: string;
  sourceOfWealth: string;
  phoneNumber: string;
  passportId: string;
  ownership: number;
  politicallyExposedPerson: boolean;
}
