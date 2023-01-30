import { ofType } from '@core/handlers/utility.handlers';
import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

export class UnsubscribeManager {
  private unusbscriber$: Subject<string> = new Subject();
  private subTypes: string[] = [];

  public untilDestroyed(): MonoTypeOperatorFunction<string> {
    return takeUntil(
      this.unusbscriber$.asObservable().pipe(
        filter((v: unknown) => {
          return !Boolean(v);
        })
      )
    );
  }

  public untilDestroyedByType(type: string): MonoTypeOperatorFunction<unknown> {
    this.subTypes.push(type);
    return takeUntil(this.unusbscriber$.asObservable().pipe(ofType(type)));
  }

  public unsubscribe(): void {
    this.unusbscriber$.next(null);
  }

  public unsubscribeByTypes(subTypes: string[]): void {
    subTypes.forEach((key) => {
      this.unusbscriber$.next(key);
      const idx: number = this.subTypes.indexOf(key);
      if (~idx) this.subTypes.splice(idx, 1);
    });
  }
  public fullUnsubscribe(): void {
    this.unsubscribe();
    this.unsubscribeByTypes(this.subTypes.concat());
  }
}
