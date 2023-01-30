import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IEnvironment } from '@env/interfaces/IEnvironment';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, tap } from 'rxjs/operators';
import { EnApi } from '../enums/api.enums';

@Injectable({
  providedIn: 'root',
})
export class InitializeApiService {
  private env: IEnvironment;

  public initalize(): Observable<boolean> {
    const url: string = environment.production
      ? EnApi.CONFIG_PROD_ROOT
      : EnApi.CONFIG_DEV_ROOT;

    return ajax.getJSON(url).pipe(
      tap((env: IEnvironment) => {
        Object.assign(environment, env);
        this.env = environment;
      }),
      map(Boolean)
    );
  }

  public get<K extends keyof IEnvironment>(key: K): IEnvironment[K] {
    return this.env[key];
  }

  public getFull(): IEnvironment {
    return this.env;
  }
}
