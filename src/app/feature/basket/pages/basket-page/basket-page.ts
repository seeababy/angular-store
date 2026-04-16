import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { BasketSelectors } from '../../../../core/ngxs/basket/basket.selectors';
import { ClearCart, RemoveFromCart, UpdateCart } from '../../../../core/ngxs/basket/basket.actions';
import { MatIconModule } from '@angular/material/icon';
import { BasketCard } from "../../components/basket-card/basket-card";
import { RouterLink } from "@angular/router";
import { AppRoutesConfig } from '../../../../app.routes-config';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.html',
  styleUrls: ['./basket-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatIconModule, BasketCard, RouterLink],
})
export class BasketPage {
  private store = inject(Store);

  items = this.store.selectSignal(BasketSelectors.items);
  totalCount = this.store.selectSignal(BasketSelectors.totalCount);
  total = this.store.selectSignal(BasketSelectors.total);

  readonly AppRoutesConfig = AppRoutesConfig;

  clearCart() {
    this.store.dispatch(new ClearCart());
  }
}



