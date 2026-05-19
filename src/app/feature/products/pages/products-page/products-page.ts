import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ProductsSelectors } from '../../../../core/ngxs/products/products.selectors';
import { Store } from '@ngxs/store';
import { Card } from '../../../../shared/components/card/card';
import { GetProducts, UpdateFilters } from '../../../../core/ngxs/products/products.actions';
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
  ],
})
export class ProductsPage implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  products = this.store.selectSignal(ProductsSelectors.products);
  pagination = this.store.selectSignal(ProductsSelectors.pagination);

  cardsPerRow = 3;
  sortValue = 'price_asc';

  filters = [
    {
      type: 'slider',
      key: 'price',
      min: 99,
      max: 200000,
      value: 99,
      secondValue: 200000,
    },
    {
      type: 'slider',
      key: 'rating',
      min: 1,
      max: 5,
      value: 1,
    },
    {
      type: 'multiselect',
      key: 'color',
      items: [
        { label: 'Чорний', cssColor: '#000000', checked: false },
        { label: 'Білий', cssColor: '#FFFFFF', checked: false },
        { label: 'Синій', cssColor: '#0000FF', checked: false },
        { label: 'Червоний', cssColor: '#FF0000', checked: false },
        { label: 'Зелений', cssColor: '#008000', checked: false },
      ],
    },
  ];

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

      if (!category) {
        this.store.dispatch(new GetProducts());
        return;
      }

      this.store.dispatch(
        new UpdateFilters({
          categories: [category],
        }),
      );
    });
  }

  selectColor(selected: any) {
    const colorFilter = this.filters.find((f) => f.key === 'color');
    if (!colorFilter?.items) return;

    colorFilter.items.forEach((item: any) => {
      item.checked = false;
    });

    selected.checked = true;

    this.applyFilters();
  }

  applyFilters() {
    const result: any = {};

    if (this.sortValue) {
      result.sortBy = this.sortValue;
    }

    this.filters.forEach((filter: any) => {
      if (filter.type === 'slider') {
        if (filter.key === 'price') {
          result.minPrice = filter.value;
          result.maxPrice = filter.secondValue;
        }

        if (filter.key === 'rating') {
          result.minRating = filter.value;
        }
      }

      if (filter.type === 'multiselect') {
        const selected = filter.items?.find((i: any) => i.checked);

        if (selected) {
          result.color = selected.cssColor;
        }
      }

      if (filter.type === 'select') {
        if (filter.key === 'sortBy') {
          result.sortBy = filter.value;
        }
      }
    });

    this.store.dispatch(new UpdateFilters(result));
  }

  setPage(page: number) {
    if (page < 1 || page > this.pagination().totalPages) return;

    this.store.dispatch(
      new UpdateFilters({
        page,
      }),
    );
  }
}
