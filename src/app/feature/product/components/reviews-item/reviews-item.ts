import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { Review } from '../../../../shared/entities/interfaces/review-interface';

@Component({
  selector: 'app-reviews-item',
  templateUrl: './reviews-item.html',
  styleUrl: './reviews-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatIconModule, DatePipe],
})
export class ReviewsItem {
  review = input.required<Review>();
  stars = [0, 1, 2, 3, 4];
}
