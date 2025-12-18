import { Selector } from "@ngxs/store";
import { BasketState } from "./basket.state";
import { BasketItem } from "./basket.model";

export class BasketSelectors {
    @Selector([BasketState])
    static basketItems(state: BasketItem[]): BasketItem[] {
        return state;
    }

    @Selector([BasketState])
    static totalCount(state: BasketItem[]): number {
        return state.reduce((sum, item) => sum + item.quantity, 0);
    }
}