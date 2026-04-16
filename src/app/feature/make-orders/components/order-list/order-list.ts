import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OrderCard } from "../order-card/order-card";
import { BasketSelectors } from '../../../../core/ngxs/basket/basket.selectors';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [OrderCard],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderList {
  private store = inject(Store);

  items = this.store.selectSignal(BasketSelectors.items);
}
