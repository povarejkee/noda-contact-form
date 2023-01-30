import { Observable, Subject } from 'rxjs';

export class DetectorManager<A extends string> {
  private detector$: Subject<A> = new Subject();

  public detectChanges(type: A): void {
    this.detector$.next(type);
  }

  public listenDetectChanges(): Observable<A> {
    return this.detector$.asObservable();
  }
}
