import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Product } from '../../entities/interfaces/product.interface';
import { MatIcon } from "@angular/material/icon";
import { Store } from '@ngxs/store';
import { AddToBasket } from '../../../core/ngxs/basket/basket.actions';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIcon],
})
export class Card {
  store = inject(Store);

  product = input.required<Product>(); 

  onAdd() {
    const id = this.product()?.id;
    this.store.dispatch(new AddToBasket(id));
  }
}
