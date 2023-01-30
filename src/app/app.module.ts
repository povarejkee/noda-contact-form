import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@store/store/modules/store.module';
import { AppRoutingModule } from './app.routing.module';
import { ContactFormModule } from '@page/contact-form/contact-form.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule,
    AppRoutingModule,
    ContactFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
