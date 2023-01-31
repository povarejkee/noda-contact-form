import { Directive, Input } from '@angular/core';
import { TUserRole } from '@store/modules/users/types/users.types';
import { RoleManagerDirective } from './role-manager.directive';

@Directive({
  selector: '[showForRoles]',
})
export class ShowForRolesDirective extends RoleManagerDirective {
  @Input('showForRoles') set _roles(roles: TUserRole[] | TUserRole) {
    roles = this.parseRoles(roles);

    this.toggleElement(roles);
  }

  ngOnInit() {
    this.clearContainer();
  }

  async toggleElement(roles: TUserRole[]): Promise<void> {
    const isContainRole: boolean = await this.isContainRole(roles);

    if (isContainRole) {
      this.insertTemplate();
    }
  }
}
