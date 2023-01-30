import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { CoreModule } from './core.module';
import { DirectivesModule } from './directives/directives.module';
import { FormModule } from './form/form.module';
import { MaterialModule } from './material/material.module';
import { PipesModule } from './pipes/pipes.module';

const imports = [
  CoreModule,
  MaterialModule,
  ComponentsModule,
  DirectivesModule,
  PipesModule,
  FormModule,
];

@NgModule({
  imports,
  exports: imports,
})
export class SharedModule {}
