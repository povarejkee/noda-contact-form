import { Injectable } from '@angular/core';

import { ExtendsFactory } from '@core/managers/handlers/managers.handlers';
import { State } from '@core/managers/StateService.manager';
import { StreamManager } from '@core/managers/Stream.manager';

import { ContactFormDb } from '@page/contact-form/db/contact-form.db';

@Injectable()
export class ContactFormViewService extends ExtendsFactory(
  State({
    db: ContactFormDb,
  }),
  StreamManager()
) {}
