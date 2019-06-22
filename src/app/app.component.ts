import {Component, ViewChild} from '@angular/core';
import {AuthorizationService} from './services/authorization.service';
import {Router} from '@angular/router';
import {User} from './models/user.model';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular';

  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

  authenticated = false;
  authenticator: User = null;

  constructor(private authService: AuthorizationService, private router: Router) {
    this.authenticated = authService.hasAuthorization();
    authService.authorized$.subscribe(
      authorized => {
        this.authenticated = authorized;
      }
    );
    this.authenticator = authService.getAuthenticator();
    authService.authorized$.subscribe(
      auth => {
        this.authenticated = auth;
      }
    );
  }
  close() {
    this.sidenav.close();
  }

  open() {
    this.sidenav.open();
  }

  logout() {
    this.authService.deleteAuthorization();
    this.router.navigate(['']);
  }

  login() {
    this.router.navigate(['login']);
  }
}
