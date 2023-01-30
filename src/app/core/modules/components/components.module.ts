import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CoreModule } from '../core.module';
import { DirectivesModule } from '../directives/directives.module';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { IconComponent } from './components/icon/icon.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

const declarations = [
  IconComponent,
  SpinnerComponent,
];

@NgModule({
  declarations,
  imports: [
    CoreModule,
    MaterialModule,
    PipesModule,
    DirectivesModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: declarations,
})
export class ComponentsModule {}
