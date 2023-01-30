import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({})
export class SignalRModule {
  static forRoot(): ModuleWithProviders<SignalRModule> {
    return {
      ngModule: SignalRModule,
      providers: [],
    };
  }
}
