import { Observable, Subject } from 'rxjs';
import { IStateAction } from './interfaces/IStateAction';
export class StateActionManager<A extends IStateAction> {
  private action$: Subject<A> = new Subject();

  public listen(): Observable<A> {
    return this.action$.asObservable();
  }

  public action(stateAction: A): void {
    this.action$.next(stateAction);
  }
}
