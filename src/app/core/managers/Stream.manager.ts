import { HttpErrorResponse } from '@angular/common/http';
import { Enumerable } from '@core/decorators/decorators';
import { getControlErrorMessages } from '@core/modules/form/handlers/form.handlers';
import { BehaviorSubject, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TRxSubject } from '../types/libs.types';
import { StreamError } from './classes/StreamError';
import { DetectorManager } from './Detector.manager';
import { ErrorManager } from './Error.manager';
import { IStateAction } from './interfaces/IStateAction';
import { IStreamManagers } from './interfaces/IStreamManagers';
import { StateActionManager } from './StateAction.manager';
import {
  IfElse,
  TDestroyStream,
  TDetectionEvent,
  TErrorEvent,
  TRequestError,
  TStreamManager,
} from './types/managers.types';
import { UnsubscribeManager } from './Unsubscribe.manager';

function registerManager(managers: TStreamManager[], type: TStreamManager) {
  if (!managers?.includes(type)) return null;

  switch (type) {
    case 'unsubscribe':
      return new UnsubscribeManager();
    case 'action':
      return new StateActionManager();
    case 'error':
      return new ErrorManager();
    case 'detector':
      return new DetectorManager();
  }
}

export function StreamManager<A extends IStateAction>(
  managers: Array<TStreamManager> = [
    'unsubscribe',
    'action',
    'error',
    'detector',
  ]
) {
  class StreamController {
    static initializeMethod: string = '_initializeStreamManagers';
    private _streamManagers: IStreamManagers<A>;

    @Enumerable()
    private _initializeStreamManagers(): void {
      this._streamManagers = {
        unsubscribeManager: registerManager(
          managers,
          'unsubscribe'
        ) as IStreamManagers<A>['unsubscribeManager'],

        actionManager: registerManager(
          managers,
          'action'
        ) as IStreamManagers<A>['actionManager'],

        errorManager: registerManager(
          managers,
          'error'
        ) as IStreamManagers<A>['errorManager'],

        detectorManager: registerManager(
          managers,
          'detector'
        ) as IStreamManagers<A>['detectorManager'],
      };
    }

    @Enumerable()
    private getSubject<T>(streamName: string): TRxSubject<T> {
      const stream$: TRxSubject<T> = (this as any)[streamName];
      if (!stream$) throw new Error(`Invalid stream name: "${streamName}"`);
      return (this as any)[streamName] as TRxSubject<T>;
    }

    @Enumerable()
    public exclude(managers: TStreamManager[]): void {
      managers.forEach((manager) => {
        const managerKey = `${manager}Manager`;
        (this as any)._streamManagers[managerKey] = null;
      });
    }

    @Enumerable()
    public getStream<T>(streamName: string): Observable<T> {
      return this.getSubject<T>(streamName).asObservable();
    }

    @Enumerable()
    public getStreamValue<T>(streamName: string): T {
      const sub$: TRxSubject<T> = this.getSubject<T>(streamName);

      if (sub$ instanceof BehaviorSubject) {
        return sub$.getValue();
      }

      throw new Error(
        `${streamName} is not an instance of the class: BehaviorSubject`
      );
    }

    @Enumerable()
    public emitToStream<T>(streamName: string, value: T): void {
      const stream$: TRxSubject<T> = this.getSubject<T>(streamName);

      stream$.next(value);
    }

    @Enumerable()
    public action(stateAction: A): void {
      this._streamManagers.actionManager.action(stateAction);
    }

    @Enumerable()
    public listen(): Observable<A> {
      return this._streamManagers.actionManager.listen();
    }

    @Enumerable()
    public untilDestroyed(): MonoTypeOperatorFunction<any> {
      return this._streamManagers.unsubscribeManager.untilDestroyed();
    }

    @Enumerable()
    public untilDestroyedByType(
      type: A['type']
    ): MonoTypeOperatorFunction<any> {
      return this._streamManagers.unsubscribeManager.untilDestroyedByType(type);
    }

    @Enumerable()
    public unsubscribe(): void {
      this._streamManagers.unsubscribeManager.unsubscribe();
    }

    @Enumerable()
    public unsubscribeByTypes(subTypes: Array<A['type']>): void {
      this._streamManagers.unsubscribeManager.unsubscribeByTypes(subTypes);
    }

    @Enumerable()
    public fullUnsubscribe(): void {
      this._streamManagers.unsubscribeManager.fullUnsubscribe();
    }

    @Enumerable()
    public detect(type: TDetectionEvent<A>): void {
      this._streamManagers.detectorManager.detectChanges(type);
    }

    @Enumerable()
    public detectChanges(): Observable<TDetectionEvent<A>> {
      return this._streamManagers.detectorManager.listenDetectChanges();
    }

    @Enumerable()
    public listenErrors(): Observable<StreamError<TErrorEvent<A>>> {
      return this._streamManagers.errorManager.listen() as any;
    }

    @Enumerable()
    public pickControlErrors<T extends 'pick' | 'default' = 'pick'>(
      formControlName: string,
      pickErrors: boolean = true
    ): Observable<IfElse<T, 'pick', string[], TRequestError<A>>> {
      return this._streamManagers.errorManager.listen().pipe(
        map((e: StreamError<TErrorEvent<A>>) => {
          const errors: string[] = getControlErrorMessages(
            e.error,
            formControlName
          );

          const error: TRequestError<A> = { type: e.type, errors };

          return error;
        }),
        filter(({ errors }) => Boolean(errors.length)),
        map((err: TRequestError<A>) => {
          return pickErrors ? err.errors : err;
        })
      ) as any;
    }

    @Enumerable()
    public detectError(action: TErrorEvent<A>): (e: HttpErrorResponse) => void {
      return (e: HttpErrorResponse) =>
        this._streamManagers.errorManager.error(e, action);
    }

    @Enumerable()
    public destroyStreams(streams: TDestroyStream[]): void {
      streams.forEach((stream) => {
        if (typeof stream === 'string') {
          (this as any)[stream].next(null);
        } else {
          const { streamKey, value } = stream;

          if ((this as any)[streamKey]) {
            throw new Error(`Stream ${streamKey} is not defined`);
          }

          (this as any)[streamKey].next(value);
        }
      });
    }
  }

  return new StreamController();
}
