import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    const request = this.http.get(environment.api + '/api/');
    request.subscribe((response) => console.log(response));
  }

}
