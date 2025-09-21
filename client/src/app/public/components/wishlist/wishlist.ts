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

    let orderedMap = new Map<number, Wish[]>();
    this.wishes().forEach((wish) => {
      if (!orderedMap.has(wish.order)) {
        orderedMap.set(wish.order, []);
      }
      orderedMap.get(wish.order)?.push(wish);
    });
    orderedMap = new Map([...orderedMap.entries()].sort());

    /*
    / For each key we make sure that the previous number exists
    / so that there are no gaps in the ordering
    / if there is a gap we move the wishes to the previous number
     */

    let previousKey = 0;
    orderedMap.forEach((wishes, key) => {
      if (previousKey !== -1 && key > previousKey + 1) {
        // move wishes to previousKey + 1
        const newKey = previousKey + 1;
        if (!orderedMap.has(newKey)) {
          orderedMap.set(newKey, []);
        }
        const existingWishes = orderedMap.get(newKey) || [];
        orderedMap.set(newKey, existingWishes.concat(wishes));
        orderedMap.delete(key);
        previousKey = newKey;
      } else {
        previousKey = key;
      }
    });

    return orderedMap;
  });
}
