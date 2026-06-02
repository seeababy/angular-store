import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ProductsSelectors } from '../../../../core/ngxs/products/products.selectors';
import { Store } from '@ngxs/store';
import { Card } from '../../../../shared/components/card/card';
import {
  GetProducts,
  LoadFilters,
  ResetFilters,
  UpdateFilters,
} from '../../../../core/ngxs/products/products.actions';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Breadcrumbs } from '../../../../shared/components/breadcrumbs/breadcrumbs';
import { Paginator } from '../../../../shared/components/paginator/paginator';
import { ProductsPageSkeleton } from '../../components/products-page-skeleton/products-page-skeleton';
import {
  AppliedFilter,
  ProductFilter,
} from '../../../../shared/entities/interfaces/product-filter.interface';
import { ProductFilters } from '../../../../shared/entities/interfaces/product-filters.interface';
@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    Card,
    FormsModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    Breadcrumbs,
    Paginator,
    ProductsPageSkeleton,
  ],
})
export class ProductsPage implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  products = this.store.selectSignal(ProductsSelectors.products);
  pagination = this.store.selectSignal(ProductsSelectors.pagination);
  loading = this.store.selectSignal(ProductsSelectors.loading);
  availableFilters = this.store.selectSignal(ProductsSelectors.availableFilters);

  appliedFilters: AppliedFilter[] = [];
  cardsPerRow = 3;
  sortValue = 'price_asc';
  sortOptions = [
    { value: 'price_asc', label: 'Від дешевих до дорогих' },
    { value: 'price_desc', label: 'Від дорогих до дешевих' },
    { value: 'rating_desc', label: 'За рейтингом' },
    { value: 'views_desc', label: 'За популярністю' },
    { value: 'newest', label: 'Новинки' },
    { value: 'oldest', label: 'Спочатку старі' },
  ];

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const category = params.get('category');

      this.appliedFilters = [];

      if (!category) {
        this.store.dispatch([new ResetFilters(), new GetProducts()]);

        return;
      }

      this.store.dispatch([
        new ResetFilters(),
        new UpdateFilters({
          categories: [category],
        }),
        new LoadFilters([category]),
      ]);
    });
  }

  getFilter(field: string) {
    return this.appliedFilters.find((filter) => filter.field === field);
  }

  getRangeValue(filter: ProductFilter, index: 0 | 1): number {
    const applied = this.getFilter(filter.field);

    if (applied) {
      return (applied.value as [number, number])[index];
    }

    if (filter.type === 'range') {
      return index === 0 ? filter.minV : filter.maxV;
    }

    return 0;
  }

  updateRangeFilter(field: string, index: number, value: number) {
    const existingFilter = this.getFilter(field);

    if (!existingFilter) {
      const rangeFilter = this.availableFilters().find(
        (f) => f.field === field && f.type === 'range',
      );

      if (!rangeFilter || rangeFilter.type !== 'range') {
        return;
      }

      const rangeValue: [number, number] = [rangeFilter.minV, rangeFilter.maxV];

      rangeValue[index] = value;

      this.appliedFilters.push({
        field,

        value: rangeValue,
      });

      this.applyFilters();

      return;
    }

    const currentValue: [number, number] = [...(existingFilter.value as [number, number])];

    currentValue[index] = value;

    existingFilter.value = currentValue;

    this.applyFilters();
  }

  toggleValue(field: string, value: string) {
    const existingFilter = this.getFilter(field);
    if (!existingFilter) {
      this.appliedFilters.push({ field, value: [value] });
      this.applyFilters();
      return;
    }
    const values = [...(existingFilter.value as string[])];
    const exists = values.includes(value);
    existingFilter.value = exists ? values.filter((v) => v !== value) : [...values, value];
    this.applyFilters();
  }

  isSelected(field: string, value: string): boolean {
    const filter = this.getFilter(field);
    if (!filter) {
      return false;
    }
    return (filter.value as string[]).includes(value);
  }

  applyFilters() {
    const result: Partial<ProductFilters> = { sortBy: this.sortValue, page: 1 };
    const category = this.route.snapshot.paramMap.get('category');

    if (category) {
      result.categories = [category];
    }

    this.appliedFilters.forEach((filter) => {
      if (filter.field === 'price') {
        const [min, max] = filter.value as [number, number];
        result.minPrice = min;
        result.maxPrice = max;
      } else if (filter.field === 'averageRating') {
        result.minRating = (filter.value as number[])[0];
      } else if (filter.field === 'color') {
        result.color = (filter.value as string[])[0];
      } else if (filter.field.startsWith('char:')) {
        const charTitle = filter.field.slice(5);
        result.charFilters ??= [];
        (filter.value as string[]).forEach((v) => {
          result.charFilters?.push(`${charTitle}:${v}`);
        })
      }
    });
    this.store.dispatch(new UpdateFilters(result));
  }

  setPage(page: number) {
    if (page < 1 || page > this.pagination().totalPages) {
      return;
    }
    this.store.dispatch(new UpdateFilters({ page }));
  }
}
