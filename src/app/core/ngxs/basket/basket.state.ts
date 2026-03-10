import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { BasketStateModel } from './basket.model';
import { AddToBasket } from './basket.actions';

@State<BasketStateModel>({
  name: 'basket',
  defaults: {
    basketProducts: [],
    basketInfo:{}
  }
})
@Injectable()
export class BasketState {

  // @Action(AddToBasket)
  // add(ctx: StateContext<BasketStateModel>, action: AddToBasket) {
  //   const state = ctx.getState();
  //   const exists = state.find(item => item.id === action.id);

  //   if (!exists) {
  //     ctx.setState([...state, { id: action.id, quantity: 1 }]);
  //   }
  // }

  // @Action(UpdateQuantity)
  // update(ctx: StateContext<BasketStateModel>, action: UpdateQuantity) {
  //   const state = ctx.getState();
  //   ctx.setState(state.map(item => 
  //     item.id === action.id ? { ...item, quantity: action.quantity } : item
  //   ));
  // }

  // @Action(RemoveFromBasket)
  // remove(ctx: StateContext<BasketStateModel>, action: RemoveFromBasket) {
  //   const state = ctx.getState();
  //   ctx.setState(state.filter(item => item.id !== action.id));
  // }
}




