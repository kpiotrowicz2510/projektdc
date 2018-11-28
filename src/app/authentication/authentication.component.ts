import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpRESTClientService } from '../http-REST-client/http-REST-client.service';

import {LoginData} from './login-data';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  clientIdSet: boolean;
  loginData: LoginData = new LoginData();

  http: HttpRESTClientService;

  constructor(private _http: HttpRESTClientService, private cdr: ChangeDetectorRef) {
    this.clientIdSet = false;
    this.http = _http;
   }

  ngOnInit() {

    //console.log(sessionStorage.getItem("client-id"));
    if (sessionStorage.getItem("client-id") == null) this.clientIdSet = false;
    else {
      this.clientIdSet = true;
      this.loginData.login = sessionStorage.getItem('user-name');
    }

  }

  authenticate() {
    let response = this.http.http_post('/user/auth', {name: this.loginData.login, hash: this.loginData.password}, (data) => {
      if (typeof data === "string") {
        sessionStorage.setItem('client-id', data);
        sessionStorage.setItem('user-name', this.loginData.login);
        this.clientIdSet = true;
        window.location.reload();
      }
    });
  }

  logout() {
    sessionStorage.removeItem('client-id');
    sessionStorage.removeItem('user-name');
    this.clientIdSet = false;
  }

}
