import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { RemoveFromCart, UpdateCart } from '../../../../core/ngxs/basket/basket.actions';
import { BasketSelectors } from '../../../../core/ngxs/basket/basket.selectors';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-basket-card',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './basket-card.html',
  styleUrl: './basket-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketCard {
  private store = inject(Store);

  items = this.store.selectSignal(BasketSelectors.items);
  totalCount = this.store.selectSignal(BasketSelectors.totalCount);

  readonly cdn = 'http://localhost:3000/uploads/products/';

  increase(id: string) {
    const item = this.items().find((i) => i.productId === id);
    if (item) {
      this.store.dispatch(new UpdateCart(id, item.quantity + 1));
    }
  }

  decrease(id: string) {
    const item = this.items().find((i) => i.productId === id);
    if (item && item.quantity > 1) {
      this.store.dispatch(new UpdateCart(id, item.quantity - 1));
    }
  }

  removeFromCart(id: string) {
    this.store.dispatch(new RemoveFromCart(id));
  }
}
