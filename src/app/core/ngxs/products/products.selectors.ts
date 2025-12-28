import { Selector } from '@ngxs/store';
import { ProductsState } from './products.state';
import { Product } from '../../../shared/entities/interfaces/product.interface';

export class ProductsSelectors {

  @Selector([ProductsState])
  static products(state: { products: Product[] }): Product[] {
    return state.products;
  }
}