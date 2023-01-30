import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ContactFormViewService } from '@page/contact-form/services/contact-form.view.service';
import { ContactFormDataService } from '@page/contact-form/services/contact-form.data.service';
import { ContactFormDataFlags } from '@page/contact-form/state/contact-form.data.flags';

import { FormValidator } from '@core/modules/form/classes/FormValidator';
import { NSFormPattern } from '@core/modules/form/namespaces/form.namespaces';

import { ListOption } from '@core/classes/ListOption';

@Component({
  selector: 'noda-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  public form: FormGroup;

  // todo T generic
  public controls: ListOption<any>[] = this.viewService.getDataFromDB([
    'form',
    'controls',
  ]);

  public dataFlags: ContactFormDataFlags =
    this.dataService.getFullState('flags');

  constructor(
    private fb: FormBuilder,
    private viewService: ContactFormViewService,
    private dataService: ContactFormDataService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public get disabledButton(): boolean {
    return this.form.invalid || this.form.pristine || this.dataFlags.isLoading;
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [null],
      surname: [null],
      email: [
        null,
        FormValidator.pattern(NSFormPattern.get('email'), 'emailPattern', true),
      ],
      phone: [null],
      companyName: [null],
      website: [null],
      companySize: [null],
      country: [null],
      paymentsVolume: [null],
      comment: [null],
    });
  }

  public send(): void {
    console.warn(this.form.value);

    this.dataService.sendForm(this.form.value);
  }
}
