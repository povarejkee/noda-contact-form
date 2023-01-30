import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ApiStoreModule } from '@store/store/modules/api.store.module';

import { IFormRequest } from '@store/modules/contact-form/interfaces/IFormRequest';
import { IContactFormData } from '@store/modules/contact-form/interfaces/IContactFormData';

@Injectable({
  providedIn: ApiStoreModule,
})
export class ContactFormApiService {
  constructor(private http: HttpClient) {}

  public sendContactForm(
    formRequest: IFormRequest
  ): Observable<IContactFormData> {
    // return this.http.post<IContactFormData>('https://noda-lending.azurewebsites.net/api/sf?code=JVafqzkXbRX5KpypNypF2_Fjel0jl62TnQKZcBXKLdOhAzFuSwn9hg==', formRequest);
    return of([]).pipe(delay(3000)) as Observable<IContactFormData>;
  }
}
