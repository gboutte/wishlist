import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { deserialize } from 'serializr';
import { AbstractService } from '../../global/abstract.service';
import { User } from '../model/user.model';

@Injectable()
export class AuthService extends AbstractService {

  getUserInfo(): Observable<User> {
    return this.httpClient
      .get(this.getUrl() + '/users/me', this.httpOptions)
      .pipe(map((response: any) => deserialize(User, response)));
  }

  login(
    username: string,
    password: string,
  ): Observable<{ access_token: string }> {
    return this.httpClient.post<{ access_token: string }>(
      this.getUrl() + '/auth/login',
      {
        username: username,
        password: password,
      },
      this.httpOptions,
    );
  }
  install(
    username: string,
    password: string,
    name: string,
    description: string,
  ): Observable<any> {
    return this.httpClient.post<any>(
      this.getUrl() + '/install/register',
      {
        username: username,
        password: password,
        name: name,
        description: description,
      },
      this.httpOptions,
    );
  }
}
