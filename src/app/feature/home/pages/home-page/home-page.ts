import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { Product } from '../../../../shared/entities/interfaces/product.interface';
import { Card } from '../../../../shared/components/card/card';
import { Slider } from '../../../../shared/components/slider/slider';
import { homeSliderItems } from '../../../../core/mock-data/home-slider';
import {
  GetHomeProducts,
  GetRecommendedProducts,
  SetProducts,
} from '../../../../core/ngxs/products/products.actions';
import { HomeSideMenu } from '../../components/side-menu/home-side-menu';
import { ProductsSelectors } from '../../../../core/ngxs/products/products.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [Card, Slider, HomeSideMenu],
})
export class HomePage implements OnInit {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  sliderImages = homeSliderItems;
  products: Product[] = [];

  ngOnInit(): void {
    this.store.dispatch(new GetHomeProducts());
    this.selectHomeProducts();
    // this.store.dispatch(new GetRecommendedProducts());
    // this.selectRecommendedProducts();
  }

  private selectHomeProducts(): void {
    this.store
      .select(ProductsSelectors.homeProducts)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products: Product[]) => {
        this.products = products;
        this.cdr.detectChanges();
      });
  }

  private selectRecommendedProducts(): void {
    this.store
      .select(ProductsSelectors.recommendedProducts)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }
}
