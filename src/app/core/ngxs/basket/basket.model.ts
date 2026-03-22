import { BasketProduct } from "../../../feature/basket/entities/basket-product.interface";

export interface BasketStateModel {
  items: BasketProduct[];
  total: number;
  totalItems: number;
}
