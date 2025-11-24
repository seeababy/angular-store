import { AfterViewInit, ChangeDetectionStrategy, Component, input } from '@angular/core';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Slider implements AfterViewInit {
  items = input<any[]>();

  ngAfterViewInit(): void {
    new Splide( '.splide' ).mount();
  }
}
