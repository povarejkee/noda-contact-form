import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { EndSessionRequest } from '@azure/msal-browser';
import { IAuthService } from '../../interfaces/IAuthService';

@Injectable()
export class AuthMsalService implements IAuthService {
  constructor(private msalService: MsalService) {}

  public logout(config: EndSessionRequest = {}): void {
    // this.msalService.instance.
    this.msalService.logoutRedirect(config);
  }
}
