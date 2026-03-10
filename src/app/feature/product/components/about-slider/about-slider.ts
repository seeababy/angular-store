import { AfterViewInit, ChangeDetectionStrategy, Component, input, OnDestroy, SimpleChanges } from '@angular/core';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-about-slider',
  standalone: true,
  imports: [],
  templateUrl: './about-slider.html',
  styleUrl: './about-slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutSlider implements AfterViewInit, OnDestroy { 
  images = input<string[]>();

  readonly cdnUrl = 'http://localhost:3000/uploads/products/';

  private mainSlider!: Splide;
  private thumbSlider!: Splide;

  ngAfterViewInit(): void {
    this.mainSlider = new Splide('#main-slider', {
      type: 'fade',
      rewind: true,
      pagination: false,
      arrows: true,
    });

    this.thumbSlider = new Splide('#thumb-slider', {
      fixedWidth: 80,
      fixedHeight: 80,
      gap: 10,
      rewind: true,
      pagination: false,
      isNavigation: true,
      arrows: false,
      focus: 'center',
    });

    this.mainSlider.sync(this.thumbSlider);

    this.mainSlider.mount();
    this.thumbSlider.mount();    
  }

  ngOnDestroy(): void {
    if (this.mainSlider) {
      this.mainSlider.destroy();
    }
    if (this.thumbSlider) {
      this.thumbSlider.destroy();
    }
  }
}
