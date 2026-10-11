import { inject, Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext, Store } from '@ngxs/store';
import { HttpClient, HttpParams } from '@angular/common/http';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { isEmpty, isEqual } from 'lodash';

import { ProductsStateModel } from './products.model';

import {
  AddRecentlyProducts,
  AddReview,
  GetHomeProducts,
  GetProductById,
  GetProducts,
  GetRecommendedProducts,
  GetViewedProducts,
} from './products.actions';

import { ApiResponse } from '../../entities/interfaces/api-response.interface';
import { Product } from '../../../shared/entities/interfaces/product.interface';
import { Review } from '../../../shared/entities/interfaces/review-interface';
import { ProductsResponse } from '../../../shared/entities/interfaces/products-response.interface';

import { ProductFiltersSelectors } from '../product-filters/product-filters.selectors';

@State<ProductsStateModel>({
  name: 'products',

  defaults: {
    homeProducts: [],
    products: [],
    pagination: {
      page: 1,
      totalPages: 1,
    },
    recommendedProducts: [],
    currentProduct: null,
    viewedProducts: [],
    loading: false,
  },
})
@Injectable()
export class ProductsState implements NgxsOnInit {
  private http = inject(HttpClient);
  private store = inject(Store);

  apiUrl = 'http://localhost:3000/api';

  ngxsOnInit(ctx: StateContext<ProductsStateModel>) {
    this.store
      .select(ProductFiltersSelectors.selectedFilters)
      .pipe(
        filter((filters) => !isEmpty(filters)),
        distinctUntilChanged((prev, curr) => isEqual(prev, curr)),
      )
      .subscribe(() => {
        this.store.dispatch(new GetProducts());
      });
  }

  @Action(GetProducts)
  getProducts(ctx: StateContext<ProductsStateModel>) {
    ctx.patchState({
      loading: true,
    });

    const filters = this.store.selectSnapshot(ProductFiltersSelectors.selectedFilters);

    const availableFilters = this.store.selectSnapshot(ProductFiltersSelectors.availableFilters);

    let params = new HttpParams();

    if (filters.category) {
      params = params.set('category', filters.category);
    }

    if (filters.page != null) {
      params = params.set('page', filters.page);
    }

    if (filters.sortBy) {
      params = params.set('sortBy', filters.sortBy);
    }

    const appliedFilters = filters.appliedFilters ?? {};

    Object.entries(appliedFilters).forEach(([field, value]) => {
      if (value == null) {
        return;
      }

      const filter = availableFilters.find((item) => item.field === field);

      if (!filter) {
        return;
      }

      if (filter.type === 'range') {
        const [min, max] = value as [number | undefined, number | undefined];

        if (min != null) {
          params = params.set(`${filter.field}[min]`, String(min));
        }

        if (max != null) {
          params = params.set(`${filter.field}[max]`, String(max));
        }

        return;
      }

      const values = value as string[];

      values.forEach((item) => {
        if (!item) {
          return;
        }

        params = params.append(filter.field, item);
      });
    });

    return this.http.get<ApiResponse<ProductsResponse>>(`${this.apiUrl}/products`, { params }).pipe(
      tap((res) => {
        if (res.success) {
          ctx.patchState({
            products: res.data.products,

            pagination: {
              page: res.data.page,
              totalPages: res.data.totalPages,
            },

            loading: false,
          });
        } else {
          ctx.patchState({
            loading: false,
          });
        }
      }),
    );
  }

  @Action(GetHomeProducts)
  getHomeProducts(ctx: StateContext<ProductsStateModel>) {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/products/home`).pipe(
      tap((res: ApiResponse<Product[]>) => {
        if (res.success) {
          ctx.patchState({
            homeProducts: res.data,
          });
        }
      }),
    );
  }

  @Action(GetRecommendedProducts)
  getRecommendedProducts(ctx: StateContext<ProductsStateModel>) {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/products/recommended`).pipe(
      tap((res: ApiResponse<Product[]>) => {
        if (res.success) {
          ctx.patchState({
            recommendedProducts: res.data,
          });
        }
      }),
    );
  }

  @Action(GetProductById)
  getProductById(ctx: StateContext<ProductsStateModel>, action: GetProductById) {
    return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/products/${action.id}`).pipe(
      tap((res: ApiResponse<Product>) => {
        if (res.success) {
          ctx.patchState({
            currentProduct: res.data,
          });
        }
      }),
    );
  }

  @Action(AddReview)
  addReview(ctx: StateContext<ProductsStateModel>, action: AddReview) {
    return this.http
      .post<
        ApiResponse<Review>
      >(`${this.apiUrl}/products/${action.productId}/reviews`, action.review)
      .pipe(
        tap((res: ApiResponse<Review>) => {
          const state = ctx.getState();

          if (!res.success || !state.currentProduct) {
            return;
          }

          ctx.patchState({
            currentProduct: {
              ...state.currentProduct,

              reviews: [...(state.currentProduct.reviews ?? []), res.data],
            },
          });
        }),
      );
  }

  @Action(GetViewedProducts)
  getViewedProducts(ctx: StateContext<ProductsStateModel>) {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/products/recently-viewed`).pipe(
      tap((res) => {
        if (res.success) {
          ctx.patchState({
            viewedProducts: res.data,
          });
        }
      }),
    );
  }

  @Action(AddRecentlyProducts)
  addRecentlyProducts(ctx: StateContext<ProductsStateModel>) {
    const currentProduct = ctx.getState().currentProduct;

    if (!currentProduct) {
      return;
    }

    const viewedProducts = ctx
      .getState()
      .viewedProducts.slice(0, 18)
      .filter((item) => item.id !== currentProduct.id);

    ctx.patchState({
      viewedProducts: [currentProduct, ...viewedProducts],
    });
  }
}
