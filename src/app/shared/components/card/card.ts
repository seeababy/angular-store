import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from '../../entities/interfaces/product.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class Card {
  product = input<Product>(); 
  addToCart = output<number>();

onAdd() {
  const id = this.product()?.id;
  if (id !== undefined) {
    this.addToCart.emit(id);
  }
}
}
