import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserSelectors } from '../../../../core/ngxs/user/user.selectors';
import { AppRoutesConfig } from '../../../../app.routes-config';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ReviewsDialog } from '../../components/reviews-dialog/reviews-dialog';
import { ReviewsItem } from '../../components/reviews-item/reviews-item';
import { ProductsSelectors } from '../../../../core/ngxs/products/products.selectors';
import { GetProductById, AddReview } from '../../../../core/ngxs/products/products.actions';
import { ReviewsStatistic } from '../../components/reviews-statistic/reviews-statistic';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-reviews-page',
  templateUrl: './reviews-page.html',
  styleUrl: './reviews-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReviewsDialog, ReviewsItem, ReviewsStatistic],
})
export class ReviewsPage implements OnInit {
  private dialog = inject(MatDialog);
  private store = inject(Store);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  isAuthorized = this.store.selectSignal(UserSelectors.isAuthorized);
  reviews = this.store.selectSignal(ProductsSelectors.currentProductReviews);
  currentProduct = this.store.selectSignal(ProductsSelectors.currentProduct);

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.store.dispatch(new GetProductById(id));
    }
  }

  openDialog(): void {
    if (!this.isAuthorized()) {
      this.router.navigate([AppRoutesConfig.Login]);
      return;
    }

    this.dialog
      .open(ReviewsDialog, {
        width: '500px',
        panelClass: 'review-dialog',
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((formValue) => {
        const productId = this.currentProduct()?.id;

        if (!productId || !formValue) return;

        this.store.dispatch(new AddReview(productId, formValue));
      });
  }

  getSortedReviews() {
    return [...this.reviews()].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }
}
