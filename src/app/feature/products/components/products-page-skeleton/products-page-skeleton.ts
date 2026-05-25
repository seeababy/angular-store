import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Skeleton } from "../../../../shared/components/skeleton/skeleton";

@Component({
  selector: 'app-products-page-skeleton',
  standalone: true,
  imports: [Skeleton],
  templateUrl: './products-page-skeleton.html',
  styleUrl: './products-page-skeleton.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPageSkeleton {
  cards = Array(6).fill(0);
  checkboxes = Array(5).fill(0);
}
