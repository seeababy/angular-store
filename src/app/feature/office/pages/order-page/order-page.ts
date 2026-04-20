import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { OrdersSelectors } from '../../../../core/ngxs/orders/orders.selectors';
import { GetOrders } from '../../../../core/ngxs/orders/orders.actions';
import { OrderItem } from '../../components/order-item/order-item';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.html',
  styleUrl: './order-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [OrderItem, MatExpansionModule],
})
export class OrderPage implements OnInit {
  private store = inject(Store);

  orders = this.store.selectSignal(OrdersSelectors.orders);

  ngOnInit() {
    this.store.dispatch(new GetOrders());
  }
}
