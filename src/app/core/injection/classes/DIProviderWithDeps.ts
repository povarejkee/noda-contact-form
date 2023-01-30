import { InjectionToken, Provider } from '@angular/core';
import { DIProvider, TUseProvider } from '@core/handlers/shared.handlers';

export class DIProviderWithDeps<T = any> {
  constructor(
    private token: InjectionToken<any>,
    private value: T,
    private use: TUseProvider = 'class',
    private multi: boolean = true
  ) {}

  setDeps(deps: any[]): Provider {
    const provider = DIProvider(this.token, this.value, this.use, this.multi);

    (provider as any).deps = deps;

    return provider;
  }
}
