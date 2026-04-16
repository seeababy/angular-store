import { ICreateOrder } from "../../../feature/make-orders/entities/interfaces/create-order.interface";
import { IMakeOrderForm } from "../../../feature/make-orders/entities/interfaces/make-order-form.interface";

export class GetOrders {
  static readonly type = '[Orders] Get Orders';
}

export class CreateOrder {
  static readonly type = '[Orders] Create Order';
  constructor(public payload: IMakeOrderForm) {}
}
