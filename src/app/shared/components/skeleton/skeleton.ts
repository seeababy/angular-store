import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skeleton {
  width = input('100%');
  height = input('20px');
  radius = input('8px');
}
