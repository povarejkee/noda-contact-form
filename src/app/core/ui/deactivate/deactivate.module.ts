import { NgModule } from '@angular/core';
import { DeactivateDirective } from './directives/deactivate.directive';
import { DeactivateGuard } from './guards/deactivate.guard';

const declarations = [DeactivateDirective];

@NgModule({
  declarations,
  providers: [DeactivateGuard],
  exports: declarations,
})
export class DeactivateModule {}
