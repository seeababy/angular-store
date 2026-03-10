import { ChangeDetectionStrategy, Component, input, signal, effect } from '@angular/core';
import { Review } from '../../../../shared/entities/interfaces/review-interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reviews-statistic',
  templateUrl: './reviews-statistic.html',
  styleUrls: ['./reviews-statistic.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class ReviewsStatistic {
  reviews = input<Review[]>();

  ratings = [5, 4, 3, 2,1];

  getTotal(): number {
    return this.reviews()?.length ?? 0;
  }

  getCount(stars: number): number {
    return this.reviews()?.filter((r) => r.rating === stars).length ?? 0;
  }

  getPercentage(stars: number): number {
    const total = this.getTotal();
    if (!total) return 0; 

    return (this.getCount(stars) / total) * 100;
  }
}
