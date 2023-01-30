import { InjectionToken } from '@angular/core';
import * as moment from 'moment';

export type MomentJS = typeof moment;
export const MOMENT = new InjectionToken<MomentJS>('moment js', {
  providedIn: 'root',
  factory(): MomentJS {
    return moment;
  },
});
