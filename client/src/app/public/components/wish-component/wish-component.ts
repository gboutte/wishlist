import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Wish } from '../../../admin/model/wish.model';

@Component({
  selector: 'app-wish',
  imports: [
    CurrencyPipe,
  ],
  templateUrl: './wish-component.html',
  styleUrl: './wish-component.scss'
})
export class WishComponent {

  wish = input.required<Wish>();
}
