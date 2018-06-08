import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { shareReplay, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { LoginState } from './login.state';
import { EventBusService } from '../event-bus.service';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private helper = new JwtHelperService();
  private redirectUrl = '/home';

  constructor(
    private http: HttpClient,
    private router: Router,
    private bus: EventBusService,
    @Inject('baseUrl') private baseUrl: string
  ) {}

  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth/login`;

    return this.http.post<User>(url, { email, password }).pipe(
      tap(res => this.setSession(res)),
      tap(res => this.publishUserName(res)),
      tap(res => this.redirect()),

      // this is just the HTTP call,
      // we still need to handle the reception of the token
      shareReplay()
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.bus.publish('LoginState', LoginState.LoggedOut());
  }

  isLoggedIn() {
    const access_token = localStorage.getItem('access_token');

    if (access_token) {
      return !this.helper.isTokenExpired(access_token);
    }

    return false;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  userName() {
    const access_token = localStorage.getItem('access_token');

    if (access_token) {
      return this.helper.decodeToken(access_token).email;
    }

    return '';
  }

  getToken() {
    const access_token = localStorage.getItem('access_token');

    if (access_token) {
      return access_token;
    }

    return '';
  }

  saveRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  private setSession(authResult) {
    localStorage.setItem('access_token', authResult.access_token);
  }

  private publishUserName(authResult) {
    let token = <any>{};
    token = this.helper.decodeToken(authResult.access_token);

    this.bus.publish('LoginState', LoginState.LoggedIn(token.email));
  }

  private redirect() {
    const url = this.redirectUrl;
    this.redirectUrl = '/home';

    this.router.navigate([url]);
  }
}
