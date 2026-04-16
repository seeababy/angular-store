import { IOrder } from "../../../feature/make-orders/entities/interfaces/order.interface";

export interface OrdersStateModel {
  orders: IOrder[];
  loading: boolean;
}
