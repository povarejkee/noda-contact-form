import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ComponentsModule } from '../components/components.module';
import { CoreModule } from '../core.module';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { FormAutocompleteComponent } from './components/form-autocomplete/form-autocomplete.component';
import { FormInputNumberComponent } from './components/form-input-number/form-input-number.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormTextareaComponent } from './components/form-textarea/form-textarea.component';
import { FormCustomSelectComponent } from './components/form-custom-select/form-custom-select.component';
import { DisabledDirective } from './directives/disabled.directive';
import { FormDisabledDirective } from './directives/form-disabled.directive';
import { UpdateFormValueDirective } from './directives/update-form-value.directive';
import { EncryptPipe } from './pipes/encrypt.pipe';
import { OverlayModule } from '@angular/cdk/overlay';

const imports = [FormsModule];
const declarations = [
  // *Directives
  DisabledDirective,
  FormDisabledDirective,
  UpdateFormValueDirective,

  // * Pipes
  EncryptPipe,

  // *Components
  FormSelectComponent,
  FormInputComponent,
  FormInputNumberComponent,
  FormAutocompleteComponent,
  FormTextareaComponent,
  FormCustomSelectComponent,
];

@NgModule({
  declarations,
  imports: [
    ...imports,
    CoreModule,
    MaterialModule,
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
