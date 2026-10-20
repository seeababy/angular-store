import { ApiTextPipe } from '../../../../shared/pipes/api-text.pipe';
import { TranslateModule } from '@ngx-translate/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  OnInit,
} from '@angular/core';

import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';

import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { KeyValuePipe } from '@angular/common';

import { ProductsSelectors } from '../../../../core/ngxs/products/products.selectors';

import {
  LoadFilters,
  ResetFilters,
  SetCategory,
  UpdateFilters,
} from '../../../../core/ngxs/product-filters/product-filters.actions';

import { ProductFiltersSelectors } from '../../../../core/ngxs/product-filters/product-filters.selectors';

import { CategoriesSelectors } from '../../../../core/ngxs/categories/categories.selectors';

import { Card } from '../../../../shared/components/card/card';
import { Breadcrumbs } from '../../../../shared/components/breadcrumbs/breadcrumbs';
import { Paginator } from '../../../../shared/components/paginator/paginator';
import { ProductsPageSkeleton } from '../../components/products-page-skeleton/products-page-skeleton';
import { RangeFilterComponent } from '../../components/range-filter/range-filter';
import { SelectFilterComponent } from '../../components/select-filter/select-filter';
import { MultiselectFilterComponent } from '../../components/multiselect-filter/multiselect-filter';

import { Category } from '../../../../shared/entities/interfaces/category.interface';

import {
  AppliedFilters,
  ProductFilter,
} from '../../../../shared/entities/interfaces/product-filter.interface';
import { values } from 'lodash';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ApiTextPipe, TranslateModule,
    Card,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    Breadcrumbs,
    Paginator,
    ProductsPageSkeleton,
    RangeFilterComponent,
    SelectFilterComponent,
    MultiselectFilterComponent,
    KeyValuePipe,
  ],
})
export class ProductsPage implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  products = this.store.selectSignal(ProductsSelectors.products);

  pagination = this.store.selectSignal(ProductsSelectors.pagination);

  loading = this.store.selectSignal(ProductsSelectors.loading);

  availableFilters = this.store.selectSignal(ProductFiltersSelectors.availableFilters);

  selectedFilters = this.store.selectSignal(ProductFiltersSelectors.selectedFilters);

  categories = this.store.selectSignal(CategoriesSelectors.categories);

  currentCategory?: Category;

  filtersForm!: FormGroup;

  private builtFromFilters?: ProductFilter[];

  cardsPerRow = 3;

  sortValue = 'price_asc';

  sortOptions = [
    {
      value: 'price_asc',
      label: 'products.sort.priceAsc',
    },
    {
      value: 'price_desc',
      label: 'products.sort.priceDesc',
    },
    {
      value: 'rating_desc',
      label: 'products.sort.rating',
    },
    {
      value: 'views_desc',
      label: 'products.sort.popularity',
    },
    {
      value: 'newest',
      label: 'products.sort.newest',
    },
    {
      value: 'oldest',
      label: 'products.sort.oldest',
    },
  ];

  constructor() {
    effect(() => {
      const filters = this.availableFilters();

      if (filters.length && this.shouldBuildFiltersForm(filters)) {
        this.buildFiltersForm(filters);
        this.cdr.detectChanges();
      }
    });

    effect(() => {
      const categories = this.categories();
      const categorySlug = this.route.snapshot.paramMap.get('category');

      if (!categories.length || !categorySlug) return;

      this.currentCategory = categories.find((category) => category.slug === categorySlug);
    });
  }

  ngOnInit() {
    const category = this.route.snapshot.paramMap.get('category');

    if (!category) {
      return;
    }

    this.store.dispatch(new LoadFilters(category));

    this.store.dispatch(
      new UpdateFilters({
        category,
        page: 1,
      }),
    );
  }

  selectSubCategory(category: Category) {
    this.store.dispatch(new SetCategory(category, true));
  }

  getAppliedFilters(): AppliedFilters {
    return this.selectedFilters().appliedFilters ?? {};
  }

  hasAppliedFilters(): boolean {
    return Object.values(this.getAppliedFilters()).some((value) => {
      if (Array.isArray(value)) {
        return value.some((item) => item !== null && item != '');
      }

      return value !== null && value !== '';
    });
  }

  clearFilters() {
    this.availableFilters().forEach((filter) => {
      const formGroup = this.filtersForm.get(filter.field);

      if (!formGroup) return;

      if (filter.type === 'range') {
        formGroup.get('min')?.setValue(filter.minV, { emitEvent: false });
        formGroup.get('max')?.setValue(filter.maxV, { emitEvent: false });
      } else {
        const formArray = formGroup.get('values') as FormArray;

        formArray.controls.forEach((control) => {
          control.get('checked')?.setValue(false, { emitEvent: false });
        });
      }
    });
    this.store.dispatch(new ResetFilters());
  }

  getFilterValue(field: string) {
    return this.getAppliedFilters()[field];
  }

  getFilter(field: string): ProductFilter | undefined {
    return this.availableFilters().find((item) => item.field === field);
  }

  getGroup(field: string): FormGroup {
    return this.filtersForm.get(field) as FormGroup;
  }

  isSelected(field: string, value: string): boolean {
    const currentValue = this.getFilterValue(field);

    if (!Array.isArray(currentValue)) {
      return false;
    }

    return (currentValue as string[]).includes(value);
  }

  updateSort(value: string) {
    this.sortValue = value;

    this.store.dispatch(
      new UpdateFilters({
        sortBy: value,
        page: 1,
      }),
    );
  }

  setPage(page: number) {
    if (page < 1 || page > this.pagination().totalPages) {
      return;
    }

    this.store.dispatch(
      new UpdateFilters({
        page,
      }),
    );
  }

  private shouldBuildFiltersForm(filters: ProductFilter[]): boolean {
    return this.builtFromFilters !== filters;
  }

  private getInitialRangeValue(filter: ProductFilter, index: 0 | 1): number {
    if (filter.type !== 'range') {
      return 0;
    }

    const applied = this.getFilterValue(filter.field);

    if (Array.isArray(applied) && applied.length === 2) {
      return Number(applied[index]);
    }

    return index === 0 ? filter.minV : filter.maxV;
  }

  private buildFiltersForm(filters: ProductFilter[]) {
    this.builtFromFilters = filters;
    this.filtersForm = new FormGroup({});

    filters.forEach((filter) => {
      if (filter.type === 'range') {
        const minControl = new FormControl(this.getInitialRangeValue(filter, 0));

        const maxControl = new FormControl(this.getInitialRangeValue(filter, 1));

        this.filtersForm.addControl(
          filter.field,
          new FormGroup({
            type: new FormControl(filter.type),
            min: minControl,
            max: maxControl,
          }),
        );

        return;
      }

      this.filtersForm.addControl(
        filter.field,
        new FormGroup({
          type: new FormControl(filter.type),
          values: new FormArray(
            filter.values.map(
              (value) =>
                new FormGroup({
                  checked: new FormControl(this.isSelected(filter.field, value)),
                  value: new FormControl(value),
                }),
            ),
          ),
        }),
      );
    });
  }
}
