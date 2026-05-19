import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ProductsStateModel } from './products.model';
import {
  AddRecentlyProducts,
  AddReview,
  GetHomeProducts,
  GetProductById,
  GetProducts,
  GetRecommendedProducts,
  GetViewedProducts,
  UpdateFilters,
} from './products.actions';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { ApiResponse } from '../../entities/interfaces/api-response.interface';
import { Product } from '../../../shared/entities/interfaces/product.interface';
import { Review } from '../../../shared/entities/interfaces/review-interface';
import { ProductsResponse } from '../../../shared/entities/interfaces/products-response.interface';

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    homeProducts: [],
    products: [],
    pagination: {
      page: 1,
      totalPages: 1,
    },
    recomendedProducts: [],
    currentProduct: null,
    viewedProducts: [],
    filters: {
      categories: [],
    },
  },
})
@Injectable()
export class ProductsState {
  private http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/api';

  @Action(GetProducts)
  getProducts(ctx: StateContext<ProductsStateModel>) {
    const { filters } = ctx.getState();
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value == null) return;

      if (Array.isArray(value)) {
        value.forEach((item) => {
          params = params.append(key, item);
        });
        return;
      }

      params = params.set(key, value);
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
          ctx.patchState({ homeProducts: res.data });
        }
      }),
    );
  }

  @Action(GetRecommendedProducts)
  getRecommendedProducts(ctx: StateContext<ProductsStateModel>) {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/products/recommended`).pipe(
      tap((res: ApiResponse<Product[]>) => {
        if (res.success) {
          ctx.patchState({ recomendedProducts: res.data });
        }
      }),
    );
  }

  @Action(GetProductById)
  getProductById(ctx: StateContext<ProductsStateModel>, action: GetProductById) {
    return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/products/${action.id}`).pipe(
      tap((res: ApiResponse<Product>) => {
        if (res.success) {
          ctx.patchState({ currentProduct: res.data });
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

          if (!res.success || !state.currentProduct) return;

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
  AddRecentlyProducts(ctx: StateContext<ProductsStateModel>) {
    const currentProduct = ctx.getState().currentProduct as Product;
    if (currentProduct) {
      const viewedProducts = ctx
        .getState()
        .viewedProducts.slice(0, 18)
        .filter((item) => item.id !== currentProduct.id);
      ctx.patchState({ viewedProducts: [currentProduct, ...viewedProducts] });
    }
  }

  @Action(UpdateFilters)
  updateFilters(ctx: StateContext<ProductsStateModel>, action: UpdateFilters) {
    ctx.patchState({
      filters: {
        ...ctx.getState().filters,
        ...action.filters,
      },
      currentProduct: null,
    });

    return ctx.dispatch(new GetProducts());
  }
}
