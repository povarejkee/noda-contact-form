import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
} from '@azure/msal-angular';
import { Configuration, InteractionType } from '@azure/msal-browser';
import { IEnvironment } from '@env/interfaces/IEnvironment';
import { isIE } from './handlers/msal.handlers';

export function getMSALAuthCofiguration(
  environment: IEnvironment
): Configuration {
  return {
    auth: {
      clientId: environment.APP_AZURE_B2C_CLIENT_ID,
      redirectUri: environment.APP_AZURE_B2C_REDIRECT_URI,
      postLogoutRedirectUri: environment.APP_AZURE_B2C_REDIRECT_URI,
      authority: environment.APP_AZURE_B2C_AUTHORITY,
      knownAuthorities: [
        environment.APP_AZURE_B2C_KNOW_AUTHORITIES,
      ] as string[],
      // cloudDiscoveryMetadata: undefined,
      // authorityMetadata: undefined,
      // navigateToLoginRequestUrl: undefined,
      // clientCapabilities: undefined,
      // protocolMode: undefined,
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: isIE(),
    },
  };
}

export function getMSALGuardConfiguration(
  environment: IEnvironment
): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [
        environment.APP_AZURE_B2C_READ_SCOPE,
        environment.APP_AZURE_B2C_WRITE_SCOPE,
      ],
    },
  };
}

export function getMSALInterceptorConfiguration(
  environment: IEnvironment
): MsalInterceptorConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: new Map([
      [
        environment.APP_HOST,
        [
          environment.APP_AZURE_B2C_READ_SCOPE,
          environment.APP_AZURE_B2C_WRITE_SCOPE,
        ],
      ],
    ]),
  };
}
