import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductsSelectors } from '../../../core/ngxs/products/products.selectors';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.html',
  styleUrl: './breadcrumbs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIcon],
})
export class Breadcrumbs {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  product = this.store.selectSignal(ProductsSelectors.currentProduct);
  category = this.route.snapshot.paramMap.get('category');
}
