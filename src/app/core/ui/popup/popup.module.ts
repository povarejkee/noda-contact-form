import { NgModule } from '@angular/core';
import { CoreModule } from '@core/modules/core.module';
import { PipesModule } from '@core/modules/pipes/pipes.module';
import { PopupComponent } from './components/popup/popup.component';
import { PopupDirective } from './directives/popup.directive';

const declarations = [PopupComponent, PopupDirective];

@NgModule({
  declarations,
  imports: [CoreModule, PipesModule],
  exports: declarations,
})
export class PopupModule {}
