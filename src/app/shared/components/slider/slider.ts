import { AfterViewInit, ChangeDetectionStrategy, Component, input } from '@angular/core';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class Slider implements AfterViewInit {
  items = input<string[]>();

  ngAfterViewInit(): void {
    new Splide( '.splide', {
      type: 'loop',
      perPage: 3,
      perMove: 1,
      gap: '10px',
      autoplay: true,
      interval: 10000,
      arrows: true,
      pagination: false,
      speed: 900,

      breakpoints: {
        768: {
          perPage: 2,
          arrows: false,
          gap: '8px',
        },

        480: {
          perPage: 2,
          arrows: false,
          gap: '6px',
        },
      },
    }).mount();
  }
}
