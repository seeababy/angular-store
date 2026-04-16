import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IOrderItem } from '../../entities/interfaces/order-item.interface';

@Component({
  selector: 'app-order-card',
  standalone: true,
  templateUrl: './order-card.html',
  styleUrl: './order-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderCard {
  item = input.required<IOrderItem>();

  readonly cdn = 'http://localhost:3000/uploads/products/';
}
