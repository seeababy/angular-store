import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductsSelectors } from '../../../../core/ngxs/products/products.selectors';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-category-switcher',
  templateUrl: './category-switcher.html',
  styleUrl: './category-switcher.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIcon],
})
export class CategorySwitcher { 
  private store = inject(Store);

  product = this.store.selectSignal(ProductsSelectors.currentProduct);

}
