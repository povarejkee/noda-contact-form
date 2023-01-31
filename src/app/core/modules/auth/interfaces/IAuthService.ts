import { EndSessionRequest } from '@azure/msal-browser';

export interface IAuthService {
  logout(config?: EndSessionRequest): void;
}
