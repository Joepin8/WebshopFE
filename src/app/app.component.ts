import {Component, ViewChild} from '@angular/core';
import {AuthorizationService} from './services/authorization.service';
import {Router} from '@angular/router';
import {User} from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular';

  // @ViewChild('sidenav') sidenav: MatSidenav;

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
}
