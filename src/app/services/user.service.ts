import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {ApiService} from './api.service';
import {AuthorizationService} from './authorization.service';

import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private api: ApiService,
              private authService: AuthorizationService,
              private router: Router) {

  }

  public getAll(id: number): Observable<User> {
    return this.api.get<User>('user/' + id);
  }

  public register(user: User): void {
    this.api.post<void>('user', user).subscribe(
      ifSuccess => {
        confirm('Gefeliciteerd, het registreren is voltooid!');
      },
      error => {
        alert('Het registreren is mislukt ' + user.naam);
      }
    );
  }

  public login(user: User, remember: boolean): void {
    this.authService.setAuthorization(user.email, user.wachtwoord);

    this.api.get<User>('user/login').subscribe(
      authenticator => {
        this.authService.storeAuthorization(authenticator, remember);
        this.goToStore();
      },
      error => {
        alert('Het inloggen is mislukt' + error);
      }
    );
  }

  public logout() {
    this.authService.deleteAuthorization();

    this.goToLogin();
  }

  private goToStore() {
    this.router.navigate(['/']);
  }

  private goToLogin() {
    this.router.navigate(['/login']);
  }

  // private goBack() {
  //   this.router.navigate(['/login']);
  // }

  public save(user: User) {
    this.api.put('user/' + user.user_id, user).subscribe(
      res => {
        console.log('Saved: ' + user.naam);
      },
      err => {
        console.log('An internal error occurred');
      }
    );
  }

  public saveMultiple(users: User[]) {
    users.forEach(item => {
      this.api.put('user/' + item.user_id, item).subscribe(
        ifSuccess => {

        },
        error => {
          alert('Could not put to server: ' + error.message);
        }
      );
    });
  }
}
