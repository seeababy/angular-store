import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IOrder } from '../../../make-orders/entities/interfaces/order.interface';
import { OrderCard } from '../../../make-orders/components/order-card/order-card';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.html',
  styleUrl: './order-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [OrderCard, MatExpansionModule],
})
export class OrderItem {
  order = input.required<IOrder>();

  readonly cdn = 'http://localhost:3000/uploads/products/';

  opened = false;

  total() {
    return this.order().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  shortId() {
    return this.order().id.slice(0, 5);
  }
}
