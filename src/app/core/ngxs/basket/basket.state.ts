import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { BasketItem } from './basket.model';
import { AddToBasket } from './basket.actions';

export class UpdateQuantity { 
  static readonly type = '[BASKET] Update Quantity';
  constructor(public id: number, public quantity: number) {}
}

export class RemoveFromBasket { 
  static readonly type = '[BASKET] Remove From Basket';
  constructor(public id: number) {}
}

@State<BasketItem[]>({
  name: 'basket',
  defaults: []
})
@Injectable()
export class BasketState {

  @Action(AddToBasket)
  add(ctx: StateContext<BasketItem[]>, action: AddToBasket) {
    const state = ctx.getState();
    const exists = state.find(item => item.id === action.id);

    if (!exists) {
      ctx.setState([...state, { id: action.id, quantity: 1 }]);
    }
  }

  @Action(UpdateQuantity)
  update(ctx: StateContext<BasketItem[]>, action: UpdateQuantity) {
    const state = ctx.getState();
    ctx.setState(state.map(item => 
      item.id === action.id ? { ...item, quantity: action.quantity } : item
    ));
  }

  @Action(RemoveFromBasket)
  remove(ctx: StateContext<BasketItem[]>, action: RemoveFromBasket) {
    const state = ctx.getState();
    ctx.setState(state.filter(item => item.id !== action.id));
  }
}
