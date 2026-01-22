import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Product } from '../../../../shared/entities/interfaces/product.interface';
import { Card } from '../../../../shared/components/card/card';
import { Slider } from '../../../../shared/components/slider/slider';
import { homeSliderItems } from '../../../../core/mock-data/home-slider';
import { SetProducts } from '../../../../core/ngxs/products/products.actions';
import { HomeSideMenu } from "../../components/side-menu/home-side-menu";
import { ProductsSelectors } from '../../../../core/ngxs/products/products.selectors';

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

  sliderImages = homeSliderItems;

  products = this.store.selectSignal<Product[]>(ProductsSelectors.products);

  ngOnInit(): void {
  }
}


