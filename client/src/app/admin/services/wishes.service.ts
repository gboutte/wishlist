import { Injectable } from '@angular/core';
import { AbstractService } from '../../global/abstract.service';
import { map, Observable } from 'rxjs';
import { User } from '../../auth/model/user.model';
import { deserialize } from 'serializr';
import { Wish } from '../model/wish.model';

@Injectable()
export class WishesService extends AbstractService {


  getAll(): Observable<Wish[]> {
    return this.httpClient
      .get(this.getUrl() + '/wishes', this.httpOptions)
      .pipe(map((response: any) => response.map((wish: any) => deserialize(Wish, wish))));
  }
  getAllArchive(): Observable<Wish[]> {
    return this.httpClient
      .get(this.getUrl() + '/wishes/archive', this.httpOptions)
      .pipe(map((response: any) => response.map((wish: any) => deserialize(Wish, wish))));
  }

  create(wish: Wish): Observable<Wish> {
    return this.httpClient
      .post<Wish>(this.getUrl() +'/wishes', wish, this.httpOptions)
      .pipe(map((response: any) => deserialize(Wish, response)));
  }

  update(wish: Wish): Observable<Wish> {

    const data = {
      title: wish.title,
      description: wish.description,
      link: wish.link,
      disabled: wish.disabled,
      price: wish.price,
      order: wish.order,
      picture: wish.picture,
    }

    return this.httpClient
      .patch<Wish>(this.getUrl() + '/wishes/' + wish.id, data, this.httpOptions)
      .pipe(map((response: any) => deserialize(Wish, response)));
  }

  find(id: string): Observable<Wish> {
    return this.httpClient
      .get<Wish>(this.getUrl() + '/wishes/' + id, this.httpOptions)
      .pipe(map((response: any) => deserialize(Wish, response)));
  }

  delete(id: string): Observable<void> {
    return this.httpClient
      .delete<void>(this.getUrl() + '/wishes/' + id, this.deleteHttpOptions)
      .pipe(map((response: any) => response));
  }

  getSuggestion(url: string): Observable<Wish> {
    return this.httpClient
      .post<Wish>(this.getUrl() + '/wishes/suggestion',{
        link: url
      }, this.httpOptions)
      .pipe(map((response: any) => deserialize(Wish, response)));
  }
}
