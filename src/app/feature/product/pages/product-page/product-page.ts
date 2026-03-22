import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  AddRecentlyProducts,
  GetProductById,
  GetViewedProducts,
} from '../../../../core/ngxs/products/products.actions';
import { PageSwitcher } from '../../components/page-switcher/page-switcher';
import { CategorySwitcher } from '../../components/category-switcher/category-switcher';
import { CardSlider } from '../../components/card-slider/card-slider';
import { ProductsSelectors } from '../../../../core/ngxs/products/products.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [RouterOutlet, PageSwitcher, CategorySwitcher, CardSlider],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPage implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.trackIdChanges();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new AddRecentlyProducts());
  }

  private trackIdChanges(): void {
    this.activatedRoute.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        if (params['id']) {
          this.store.dispatch(new AddRecentlyProducts());
          this.store.dispatch(new GetProductById(params['id']));
        }
      });
  }
}
