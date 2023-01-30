import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupModule } from '@core/ui/popup/popup.module';
import { NgxMaskModule } from 'ngx-mask';
import { ComponentsModule } from '../components/components.module';
import { CoreModule } from '../core.module';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { FormAutocompleteComponent } from './components/form-autocomplete/form-autocomplete.component';
import { FormCheckboxComponent } from './components/form-checkbox/form-checkbox.component';
import { FormDateRangePickerComponent } from './components/form-date-range-picker/form-date-range-picker.component';
import { FormDateTimePickerComponent } from './components/form-date-time-picker/form-date-time-picker.component';
import { FormInputColorComponent } from './components/form-input-color/form-input-color.component';
import { FormInputNumberComponent } from './components/form-input-number/form-input-number.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormRadioComponent } from './components/form-radio/form-radio.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormTextareaComponent } from './components/form-textarea/form-textarea.component';
import { FormTimepickerComponent } from './components/form-timepicker/form-timepicker.component';
import { FormCustomSelectComponent } from './components/form-custom-select/form-custom-select.component';
import { DisabledDirective } from './directives/disabled.directive';
import { FormDisabledDirective } from './directives/form-disabled.directive';
import { UpdateFormValueDirective } from './directives/update-form-value.directive';
import { EncryptPipe } from './pipes/encrypt.pipe';
import { OverlayModule } from '@angular/cdk/overlay';
import {LocationsController} from "@store/modules/locations/locations.controller";
import {LocationsApiService} from "@store/modules/locations/locations.api.service";

const imports = [FormsModule];
const declarations = [
  // *Directives
  DisabledDirective,
  FormDisabledDirective,
  UpdateFormValueDirective,

  // * Pipes
  EncryptPipe,

  // *Components
  FormDateTimePickerComponent,
  FormTimepickerComponent,
  FormSelectComponent,
  FormInputComponent,
  FormInputNumberComponent,
  FormInputColorComponent,
  FormAutocompleteComponent,
  FormDateRangePickerComponent,
  FormTextareaComponent,
  FormCheckboxComponent,
  FormRadioComponent,
  FormCustomSelectComponent,
];

@NgModule({
  declarations,
  imports: [
    ...imports,
    CoreModule,
    MaterialModule,
    PopupModule,
    ComponentsModule,
    PipesModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    NgxMaskModule.forRoot({ validation: true }),
    OverlayModule,
  ],
  exports: [...imports, ...declarations, ReactiveFormsModule, NgxMaskModule],
  // providers: [LocationsController, LocationsApiService]
})
export class FormModule {}
