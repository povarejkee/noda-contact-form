import { DetectorManager } from '@core/managers/Detector.manager';
import { ErrorManager } from '@core/managers/Error.manager';
import { StateActionManager } from '@core/managers/StateAction.manager';
import { UnsubscribeManager } from '@core/managers/Unsubscribe.manager';
import { IStateAction } from './IStateAction';
import {
  TDetectionEvent,
  TErrorEvent,
} from '@core/managers/types/managers.types';

export interface IStreamManagers<A extends IStateAction> {
  unsubscribeManager: UnsubscribeManager;
  actionManager: StateActionManager<A>;
  errorManager: ErrorManager<TErrorEvent<A>>;
  detectorManager: DetectorManager<TDetectionEvent<A>>;
}
