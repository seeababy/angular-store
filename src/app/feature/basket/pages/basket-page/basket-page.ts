import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { BasketSelectors } from '../../../../core/ngxs/basket/basket.selectors';
import { ClearCart, RemoveFromCart, UpdateCart } from '../../../../core/ngxs/basket/basket.actions';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.html',
  styleUrls: ['./basket-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class BasketPage {
  private store = inject(Store);

  items = this.store.selectSignal(BasketSelectors.items);
  totalCount = this.store.selectSignal(BasketSelectors.totalCount);

  increase(id: string) {
    const item = this.items().find((i) => i.productId === id);
    if(item) {
      this.store.dispatch(new UpdateCart(id, item.quantity + 1));
    }
  }

  decrease(id: string) {
    const item = this.items().find((i) => i.productId === id);
    if(item) {
      this.store.dispatch(new UpdateCart(id, item.quantity - 1));
    }
  }

  removeFromCart(id: string) {
    this.store.dispatch(new RemoveFromCart(id));
  }

  clearCart() {
    this.store.dispatch(new ClearCart());
  }
}



