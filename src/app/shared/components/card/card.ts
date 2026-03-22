import { ChangeDetectionStrategy, Component, inject, input, computed } from '@angular/core';
import { Product } from '../../entities/interfaces/product.interface';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UpdateCart } from '../../../core/ngxs/basket/basket.actions';
import { AppRoutesConfig } from '../../../app.routes-config';
import { BasketSelectors } from '../../../core/ngxs/basket/basket.selectors';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIconModule, RouterModule],
})
export class Card {
  private store = inject(Store);
  private router = inject(Router);

  readonly AppRoutesConfig = AppRoutesConfig;
  readonly cdnUrl = 'http://localhost:3000/uploads/products/';

  product = input.required<Product>();

  items = this.store.selectSignal(BasketSelectors.items);

  isInBasket(): boolean {
    const id = this.product()?.id;
    return this.items().some((item) => item.productId === id);
  }

  onAdd() {
    const id = this.product()?.id;
    if (id) {
      this.store.dispatch(new UpdateCart(id, 1));
    }
  }

  goToBasket() {
    this.router.navigate(['/', AppRoutesConfig.Basket]);
  }

  goToProductPage() {
    const id = this.product()?.id;
    if (id) {
      this.router.navigate(['/', AppRoutesConfig.Product, id]);
    }
  }
}
