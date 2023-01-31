import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiStoreModule } from '@store/store/modules/api.store.module';
import { Observable } from 'rxjs';
import { ICallingCode } from './interfaces/ICallingCode';
import { IUser } from './interfaces/IUser';
import { IUserContacts } from './interfaces/IUserContacts';

@Injectable({
  providedIn: ApiStoreModule,
})
export class UsersApiService {
  constructor(private http: HttpClient) {}

  public getCallingCodes(): Observable<ICallingCode[]> {
    return this.http.get<ICallingCode[]>('@/users/callingCodes');
  }

  public saveContacts(contacts: IUserContacts): Observable<void> {
    return this.http.post<void>('@/users/contact', contacts);
  }

  public getCurrentUser(): Observable<IUser> {
    return this.http.get<IUser>('@/users/current');
  }
}
