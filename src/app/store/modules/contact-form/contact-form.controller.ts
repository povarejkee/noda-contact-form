import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ControllersStoreModule } from '@store/store/modules/controllers.store.module';
import { ContactFormApiService } from '@store/modules/contact-form/contact-form.api.service';

import { IContactFormData } from '@store/modules/contact-form/interfaces/IContactFormData';
import { IFormRequest } from '@store/modules/contact-form/interfaces/IFormRequest';

@Injectable({
  providedIn: ControllersStoreModule,
})
export class ContactFormController {
  constructor(private contactFormService: ContactFormApiService) {}

  public sendContactForm(form: IFormRequest): Observable<IContactFormData> {
    return this.contactFormService.sendContactForm(form);
  }
}
