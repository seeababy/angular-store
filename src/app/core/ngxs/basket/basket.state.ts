import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { AddToBasket } from "./basket.actions";
import { BasketItem } from "./basket.model";

@State<BasketItem[]>({
  name: 'BASKET_STATE',
  defaults: []
})
@Injectable()
export class BasketState {

    @Action(AddToBasket)
    addToState(ctx: StateContext<BasketItem[]>, action: AddToBasket) {
        // ctx.setState([...ctx.getState(), action.id]);
        const state = ctx.getState();

        const exists = state.find(item => item.id === action.id);

        if (!exists) {
          ctx.setState([...state, { id: action.id, quantity: 1 }]);
        }
    }
}