import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  private users: User[];
  private request;
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.request = this.http.get(environment.api + '/api/users');
    this.request.subscribe((data) => this.users = data);

  }

}
