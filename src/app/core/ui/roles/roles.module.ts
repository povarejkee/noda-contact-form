import { NgModule } from '@angular/core';
import { UsersApiService } from '@store/modules/users/users.api.service';
import { UsersController } from '@store/modules/users/users.controller';
import { DisableForRolesDirective } from './directives/disable-for-roles.directive';
import { EnableForRolesDirective } from './directives/enable-for-roles.directive';
import { HideForRolesDirective } from './directives/hide-for-roles.directive';
import { ShowForRolesDirective } from './directives/show-for-roles.directive';

const declarations = [
  DisableForRolesDirective,
  EnableForRolesDirective,
  HideForRolesDirective,
  ShowForRolesDirective,
];

@NgModule({
  declarations,
  providers: [UsersApiService, UsersController],
  exports: declarations,
})
export class RolesModule {}
