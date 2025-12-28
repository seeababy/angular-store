import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { BasketSelectors } from '../../../../core/ngxs/basket/basket.selectors';
import { RemoveFromBasket, UpdateQuantity } from '../../../../core/ngxs/basket/basket.state';
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

  items = this.store.selectSignal(BasketSelectors.basketProducts);
  totalCount = this.store.selectSignal(BasketSelectors.totalCount);

  increase(id: number) {
    const item = this.items().find(i => i.id === id);
    if (item) {
      this.store.dispatch(new UpdateQuantity(id, item.quantity + 1));
    }
  }

  decrease(id: number) {
    const item = this.items().find(i => i.id === id);
    if (item && item.quantity > 1) {
      this.store.dispatch(new UpdateQuantity(id, item.quantity - 1));
    }
  }

  remove(id: number) {
    this.store.dispatch(new RemoveFromBasket(id));
  }
}
