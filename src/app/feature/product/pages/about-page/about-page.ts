import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductsSelectors } from '../../../../core/ngxs/products/products.selectors';
import { GetProductById } from '../../../../core/ngxs/products/products.actions';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AboutSlider } from "../../components/about-slider/about-slider";
import { MatIcon } from "@angular/material/icon";
import { Product } from '../../../../shared/entities/interfaces/product.interface';
import { AppRoutesConfig } from '../../../../app.routes-config';


@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [AboutSlider, MatIcon,],
  templateUrl: './about-page.html',
  styleUrl: './about-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {

  private store = inject(Store);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  readonly AppRoutesConfig = AppRoutesConfig;

  product = this.store.selectSignal(ProductsSelectors.currentProduct);

  relatedProducts: Product[] = [];

  constructor() {

    effect(() => {
      const current = this.product();

      if (!current) return;

      this.relatedProducts = [
        current,
        ...(current.relatedProducts ?? [])
      ];

      this.cdr.detectChanges();
    });

  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.store.dispatch(new GetProductById(id));
    }
  }

  goToProduct(id: string) {
    this.router.navigate([AppRoutesConfig.Product, id]);

    this.store.dispatch(new GetProductById(id));
  }
}
