import { Directive } from '@angular/core';
import { isJSType } from '@core/handlers/condition.handlers';
import { FactoryResolveDirective } from '@core/modules/directives/factory-resolve.directive';
import { TUserRole } from '@store/modules/users/types/users.types';
import { EnUserRole } from '@store/modules/users/enums/users.enums';
import { Store } from '@store/store/store';

@Directive({
  selector: '[roleManager]',
})
export abstract class RoleManagerDirective extends FactoryResolveDirective<null> {
  protected parseRoles(roles: TUserRole[] | TUserRole): TUserRole[] {
    return isJSType(roles, 'string')
      ? [roles as TUserRole]
      : (roles as TUserRole[]);
  }

  protected isContainRole(roles: TUserRole[]): boolean {
    const store: Store = this.injector.get(Store);
    const { role: enumRole } = store.getValue('user');
    const role: TUserRole = EnUserRole[enumRole] as TUserRole;

    return roles.includes(role);
  }
}
