import { NgModule } from '@angular/core';
import { Store } from '../store';
import { ApiStoreModule } from './api.store.module';
import { ControllersStoreModule } from './controllers.store.module';

@NgModule({
  imports: [ApiStoreModule.forRoot(), ControllersStoreModule.forRoot()],
  providers: [Store],
  exports: [ApiStoreModule, ControllersStoreModule],
})
export class StoreModule {}
