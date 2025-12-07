import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import { AuthService } from './auth.service';
import { SessionStore } from '../store/session.store';
import { User } from '../model/user.model';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

interface JWTPayload {
  //Id utilisateur
  sub: string;
  //Application
  aud: string;
  //date de creation du token
  iat: number;
  //Not valid before
  nbf: number;
  //identifiant du token
  jti: string;
  //Date d'expiration
  exp: number;
  //Scopes
  scopes: any;
}

@Injectable()
export class SessionService {
  private authService: AuthService = inject(AuthService);
  private sessionStore: SessionStore = inject(SessionStore);
  private cookieService:SsrCookieService = inject(SsrCookieService);

  get access_expires_at() {
    const access_expires_at = this.cookieService.get('access_expires_at');
    let result;
    if (access_expires_at !== null) {
      const expiresAt = JSON.parse(access_expires_at);
      result = moment(expiresAt);
    } else {
      result = null;
    }
    return result;
  }

  isExpired() {
    return moment().isAfter(this.access_expires_at);
  }

  get access_token(): string {
    return this.cookieService.get('access_token') ?? '';
  }

  public setTokens(access_token: string) {
    this.cookieService.set('access_token', access_token);

    const payload = <JWTPayload>jwtDecode(access_token);
    const expiresAt = moment.unix(payload.exp);
    this.cookieService.set(
      'access_expires_at',
      JSON.stringify(expiresAt.valueOf()),
    );
  }

  public loadInfos() {
    return new Promise((resolve, reject) => {
      if (this.isSessionValid()) {
        this.authService.getUserInfo().subscribe({
          next: (user: User) => {
            this.sessionStore.user = user;
            resolve(true);
          },
          error: () => {
            reject();
          },
        });
      } else {
        reject();
      }
    });
  }

  isLoggedIn() {
    return (
      this.access_token.length > 0 &&
      this.access_expires_at !== null &&
      !this.isExpired()
    );
  }

  isSessionValid() {
    return (
      this.access_token.length > 0 &&
      this.access_expires_at !== null &&
      moment().isBefore(this.access_expires_at)
    );
  }

  public logout() {
    this.cookieService.delete('access_token');
    this.cookieService.delete('access_expires_at');
  }

  getUsername() {
    return this.access_token;
  }
}
