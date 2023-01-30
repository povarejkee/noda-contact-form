import { NgModule } from '@angular/core';
import { SharedModule } from '@core/modules/shared.module';
import { InstructionsComponent } from './components/instructions/instructions.component';

const declarations = [
  InstructionsComponent
];

@NgModule({
  declarations,
  imports: [SharedModule],
  exports: declarations,
})
export class InstructionsModule {}
