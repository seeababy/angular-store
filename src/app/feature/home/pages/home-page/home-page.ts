import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Product } from '../../../../shared/entities/interfaces/product.interface';
import { Card } from '../../../../shared/components/card/card';
import { Slider } from '../../../../shared/components/slider/slider';
import { homeSliderItems } from '../../../../core/mock-data/home-slider';
import { SetProducts } from '../../../../core/ngxs/products/products.actions';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [Card, Slider],
})
export class HomePage implements OnInit {

  private store = inject(Store);

  sliderImages = homeSliderItems;

  products: Product[] = [
    {
      id: 1,
      title: 'iPhone 17 pro max 256GB',
      price: 66999,
      image: '/assets/images/product-card/iphone17promax256gb.webp'
    },
    {
      id: 2,
      title: 'iPhone 16 pro max 256GB',
      price: 53649,
      image: '/assets/images/product-card/iphone17promax256gb.webp'
    },
    {
      id: 3,
      title: 'iPhone 15 pro max 256GB',
      price: 42749,
      image: '/assets/images/product-card/iphone17promax256gb.webp'
    },
  ];

  ngOnInit(): void {
    this.store.dispatch(new SetProducts(this.products));
  }
}


