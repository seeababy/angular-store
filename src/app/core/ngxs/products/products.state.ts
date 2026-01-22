import { inject, Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { ProductsStateModel } from './products.model';
import { GetProducts, SetProducts } from './products.actions';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';


@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    products: []
  }
})
@Injectable()
export class ProductsState implements NgxsOnInit{

  private http = inject(HttpClient);
  apiUrl = 'http://localhost:5000';

  ngxsOnInit(ctx: StateContext<ProductsStateModel>) {
    ctx.dispatch(new GetProducts());
  }

  @Action(GetProducts)
  getProducts(ctx: StateContext<ProductsStateModel>) {
    return this.http.get<any[]>(`${this.apiUrl}/products`).pipe(map((products: any[]) => ctx.dispatch(new SetProducts(products[0]))));
  }

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