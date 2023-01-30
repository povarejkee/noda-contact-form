import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DownloadModule } from '@core/ui/download/download.module';
import { CoreModule } from '../core.module';
import { DirectivesModule } from '../directives/directives.module';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { BorderWrapperComponent } from './components/border-wrapper/border-wrapper.component';
import { ButtonComponent } from './components/button/button.component';
import { ChipsComponent } from './components/chips/chips.component';
import { CurrencyIconComponent } from './components/currency-icon/currency-icon.component';
import { FlagComponent } from './components/flag/flag.component';
import { IconBtnComponent } from './components/icon-btn/icon-btn.component';
import { IconComponent } from './components/icon/icon.component';
import { LoaderContentComponent } from './components/loader-content/loader-content.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LogoComponent } from './components/logo/logo.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavTabsComponent } from './components/nav-tabs/nav-tabs.component';
import { PaymentButtonComponent } from './components/payment-button/payment-button.component';
import { PictureComponent } from './components/picture/picture.component';
import { ShadowComponent } from './components/shadow/shadow.component';
import { ContactButtonComponent } from './components/contact-button/contact-button.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { StatusChipsComponent } from './components/status-chips/status-chips.component';
import { StatusCircleComponent } from './components/status-circle/status-circle.component';
import { StatusComponent } from './components/status/status.component';

const declarations = [
  PictureComponent,
  IconComponent,
  LoaderComponent,
  LoaderContentComponent,
  ShadowComponent,
  ButtonComponent,
  IconBtnComponent,
  LogoComponent,
  SpinnerComponent,
  ContactButtonComponent,
  PaymentButtonComponent,
  StatusCircleComponent,
  BorderWrapperComponent,
  ChipsComponent,
  CurrencyIconComponent,
  ModalComponent,
  FlagComponent,
  NavTabsComponent,
  StatusComponent,
  StatusChipsComponent,
];

@NgModule({
  declarations,
  imports: [
    CoreModule,
    MaterialModule,
    PipesModule,
    DirectivesModule,
    DownloadModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: declarations,
})
export class ComponentsModule {}
