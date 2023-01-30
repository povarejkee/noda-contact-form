import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { StreamError } from './classes/StreamError';

export class ErrorManager<E extends string> {
  private error$: Subject<StreamError<E>> = new Subject();

  public error(error: HttpErrorResponse, type: E) {
    this.error$.next(new StreamError(error, type));
  }

  public listen(): Observable<StreamError<E>> {
    return this.error$.asObservable();
  }
}
