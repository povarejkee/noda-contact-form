import { InjectionToken } from '@angular/core';
import { IAuthService } from '../interfaces/IAuthService';

export const AUTH_SERVICE = new InjectionToken<IAuthService>(
  'auth_service_token'
);
