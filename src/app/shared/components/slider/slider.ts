import { AfterViewInit, ChangeDetectionStrategy, Component, input, OnDestroy } from '@angular/core';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class Slider implements AfterViewInit, OnDestroy {
  items = input<string[]>();

  private slider!: Splide;

  ngAfterViewInit(): void {
    this.slider =new Splide( '#custom-slider', {
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

  ngOnDestroy(): void {
    if (this.slider) {
      this.slider.destroy();
    }
  }
}


