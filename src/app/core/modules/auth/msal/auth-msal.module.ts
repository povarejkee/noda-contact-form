// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { NgModule, Provider } from '@angular/core';
// import {
//   MsalBroadcastService,
//   MsalGuard,
//   MsalInterceptor,
//   MsalModule,
//   MsalService,
// } from '@azure/msal-angular';
// import { PublicClientApplication } from '@azure/msal-browser';
// import { DIProvider } from '@core/handlers/shared.handlers';
// import { AUTH_SERVICE } from '../inject/auth.injection';
// import {
//   AuthConfig,
//   AuthGuardConfig,
//   AuthInterceptorConfig,
// } from './msal.configurations';
// import { AuthMsalService } from './services/auth-msal.service';

// export const MsalInterceptorProvider: Provider = DIProvider(
//   HTTP_INTERCEPTORS,
//   MsalInterceptor
// );
// const ServiceProvider: Provider = DIProvider(
//   AUTH_SERVICE,
//   AuthMsalService,
//   'class',
//   false
// );

// const exports = [MsalModule];

// @NgModule({
//   imports: [
//     ...exports,
//     MsalModule.forRoot(
//       new PublicClientApplication(AuthConfig),
//       AuthGuardConfig,
//       AuthInterceptorConfig
//     ),
//   ],
//   providers: [
//     MsalService,
//     MsalGuard,
//     MsalBroadcastService,
//     ServiceProvider
//   ],
//   exports: [...exports, MsalModule],
// })
// export class AuthMSALModule {}

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  Provider,
} from '@angular/core';
import {
  MsalBroadcastService,
  MsalGuard,
  MsalGuardConfiguration,
  MsalInterceptor,
  MsalInterceptorConfiguration,
  MsalModule,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
} from '@azure/msal-angular';
import { Configuration, PublicClientApplication } from '@azure/msal-browser';
import { initializeFactory } from '@core/api/handlers/api.handlers';
import { ApiInterceptor } from '@core/api/interceptors/api.interceptor';
import { InitializeApiService } from '@core/api/services/initialize.api.service';
import { DIProvider } from '@core/handlers/shared.handlers';
import { DIProviderWithDeps } from '@core/injection/classes/DIProviderWithDeps';
import { IEnvironment } from '@env/interfaces/IEnvironment';
import { AUTH_SERVICE } from '../inject/auth.injection';
import {
  getMSALAuthCofiguration,
  getMSALGuardConfiguration,
  getMSALInterceptorConfiguration,
} from './msal.configurations';
import { MsalServiceModule } from './msal.services.module';
import { AuthMsalService } from './services/auth-msal.service';

function MSALInstanceFactory(
  configService: InitializeApiService
): PublicClientApplication {
  const env: IEnvironment = configService.getFull();
  const configuration: Configuration = getMSALAuthCofiguration(env);

  return new PublicClientApplication(configuration);
}

function MSALGuardFactory(
  configService: InitializeApiService
): MsalGuardConfiguration {
  const env: IEnvironment = configService.getFull();
  const configuration: MsalGuardConfiguration = getMSALGuardConfiguration(env);
  return configuration;
}

function MSALInterceptorFactory(
  configService: InitializeApiService
): MsalInterceptorConfiguration {
  const env: IEnvironment = configService.getFull();
  const configuration: MsalInterceptorConfiguration =
    getMSALInterceptorConfiguration(env);
  return configuration;
}

const ServiceProvider: Provider = DIProvider(
  AUTH_SERVICE,
  AuthMsalService,
  'class',
  false
);

@NgModule({
  imports: [MsalModule, MsalServiceModule.forRoot()],
})
export class AuthMSALModule {
  static forRoot(): ModuleWithProviders<AuthMSALModule> {
    return {
      ngModule: AuthMSALModule,
      providers: [
        new DIProviderWithDeps(
          APP_INITIALIZER,
          initializeFactory,
          'factory',
          true
        ).setDeps([InitializeApiService]),
        new DIProviderWithDeps(
          MSAL_INSTANCE,
          MSALInstanceFactory,
          'factory',
          false
        ).setDeps([InitializeApiService]),
        new DIProviderWithDeps(
          MSAL_GUARD_CONFIG,
          MSALGuardFactory,
          'factory',
          false
        ).setDeps([InitializeApiService]),
        new DIProviderWithDeps(
          MSAL_INTERCEPTOR_CONFIG,
          MSALInterceptorFactory,
          'factory',
          false
        ).setDeps([InitializeApiService]),
        MsalGuard,
        MsalBroadcastService,
        ServiceProvider,
        DIProvider(HTTP_INTERCEPTORS, ApiInterceptor),
        DIProvider(HTTP_INTERCEPTORS, MsalInterceptor),
      ],
    };
  }
}
