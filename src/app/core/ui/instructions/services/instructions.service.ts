import { Injectable } from '@angular/core';
import { ExtendsFactory } from '@core/managers/handlers/managers.handlers';
import { State } from '@core/managers/StateService.manager';
import { StreamManager } from '@core/managers/Stream.manager';
import { InstructionsDB } from '../db/instructions.db';

@Injectable({ providedIn: 'root' })
export class InstructionsService extends ExtendsFactory(
  State({ db: InstructionsDB }),
  StreamManager(null)
) {}
