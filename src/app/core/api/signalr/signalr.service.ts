import { Injectable } from '@angular/core';
import { replace } from '@core/handlers/string.handlers';
import { ExtendsFactory } from '@core/managers/handlers/managers.handlers';
import { State } from '@core/managers/StateService.manager';
import { environment } from '@env/environment';
import * as SignalR from '@microsoft/signalr';
import { AccountController } from '@store/modules/account/account.controller';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { INotification } from './interfaces/INotification';
import { NotificationDto } from './models/Notification.dto';
import { SignalRModule } from './signalr.module';
import { SignalRState } from './states/signalr.state';

@Injectable({
  providedIn: SignalRModule,
})
export class SignalRService<
  Actions extends INotification
> extends ExtendsFactory(
  State({
    state: SignalRState,
  })
) {
  constructor(private accountController: AccountController) {
    super();
  }

  public getUrl(merhantId: string): string {
    const root: string = replace(
      environment.APP_HOST,
      '/api',
      '/hub/notification'
    );
    const url: URL = new URL(root);

    url.searchParams.append('merchantId', merhantId);

    return url.href;
  }

  private action$: Subject<Actions> = new Subject();

  private connection: SignalR.HubConnection;

  public destroy(): void {
    const onfulfilledCallback = () => {
      this.connection = null;
      this.destroyStates('state');
    };

    this.disconnect(onfulfilledCallback);
  }

  public async connect(): Promise<void> {
    const { id: merchantId } = await this.accountController
      .getAccountMerchant()
      .toPromise();
    const url: string = this.getUrl(merchantId);
    const logLevel: SignalR.LogLevel = environment.production
      ? SignalR.LogLevel.Error
      : SignalR.LogLevel.Debug;

    this.connection = new SignalR.HubConnectionBuilder()
      .withUrl(url)
      .configureLogging(logLevel)
      .build();

    this.connection
      .start()
      .then(() => {
        console.log('Connected sucсessfully');
        this.initDeferredActions();
      })
      .catch((e) => {
        console.log('Connection error: ', e);
      });
  }

  private disconnect(onfulfilled: () => void): void {
    this.connection.stop().then(
      () => {
        console.log('Disconnect succefully');
        onfulfilled();
      },
      () => console.error('Disconnect failed')
    );
  }

  private initDeferredActions(): void {
    const deferredActions: Array<Actions['type']> = this.getState(
      'state',
      'deferredActions'
    );
    this.on(deferredActions);
    this.setState('state', 'deferredActions', []);
  }

  private listen(type: Actions['type']): void {
    const currentActionTypes: string[] = this.getState('state', 'actionTypes');
    const isExistAction: boolean = currentActionTypes.includes(type);

    if (!isExistAction) {
      const actionTypes: string[] = currentActionTypes.concat(type);

      this.setState('state', 'actionTypes', actionTypes);
      this.connection.on(type, (payload: Actions['payload']) => {
        this.action$.next(new NotificationDto(type, payload) as Actions);
      });
    }
  }

  public on(actionTypes: Array<Actions['type']>): Observable<Actions> {
    const isConnected: boolean = Boolean(this.connection);

    if (isConnected) {
      actionTypes.forEach((actionType: Actions['type']) => {
        this.listen(actionType);
      });
    } else {
      const currentDeferredActions: Array<Actions['type']> = this.getState(
        'state',
        'deferredActions'
      );
      const notExistActions: Array<Actions['type']> = actionTypes.filter(
        (a) => !currentDeferredActions.includes(a)
      );
      const deferredActions: Array<Actions['type']> =
        currentDeferredActions.concat(notExistActions);

      this.setState('state', 'deferredActions', deferredActions);
    }

    return this.action$.pipe(
      filter((action: Actions) => {
        return actionTypes.includes(action.type);
      })
    );
  }

  public of(actionType: Actions['type']): void {
    const currentActionTypes: string[] = this.getState('state', 'actionTypes');
    const actionTypes: string[] = currentActionTypes.filter(
      (a) => a !== actionType
    );

    this.connection.off(actionType);
    this.setState('state', 'actionTypes', actionTypes);
  }
}
