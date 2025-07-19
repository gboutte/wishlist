import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { Wish } from '../../model/wish.model';
import { WishesService } from '../../services/wishes.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TuiButton, TuiLabel, TuiLoader, TuiTextfieldComponent, TuiTextfieldDirective } from '@taiga-ui/core';
import { TuiInputNumberDirective, TuiSwitch } from '@taiga-ui/kit';
import { TuiCurrencyPipe } from '@taiga-ui/addon-commerce';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { WishComponent } from '../../../public/components/wish-component/wish-component';

@Component({
  selector: 'app-admin-wish-form',
  imports: [
    ReactiveFormsModule,
    TuiTextfieldComponent,
    TuiTextfieldDirective,
    TuiLabel,
    TuiButton,
    TuiSwitch,
    TuiInputNumberDirective,
    TuiCurrencyPipe,
    TuiLoader,
    RouterLink,
    WishComponent,
  ],
  templateUrl: './admin-wish-form.html',
  styleUrl: './admin-wish-form.scss',
  providers: [WishesService],
})
export class AdminWishForm implements OnInit, OnDestroy {
  public wish!: Wish | null;
  private wishesService: WishesService = inject(WishesService);
  private router: Router = inject(Router);
  private route = inject(ActivatedRoute);
  private $destroy = new Subject<void>();

  protected formWish!: Wish;
  protected suggestedWish!: Wish;

  wishForm: FormGroup = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    link: new FormControl<string>(''),
    disabled: new FormControl<boolean>(false),
    price: new FormControl<number | null>(null),
    order: new FormControl<number>(1, [Validators.required]),
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== undefined && id !== null && id !== '') {
      this.wishesService.find(id).subscribe({
        next: (wish: Wish) => {
          this.wish = wish;
          this.wishForm.patchValue(wish);
        },
        error: (error) => {
          console.error('Error fetching wish:', error);
        },
      });
    } else {
      this.wish = null;
    }

    this.subscribeToFormChanges();
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

  subscribeToFormChanges() {
    this.link.valueChanges
      .pipe(takeUntil(this.$destroy), debounceTime(300))
      .subscribe((value: string) => {
        this.wishesService.getSuggestion(this.link.value).subscribe({
          next: (wish: Wish) => {

            wish.link = wish.link || this.link.value;
            wish.price = wish.price || this.price.value;

            this.suggestedWish = wish;
          },
          error: (error) => {
            console.error('Error fetching suggestion:', error);
          },
        });
      });

    this.wishForm.valueChanges
      .pipe(takeUntil(this.$destroy), debounceTime(300))
      .subscribe((value: Wish) => {
        this.formWish = this.getWishFromForm();
      });
  }

  getWishFromForm(): Wish {
    const wish: Wish = new Wish();
    wish.title = this.title.value;
    wish.description = this.description.value;
    wish.link = this.link.value;
    wish.disabled = this.disabled.value;
    wish.price = this.price.value;
    wish.order = this.order.value;
    return wish;
  }

  get title(): FormControl {
    return this.wishForm.get('title') as FormControl;
  }
  get description(): FormControl {
    return this.wishForm.get('description') as FormControl;
  }
  get link(): FormControl {
    return this.wishForm.get('link') as FormControl;
  }
  get disabled(): FormControl {
    return this.wishForm.get('disabled') as FormControl;
  }
  get price(): FormControl {
    return this.wishForm.get('price') as FormControl;
  }
  get order(): FormControl {
    return this.wishForm.get('order') as FormControl;
  }

  getWishObj() {
    const wish: Wish = new Wish();
    wish.title = this.title.value;
    wish.description = this.description.value;
    wish.link = this.link.value;
    wish.disabled = this.disabled.value;
    wish.price = this.price.value;
    wish.order = this.order.value;
    return wish;
  }

  onSubmit() {
    const wishData = this.getWishObj();
    if (this.wish === null) {
      this.wishesService.create(wishData).subscribe({
        next: (wish: Wish) => {
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          console.error('Error creating wish:', error);
        },
      });
    } else {
      wishData.id = this.wish.id; // Ensure the ID is set for update
      this.wishesService.update(wishData).subscribe({
        next: (wish: Wish) => {
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          console.error('Error updating wish:', error);
        },
      });
    }
  }
}
