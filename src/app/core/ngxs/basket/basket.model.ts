import { BasketInfo } from "../../../feature/basket/entities/basket-info.interface";
import { BasketProduct } from "../../../feature/basket/entities/basket-product.interface";

export interface BasketStateModel {
    basketProducts: BasketProduct[];
    basketInfo: BasketInfo;
}