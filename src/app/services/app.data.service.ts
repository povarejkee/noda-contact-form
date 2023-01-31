import { Injectable } from '@angular/core';

import { ExtendsFactory } from '@core/managers/handlers/managers.handlers';
import { State } from '@core/managers/StateService.manager';

import { AppDataState } from '../state/app.data.state';

@Injectable({
  providedIn: 'root',
})
export class AppDataService extends ExtendsFactory(
  State({
    state: AppDataState,
  })
) {
  public setFormMap(key: string, value: string): void {
    this.getState('state', 'formsMap').set(key, value);
  }

  public getFormMap(key: string): string {
    return this.getState('state', 'formsMap').get(key);
  }
}
