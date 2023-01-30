import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ContactFormViewService } from '@page/contact-form/services/contact-form.view.service';
import { ContactFormDataService } from '@page/contact-form/services/contact-form.data.service';
import { ContactFormDataFlags } from '@page/contact-form/state/contact-form.data.flags';
import { AppDataService } from '../../../../services/app.data.service';

import { FormValidator } from '@core/modules/form/classes/FormValidator';
import { NSFormPattern } from '@core/modules/form/namespaces/form.namespaces';
import { TContactFormControl } from '@page/contact-form/types/contact-form.types';
import { IFormRequest } from '@store/modules/contact-form/interfaces/IFormRequest';

@Component({
  selector: 'noda-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  public form: FormGroup;

  public controls: TContactFormControl[] = this.viewService.getDataFromDB([
    'form',
    'controls',
  ]);

  public dataFlags: ContactFormDataFlags =
    this.dataService.getFullState('flags');

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private viewService: ContactFormViewService,
    private dataService: ContactFormDataService,
    private appDataService: AppDataService
  ) {}

  ngOnInit(): void {
    this.setFragmentIntoMap();
    this.initForm();
  }

  // TODO декоратор из Хаба для form-disabled
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
    const { fragment, queryParams } = this.route.snapshot;

    const formRequestData: IFormRequest = {
      id: this.appDataService.getFormMap(fragment),
      name: fragment,
      referrer: queryParams.referrer,
      data: this.form.value,
    };

    // TODO убрать
    console.warn('request:', formRequestData);

    this.dataService.sendForm(formRequestData);
  }

  private setFragmentIntoMap(): void {
    const { fragment } = this.route.snapshot;

    this.appDataService.setFormMap(fragment, '0');
  }
}
