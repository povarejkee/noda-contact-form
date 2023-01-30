export const FileDB = {
  errorMsgs: {
    minSize: 'Minimum file size: {{size}} Mb.',
    maxSize: 'Maximum file size: {{size}} Mb.',
    mime: 'Acceptable file formats: {{mime}}',
  },
  settings: {
    'document-file': {
      mime: [
        'image/jpeg',
        'image/png',
        'application/pdf',
        'application/x-zip-compressed',
      ],
      size: {
        max: 100, // Mb
      },
      errorMessage: 'Max 100 MB file of pdf, jpg, png, gif, svg, zip formats',
    },
    'shop-logo': {
      mime: ['image/jpeg', 'image/png'],
      size: {
        max: 1, // Mb
      },
      errorMessage: 'Max 1 MB file of jpg, png formats',
    },
  },
} as const;
