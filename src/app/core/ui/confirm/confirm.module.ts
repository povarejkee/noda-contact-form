import { NgModule } from '@angular/core';
import { ComponentsModule } from '@core/modules/components/components.module';
import { CoreModule } from '@core/modules/core.module';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ConfirmDirective } from './directives/confirm.directive';

const declarations = [ConfirmDirective, ConfirmComponent];

@NgModule({
  declarations,
  imports: [CoreModule, ComponentsModule],
  exports: declarations,
})
export class ConfirmModule {}
