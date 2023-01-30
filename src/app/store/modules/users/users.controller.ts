import { Injectable } from '@angular/core';
import { ExtendsFactory } from '@core/managers/handlers/managers.handlers';
import { State } from '@core/managers/StateService.manager';
import { ControllersStoreModule } from '@store/store/modules/controllers.store.module';
import { Store } from '@store/store/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICallingCode } from './interfaces/ICallingCode';
import { IUser } from './interfaces/IUser';
import { IUserContacts } from './interfaces/IUserContacts';
import { UsersControllerFlags } from './state/users.controller.flags';
import { UsersApiService } from './users.api.service';

@Injectable({
  providedIn: ControllersStoreModule,
})
export class UsersController extends ExtendsFactory(
  State({ flags: UsersControllerFlags })
) {
  constructor(private store: Store, private usersService: UsersApiService) {
    super();
  }

  public getCallingCodes(): Observable<ICallingCode[]> {
    const isLoad: boolean = this.getState('flags', 'isLoadCallingCodes');

    if (!isLoad) {
      this.setState('flags', 'isLoadCallingCodes', true);

      this.usersService
        .getCallingCodes()
        .subscribe((callingCodes: ICallingCode[]) => {
          this.store.updateStore({ callingCodes });
        });
    }

    return this.store.select('callingCodes', true);
  }

  public saveContacts(userContacts: IUserContacts): Observable<void> {
    return this.usersService
      .saveContacts(userContacts)
      .pipe(tap(() => this.store.updateStore({ userContacts })));
  }

  public getCurrentUser(): Observable<IUser> {
    return this.usersService.getCurrentUser()
      .pipe(tap((user: IUser) => this.store.updateStore({ user })))
  }
}
