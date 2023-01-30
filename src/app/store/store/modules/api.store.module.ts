import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({})
export class ApiStoreModule {
  static forRoot(): ModuleWithProviders<ApiStoreModule> {
    return {
      ngModule: ApiStoreModule,
    };
  }
}
