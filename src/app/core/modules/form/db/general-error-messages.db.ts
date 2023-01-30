export const GeneralErrorMessagesDB = {
  required: 'The field "{{fieldName}}" is required',
  'not-equal-list-values': 'The value must be selected from the list',
  minlength:
    'The field "{{fieldName}}" cannot be less than {{requiredLength}} characters.Now {{actualLength}}',
  maxlength:
    'The field "{{fieldName}}" cannot be longer than {{requiredLength}} characters.Now {{actualLength}}',
  email:
    'The field "{{fieldName}}" must match the email type: "examplename@gmail.com"',
  min: 'The field "{{fieldName}}" cannot be less than {{min}}. Now {{actual}}',
  max: 'The field "{{fieldName}}" cannot be larger than {{max}}. Now {{actual}}',
  excludeSpaces: 'The field "{{fieldName}}" must not contain spaces',
  httpPattern:
    'The field "{{fieldName}}" must match the URL type: "https://example.com"',
  emailPattern: 'Email format is incorrect',
  sortRoutingPattern:
    'The field "{{fieldName}}" must match the type: "12-34-56 / 12345678"',
  ibanPattern: 'IBAN must match the type: "AA 12 3456 7890 1234 5678 90"',
  swiftPattern: 'SWIFT must match the type: "AAAA-BB-CC-123"',
};

export type TGeneralErrorMessagesDB = typeof GeneralErrorMessagesDB;
