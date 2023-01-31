import { Injectable } from '@angular/core';

import { ExtendsFactory } from '@core/managers/handlers/managers.handlers';
import { State } from '@core/managers/StateService.manager';

import { AppViewState } from '../state/app.view.state';

@Injectable({
  providedIn: 'root',
})
export class AppViewService extends ExtendsFactory(
  State({
    state: AppViewState,
  }),
) {}
