import { ModuleWithProviders, NgModule } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@NgModule({})
export class MsalServiceModule {
  static forRoot(): ModuleWithProviders<MsalServiceModule> {
    return {
      ngModule: MsalServiceModule,
      providers: [MsalService],
    };
  }
}
