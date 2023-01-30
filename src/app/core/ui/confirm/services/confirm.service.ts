import { Injectable } from '@angular/core';
import { ExtendsFactory } from '@core/managers/handlers/managers.handlers';
import { StreamManager } from '@core/managers/Stream.manager';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfirmAction } from '../classes/ConfirmAction';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService extends ExtendsFactory(StreamManager()) {
  private confirm$: Subject<boolean> = new Subject();
  private popup$: Subject<ConfirmAction> = new Subject();

  public confirm(message: string, loading: boolean = false): Promise<boolean> {
    this.popup$.next(new ConfirmAction(message, loading));

    return this.confirm$.asObservable().pipe(take(1)).toPromise();
  }

  public answer(result: boolean, isHidePopup: boolean = true): void {
    if (isHidePopup) {
      this.hidePopup();
    }

    this.confirm$.next(result);
  }

  public hidePopup(): void {
    this.popup$.next(null);
  }
}
