import { Component, computed, input, Signal } from '@angular/core';
import { Wish } from '../../../admin/model/wish.model';
import { WishComponent } from '../wish-component/wish-component';

@Component({
  selector: 'app-wishlist',
  imports: [
    WishComponent,
  ],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss'
})
export class Wishlist {
  wishes = input.required<Wish[]>();

  orderedWishes :Signal<Map<number,Wish[]>> = computed(() => {

    const orderedMap = new Map<number, Wish[]>();
    this.wishes().forEach((wish) => {
      if (!orderedMap.has(wish.order)) {
        orderedMap.set(wish.order, []);
      }
      orderedMap.get(wish.order)?.push(wish);
    });
    return orderedMap;
  });
}
