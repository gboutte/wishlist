import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WishesService } from '../../../admin/services/wishes.service';
import { Wish } from '../../../admin/model/wish.model';
import { TuiLoader } from '@taiga-ui/core';
import { Wishlist } from '../wishlist/wishlist';
import { ConfigStore } from '../../../config/config.store';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [
    TuiLoader,
    Wishlist,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  providers:[WishesService]
})
export class HomePage implements OnInit ,OnDestroy{
  private wishesService: WishesService = inject(WishesService);
  private configStore: ConfigStore = inject(ConfigStore);

  wishes!: Wish[];

  name!:string;
  description!:string;

  private $destroy = new Subject<void>();

  ngOnInit() {
    this.wishesService.getAll().subscribe({
      next: (wishes) => {
        this.wishes = wishes;
      },
      error: (error) => {
        console.error('Error fetching wishes:', error);
      }
    });


    this.configStore.name$.pipe(takeUntil(this.$destroy)).subscribe(name => {
      if(name) {
        this.name = name;
      }
    });
    this.configStore.description$.pipe(takeUntil(this.$destroy)).subscribe(description => {
      if(description) {
        this.description = description;
      }
    });

  }


  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
