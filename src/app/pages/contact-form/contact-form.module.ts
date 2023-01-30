import { NgModule } from '@angular/core';

import { SharedModule } from '@core/modules/shared.module';

import { ContactFormDataService } from '@page/contact-form/services/contact-form.data.service';
import { ContactFormViewService } from '@page/contact-form/services/contact-form.view.service';

import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { SentNotificationComponent } from './components/sent-notification/sent-notification.component';

@NgModule({
  declarations: [ContactFormComponent, SentNotificationComponent],
  imports: [SharedModule],
  providers: [ContactFormDataService, ContactFormViewService],
  exports: [ContactFormComponent],
})
export class ContactFormModule {}
