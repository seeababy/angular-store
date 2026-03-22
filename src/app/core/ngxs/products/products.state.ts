import { inject, Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { ProductsStateModel } from './products.model';
import {
  AddRecentlyProducts,
  AddReview,
  GetHomeProducts,
  GetProductById,
  GetProducts,
  GetRecommendedProducts,
  GetViewedProducts,
  SetProducts,
} from './products.actions';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { ApiResponse } from '../../entities/interfaces/api-response.interface';
import { Product } from '../../../shared/entities/interfaces/product.interface';
import { Review } from '../../../shared/entities/interfaces/review-interface';

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    homeProducts: [],
    products: [],
    recomendedProducts: [],
    currentProduct: null,
    viewedProducts: [],
  },
})
@Injectable()
export class ProductsState implements NgxsOnInit {
  private http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/api';

  ngxsOnInit(ctx: StateContext<ProductsStateModel>) {
    ctx.dispatch(new GetProducts());
  }

  @Action(GetProducts)
  getProducts(ctx: StateContext<ProductsStateModel>) {
    return this.http
      .get<any[]>(`${this.apiUrl}/products`)
      .pipe(map((products: any[]) => ctx.dispatch(new SetProducts(products[0]))));
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

  @Action(SetProducts)
  setProducts(ctx: StateContext<ProductsStateModel>, action: SetProducts) {
    // ctx.setState({
    //   products: action.products
    // });
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
}
