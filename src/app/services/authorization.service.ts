import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private login: string = null;
  private password: string = null;
  private authenticator: User = null;

  private authenticator$ = new Subject<User>();
  public authorized$ = new Subject<boolean>();

  constructor() {
    this.restoreAuthorization();
  }

  public hasAuthorization(): boolean {
    return this.login !== null && this.password !== null;
  }

  public hasRole(role: string) {
    return this.authenticator.rol === role;
  }

  public setAuthorization(login: string, password: string): void {
    this.login = login;
    this.password = password;
  }

  public storeAuthorization(authenticator: User, local: boolean) {
    this.authenticator = authenticator;

    const authorization = {
        login: this.login,
        password: this.password,
        authenticator: this.authenticator
      };

    const authorizationString = JSON.stringify(authorization);
    const storage = local ? localStorage : sessionStorage;

    storage.setItem('authorization', authorizationString);

    this.authorized$.next(true);
    this.authenticator$.next(this.authenticator);
  }

  private restoreAuthorization(): void {
    let authorizationString = sessionStorage.getItem('authorization');

    if (authorizationString === null) {
      authorizationString = localStorage.getItem('authorization');
    }

    if (authorizationString !== null) {
      const authorization = JSON.parse(authorizationString);

      this.login = authorization['login'];
      this.password = authorization['wachtwoord'];
      this.authenticator = authorization['authenticator'];

      this.authorized$.next(true);
      this.authenticator$.next(this.authenticator);
    }
  }

  public deleteAuthorization(): void {
    this.login = null;
    this.password = null;
    this.authenticator = null;

    sessionStorage.removeItem('authorization');
    localStorage.removeItem('authorization');

    this.authorized$.next(false);
    this.authenticator$.next(null);
  }

  public createAuthorizationString(): string {
    return 'Basic ' + btoa(this.login + ':' + this.password);
  }

  public getAuthenticator(): User {
    return this.authenticator;
  }

  public setAuthenticator(authenticator: User): void {
    this.authenticator = authenticator;
  }
}
