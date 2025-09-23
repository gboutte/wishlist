import { Component, computed, input, Signal } from '@angular/core';
import { Wish } from '../../../admin/model/wish.model';
import { WishComponent } from '../wish-component/wish-component';

interface WishGroup {
  order: number;
  wishes: Wish[];
}

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

  orderedWishes :Signal<WishGroup[]> = computed(() => {
    const wishGroups: WishGroup[] = [];

    let orderedMap = new Map<number, Wish[]>();
    this.wishes().forEach((wish) => {
      if (!orderedMap.has(wish.order)) {
        orderedMap.set(wish.order, []);
      }
      orderedMap.get(wish.order)?.push(wish);
    });

    const orderedKeys = Array.from(orderedMap.keys()).sort((a, b) => a - b);

    /*
    / For each key we make sure that the previous number exists
    / so that there are no gaps in the ordering
    / if there is a gap we move the wishes to the previous number
     */


    let previousKey = 0;
    orderedKeys.forEach((wishKey) => {
        const newKey = previousKey + 1;
        wishGroups.push({ order: newKey, wishes: orderedMap.get(wishKey) || [] });
        previousKey = newKey;
    });

    return wishGroups;
  });
}
