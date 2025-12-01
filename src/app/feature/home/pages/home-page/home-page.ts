import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '../../../../shared/entities/interfaces/product.interface';
import { Card } from '../../../../shared/components/card/card';
import { Slider } from "../../../../shared/components/slider/slider";
import { homeSliderItems } from '../../../../core/mock-data/home-slider';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [Card, Slider],
})
export class HomePage {
  sliderImages = homeSliderItems;
  
  products: Product[] = [
    { id: 1, title: 'iPhone 17 pro max 256GB', price: 66999, image: '/assets/images/product-card/iphone17promax256gb.webp' },
  ];

  addToCart(productId: number) {
    console.log('Added product:', productId);
  }
}
