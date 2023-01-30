import { HttpErrorResponse } from '@angular/common/http';

export class StreamError<E extends string> {
  constructor(public error: HttpErrorResponse, public type: E) {}
}
