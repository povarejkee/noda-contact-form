import { Directive, Input } from '@angular/core';
import { TUserRole } from '@store/modules/users/types/users.types';
import { RoleManagerDirective } from './role-manager.directive';

@Directive({
  selector: '[hideForRoles]',
})
export class HideForRolesDirective extends RoleManagerDirective {
  @Input('hideForRoles') set _roles(roles: TUserRole[] | TUserRole) {
    roles = this.parseRoles(roles);

    this.toggleElement(roles);
  }

  async toggleElement(roles: TUserRole[]): Promise<void> {
    const isContainRole: boolean = await this.isContainRole(roles);

    if (!isContainRole) {
      this.insertTemplate();
    }
  }
}
