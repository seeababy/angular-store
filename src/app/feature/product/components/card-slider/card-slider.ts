import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ChangeDetectorRef,
  DestroyRef,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductsSelectors } from '../../../../core/ngxs/products/products.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import Splide from '@splidejs/splide';
import { Card } from '../../../../shared/components/card/card';
import { Product } from '../../../../shared/entities/interfaces/product.interface';

@Component({
  selector: 'app-card-slider',
  standalone: true,
  imports: [Card],
  templateUrl: './card-slider.html',
  styleUrl: './card-slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSlider implements OnInit {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  private slider!: Splide;

  viewedProducts: Product[] = [];

  ngOnInit(): void {
    this.store
      .select(ProductsSelectors.viewedProducts)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((items) => {
        this.viewedProducts = items;
        this.cdr.detectChanges();

        if (this.slider) {
          this.slider.destroy();
        }

        if (this.viewedProducts.length) {
          this.slider = new Splide('#viewed-slider', {
            perPage: 5,
            gap: 10,
            arrows: true,
            pagination: false,
            breakpoints: {
              1024: { perPage: 3 },
              768: { perPage: 2 },
              480: { perPage: 1 },
            },
          });
          this.slider.mount();
        }
      });
  }
}
