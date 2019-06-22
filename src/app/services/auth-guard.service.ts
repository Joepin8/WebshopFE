import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthorizationService} from './authorization.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthorizationService, public router: Router) { }

  canActivate(): boolean {
    if (!this.auth.hasAuthorization()) {
      alert('Not authorized');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
