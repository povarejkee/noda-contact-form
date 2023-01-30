import { InjectionToken } from '@angular/core';

export type WindowDocument = Window & typeof globalThis;
export const WINDOW = new InjectionToken<Window & typeof globalThis>('window', {
  providedIn: 'root',
  factory() {
    return window;
  },
});
