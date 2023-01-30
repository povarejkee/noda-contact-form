import { Injectable } from '@angular/core';

import { ExtendsFactory } from '@core/managers/handlers/managers.handlers';
import { State } from '@core/managers/StateService.manager';
import { StreamManager } from '@core/managers/Stream.manager';

import { ContactFormDataFlags } from '@page/contact-form/state/contact-form.data.flags';
import { ContactFormController } from '@store/modules/contact-form/contact-form.controller';

import { IContactFormData } from '@store/modules/contact-form/interfaces/IContactFormData';
import { IFormRequest } from '@store/modules/contact-form/interfaces/IFormRequest';

@Injectable()
export class ContactFormDataService extends ExtendsFactory(
  State({ flags: ContactFormDataFlags }),
  StreamManager()
) {
  constructor(private contactFormController: ContactFormController) {
    super();
  }

  public sendForm(form: IContactFormData): void {
    const formRequestData: IFormRequest = {
      id: '',
      name: '',
      referrer: '',
      data: form,
    }; // TODO по пустым строкам созвониться с Даней

    this.setState('flags', 'isLoading', true);

    const next = () => {
      this.setState('flags', 'isLoading', false);
      this.setState('flags', 'isSentForm', true);
    };

    this.contactFormController
      .sendContactForm(formRequestData)
      .pipe(this.untilDestroyed())
      .subscribe(next);
  }
}
