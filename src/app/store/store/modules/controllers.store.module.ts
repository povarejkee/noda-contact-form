import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({})
export class ControllersStoreModule {
  static forRoot(): ModuleWithProviders<ControllersStoreModule> {
    return {
      ngModule: ControllersStoreModule,
    };
  }
}
