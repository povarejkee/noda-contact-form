import { ISimple } from '@core/interfaces/ISimple';

export interface IValidationLength
  extends Record<'min' | 'max', ISimple<number>> {}
