import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Injector,
  Input,
  Renderer2,
} from '@angular/core';
import { FormGroup, NgControl } from '@angular/forms';
import { isJSType } from '@core/handlers/condition.handlers';
import { nativeElement } from '@core/handlers/shared.handlers';
import { TUserRole } from '@store/modules/users/types/users.types';
import { UsersController } from '@store/modules/users/users.controller';
import { EnUserRole } from '@store/modules/users/enums/users.enums';
import { Store } from '@store/store/store';

@Directive({
  selector: '[roleManagerDirective]',
})
export abstract class RoleManagerFormDirective {
  @Input('rolesElementType') protected type: 'form' | 'control' | 'any' = 'any';
  @Input('formGroup') protected formGroup: FormGroup;

  constructor(
    private injector: Injector,
    private renderer: Renderer2,
    private el$: ElementRef,
    private cdr: ChangeDetectorRef,
    private usersController: UsersController
  ) {}

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

  private getDisabledState(): boolean {
    switch (this.type) {
      case 'form': {
        return this.formGroup.disabled;
      }
      case 'control': {
        return this.injector.get(NgControl).disabled;
      }
      case 'any': {
        const el$: HTMLButtonElement = nativeElement(this.el$);

        return el$.hasAttribute('role-disabled');
      }
    }
  }

  protected disable(): void {
    switch (this.type) {
      case 'form': {
        this.disableFormGroup();
        break;
      }
      case 'control': {
        this.disableFormControl();
        break;
      }
      case 'any': {
        this.disableAny();
        break;
      }
    }

    this.cdr.detectChanges();
  }

  private disableFormGroup(): void {
    this.formGroup.disable();
  }

  private disableFormControl(): void {
    const control: NgControl = this.injector.get(NgControl);

    control.valueAccessor.setDisabledState(true);
  }

  private disableAny(): void {
    const el$: HTMLElement = nativeElement(this.el$);

    this.renderer.setAttribute(el$, 'role-disabled', 'true');
  }
}
