import { ISimple } from '@core/interfaces/ISimple';
import { TMask } from '../types/form.types';

export const MASK_PATTERNS: {
  [K in TMask]?: ISimple<{ pattern: RegExp; symbol?: string }>;
} = {
  'negative-number': {
    V: { pattern: new RegExp('-') },
    '0': { pattern: new RegExp('[0-9]') },
  },
} as const;
