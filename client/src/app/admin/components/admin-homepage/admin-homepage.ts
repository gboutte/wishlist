import { Component, inject, OnInit } from '@angular/core';
import {
  TuiComparator, TuiSortChange,
  TuiSortDirection, TuiTable,
  TuiTableDirective, TuiTableHead, TuiTableSortable, TuiTableSortBy, TuiTableSortPipe,
  TuiTableTbody,
  TuiTableTd,
  TuiTableTh, TuiTableThGroup,
} from '@taiga-ui/addon-table';
import { WishesService } from '../../services/wishes.service';
import { Wish } from '../../model/wish.model';
import { TuiAlertService, TuiButton, TuiDialogService, TuiIcon, TuiLoader } from '@taiga-ui/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TUI_CONFIRM, TuiCheckbox } from '@taiga-ui/kit';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  TUI_DEFAULT_MATCHER,
  tuiControlValue,
  TuiDay,
  tuiDefaultSort,
  tuiIsFalsy,
  tuiIsPresent,
  TuiLet,
  tuiToInt,
} from '@taiga-ui/cdk';
import { BehaviorSubject, combineLatest, debounceTime, Observable, of, share, startWith, switchMap } from 'rxjs';

function sortBy(key: keyof Wish, direction: TuiSortDirection): TuiComparator<Wish> {
  return (a, b) => direction * tuiDefaultSort(a[key], b[key]);
}


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
    TuiCheckbox,
    ReactiveFormsModule,
    TuiLet,
    TuiTableSortPipe,
    TuiTableHead,
    TuiTableSortable,
    TuiTableThGroup,
    AsyncPipe,
    TuiTableSortBy,
    TuiTable,
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
  private readonly dialogs = inject(TuiDialogService);

  protected readonly columns = [
    'title',
    'link',
    'description',
    'disabled',
    'created_at',
    'order',
    'actions'
  ] as const;
  wishList!: Wish[];
  protected showDisabledControl = new FormControl<boolean>(false);
  protected readonly direction$ = new BehaviorSubject<TuiSortDirection>(
    TuiSortDirection.Asc,
  );
  protected readonly sortKey$ = new BehaviorSubject<keyof Wish>('order');



  ngOnInit() {
   this.reloadWishes();
    this.listenToCheckboxChanges();
  }
  private listenToCheckboxChanges() {
    this.showDisabledControl.valueChanges.subscribe(() => {
      this.reloadWishes();
    });
  }
  private reloadWishes() {
    if(this.showDisabledControl.value) {
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

  confirmDelete(wish: Wish) {
    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Are you sure?',
        data: {
          content: `Do you really want to delete this wish: "${wish.title}"? This process cannot be undone.`,
          yes: 'Yes, delete it',
          no: 'Cancel',
        },
      })
      .subscribe((response) => {
        if(response){
          this.wishService.delete(wish.id).subscribe({
            next: () => {
              this.reloadWishes();
            },
            error: (error) => {
              console.error('Error deleting wish:', error);
            }
          });
        }
      });
  }

}
