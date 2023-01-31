import { Directive, Input } from '@angular/core';
import { TUserRole } from '@store/modules/users/types/users.types';
import { RoleManagerFormDirective } from './role-manager-form.directive';

@Directive({
  selector: '[disableForRoles]',
})
export class DisableForRolesDirective extends RoleManagerFormDirective {
  @Input('disableForRoles') set _roles(roles: TUserRole[] | TUserRole) {
    roles = this.parseRoles(roles);
    this.toggleControl(roles);
  }

  private toggleControl(roles: TUserRole[]): void {
    const isContainRole: boolean = this.isContainRole(roles);

    if (isContainRole) {
      this.disable();
    }
  }
}
