import { State, Action, StateContext, NgxsOnInit } from '@ngxs/store';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BasketStateModel } from './basket.model';
import { GetCart, UpdateCart, RemoveFromCart, ClearCart } from './basket.actions';
import { ApiResponse } from '../../entities/interfaces/api-response.interface';

@State<BasketStateModel>({
  name: 'basket',
  defaults: {
    items: [],
    total: 0,
    totalItems: 0,
  },
})
@Injectable()
export class BasketState implements NgxsOnInit {
  private http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/api';

  ngxsOnInit(ctx: StateContext<BasketStateModel>) {
    ctx.dispatch(new GetCart());
  }

  @Action(GetCart)
  getCart(ctx: StateContext<BasketStateModel>) {
    return this.http.get<ApiResponse<BasketStateModel>>(`${this.apiUrl}/orders/cart`).pipe(
      tap((res) => {
        if (res.success) {
          ctx.patchState(res.data);
        }
      }),
    );
  }

  @Action(UpdateCart)
  updateCart(ctx: StateContext<BasketStateModel>, action: UpdateCart) {
    return this.http
      .post<ApiResponse<BasketStateModel>>(`${this.apiUrl}/orders/cart`, {
        productId: action.productId,
        quantity: action.quantity,
      })
      .pipe(tap((res) => ctx.setState(res.data)));
  }

  @Action(RemoveFromCart)
  removeFromBasket(ctx: StateContext<BasketStateModel>, action: RemoveFromCart) {
    return this.http
      .delete<ApiResponse<BasketStateModel>>(`${this.apiUrl}/orders/cart/${action.productId}`)
      .pipe(tap((res) => ctx.setState(res.data)));
  }

  @Action(ClearCart)
  clearCart(ctx: StateContext<BasketStateModel>) {
    return this.http
      .delete<ApiResponse<BasketStateModel>>(`${this.apiUrl}/orders/cart`)
      .pipe(tap(() => ctx.setState({ items: [], total: 0, totalItems: 0 })));
  }
}
