import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { Product } from '../../entities/interfaces/product.interface';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AddToBasket } from '../../../core/ngxs/basket/basket.actions';
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

  product = input.required<Product>();
  readonly AppRoutesConfig = AppRoutesConfig;

  // isInBasket = this.store.selectSignal(state =>
  //   BasketSelectors.isInBasket(state.basket)(this.product().id)
  // );

  isInBasket = signal(false);

  readonly cdnUrl = 'http://localhost:3000/uploads/products/';

  onAdd() {
    const id = this.product()?.id;
    if (id) {
      // this.store.dispatch(new AddToBasket(id));
    }
  }

  goToBasket() {
    this.router.navigate([AppRoutesConfig.Basket]);
  }

  goToProductPage() {
    const id = this.product()?.id;
    if (id) {
      this.router.navigate([AppRoutesConfig.Product, id]);
    }
  }
}
