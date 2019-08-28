import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../../models/user.model';
import {ApiService} from '../../services/api.service';
import {AuthorizationService} from '../../services/authorization.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  private user: User;
  private request;
  constructor(private http: HttpClient,
              private api: ApiService,
              private authService: AuthorizationService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.user = this.authService.getAuthenticator();

  }
  public update() {
    this.userService.save(this.user);
  }

}
