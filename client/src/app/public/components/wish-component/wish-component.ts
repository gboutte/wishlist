import { Component, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Wish } from '../../../admin/model/wish.model';
import { ConfigStore } from '../../../config/config.store';

@Component({
  selector: 'app-wish',
  imports: [
    CurrencyPipe,
  ],
  templateUrl: './wish-component.html',
  styleUrl: './wish-component.scss'
})
export class WishComponent {

  configStore:ConfigStore = inject(ConfigStore);

  wish = input.required<Wish>();
}
