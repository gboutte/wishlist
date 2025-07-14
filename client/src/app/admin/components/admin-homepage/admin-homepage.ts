import { Component, inject, OnInit } from '@angular/core';
import { TuiTableDirective, TuiTableTbody, TuiTableTd, TuiTableTh } from '@taiga-ui/addon-table';
import { WishesService } from '../../services/wishes.service';
import { Wish } from '../../model/wish.model';
import { TuiButton, TuiIcon, TuiLoader } from '@taiga-ui/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-homepage',
  imports: [
    TuiTableDirective,
    TuiTableTh,
    TuiTableTbody,
    TuiTableTd,
    TuiLoader,
    DatePipe,
    TuiButton,
    RouterLink,
    TuiIcon,
  ],
  templateUrl: './admin-homepage.html',
  styleUrl: './admin-homepage.scss',
  providers:[
    WishesService
  ]
})
export class AdminHomepage implements OnInit{
  size:"m" = 'm'
  private wishService: WishesService = inject(WishesService);

  archived: boolean = false;

  wishList!: Wish[];

  ngOnInit() {
    if(this.archived) {
      this.loadWishesArchived();
    }else {
      this.loadWishes();
    }
  }

  loadWishes() {
    this.wishService.getAll().subscribe({
      next: (wishes: Wish[]) => {
        this.wishList = wishes;
      },
      error: (error) => {
        console.error('Error loading wishes:', error);
      }
    })
  }

  loadWishesArchived() {
    this.wishService.getAllArchive().subscribe({
      next: (wishes: Wish[]) => {
        this.wishList = wishes;
      },
      error: (error) => {
        console.error('Error loading archived wishes:', error);
      }
    })
  }
}
