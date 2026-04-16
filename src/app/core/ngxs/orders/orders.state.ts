import { Action, State, StateContext, Store } from '@ngxs/store';
import { OrdersStateModel } from './orders.model';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateOrder, GetOrders } from './orders.actions';
import { ApiResponse } from '../../entities/interfaces/api-response.interface';
import { IOrder } from '../../../feature/make-orders/entities/interfaces/order.interface';
import { tap } from 'rxjs';
import { ICreateOrder } from '../../../feature/make-orders/entities/interfaces/create-order.interface';
import { UserSelectors } from '../user/user.selectors';

@State<OrdersStateModel>({
  name: 'orders',
  defaults: {
    orders: [],
    loading: false,
  },
})
@Injectable()
export class OrdersState {
  private http = inject(HttpClient);
  private store = inject(Store);
  private apiUrl = 'http://localhost:3000/api';


  @Action(GetOrders)
  getOrders(ctx: StateContext<OrdersStateModel>) {
    ctx.patchState({ loading: true });

    return this.http.get<ApiResponse<IOrder[]>>(`${this.apiUrl}/orders`).pipe(
      tap((res) => {
        ctx.patchState({
          orders: res.data ?? [],
          loading: false,
        });
      }),
    );
  }

  @Action(CreateOrder)
  createOrder(ctx: StateContext<OrdersStateModel>, action: CreateOrder) {
    ctx.patchState({ loading: true });
    const userState = this.store.selectSnapshot(UserSelectors.user);
    const orderBody: ICreateOrder = {
      shippingAddress: {
        firstName: userState?.firstName ?? '',
        lastName: userState?.lastName ?? '',
        phone: userState?.phoneNumber ?? '',
        email: userState?.email ?? '',
        address: action.payload.address,
        city: action.payload.city,
        postalCode: action.payload.postalCode,
        country: 'Ukraine',
      },
      notes: action.payload.notes,
    };

    return this.http.post<ApiResponse<IOrder>>(`${this.apiUrl}/orders`, orderBody).pipe(
      tap((res) => {
        const state = ctx.getState();

        if (res.data) {
          ctx.patchState({
            orders: [res.data, ...state.orders],
            loading: false,
          });
        } else {
          ctx.patchState({ loading: false });
        }
      }),
    );
  }
}
