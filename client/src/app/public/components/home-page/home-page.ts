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
  projectNotInstalled = false;

  private $destroy = new Subject<void>();

  ngOnInit() {

    this.loadWishes();
    this.subscribeConfigProject();
  }

  loadWishes(){
    this.wishesService.getAll().subscribe({
      next: (wishes) => {
        this.wishes = wishes;
      },
      error: (error) => {
        console.error('Error fetching wishes:', error);
      }
    });
  }
  subscribeConfigProject(){
    this.configStore.name$.pipe(takeUntil(this.$destroy)).subscribe(name => {
      if(name) {
        this.name = name;
      }else{
        this.projectNotInstalled = true;
      }
    });
    this.configStore.description$.pipe(takeUntil(this.$destroy)).subscribe(description => {
      if(description) {
        this.description = description;
      }else{
        this.projectNotInstalled = true;
      }
    });

  }


  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
