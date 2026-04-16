import { Selector } from "@ngxs/store";
import { OrdersStateModel } from "./orders.model";
import { IOrder } from "../../../feature/make-orders/entities/interfaces/order.interface";
import { OrdersState } from "./orders.state";

export class OrdersSelectors {
  @Selector([OrdersState])
  static orders(state: OrdersStateModel): IOrder[] {
    return state.orders;
  }

  @Selector([OrdersState])
  static loading(state: OrdersStateModel): boolean {
    return state.loading;
  }
}
