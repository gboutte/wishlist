import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';

export abstract class AbstractService {
  protected httpClient: HttpClient = inject(HttpClient);
  protected readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  protected readonly deleteHttpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    }),
  }
  private api = '/api';


  getUrl() {
    return this.api;
  }
}
