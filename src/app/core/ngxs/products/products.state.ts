import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ProductsStateModel } from './products.model';
import { SetProducts } from './products.actions';


@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    products: []
  }
})
@Injectable()
export class ProductsState {

  @Action(SetProducts)
  setProducts(
    ctx: StateContext<ProductsStateModel>,
    action: SetProducts
  ) {
    ctx.setState({
      products: action.products
    });
  }
}