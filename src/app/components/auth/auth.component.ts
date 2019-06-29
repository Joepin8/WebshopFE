import {Component, Injectable, OnInit} from '@angular/core';

import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {routes} from '../../app-routing.module';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  user: User = new User();
  showRegister = false;


  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  public login() {
    this.userService.login(this.user, false);
  }
  public register() {
    this.userService.register(this.user);
    this.user = new User();

  }
  public setShowRegister() {
    this.showRegister = !this.showRegister;
  }
}
