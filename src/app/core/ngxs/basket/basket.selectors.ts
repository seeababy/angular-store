import { Selector } from '@ngxs/store';
import { BasketState } from './basket.state';
import { ProductsState } from '../products/products.state';
import { Product } from '../../../shared/entities/interfaces/product.interface';

export class BasketSelectors {

//   @Selector([BasketState])
//   static totalCount(state: BasketItem[]): number {
//     return state.reduce((sum, item) => sum + item.quantity, 0);
//   }

//   @Selector([BasketState, ProductsState])
//   static basketProducts(
//   basket: BasketItem[],
//   productsState: { products: Product[] }
// ): BasketProduct[] {

//   return basket
//     .map(item => {
//       const product = productsState.products.find(p => p.id === item.id);
//       if (!product) return null;

//       return {
//         ...product,
//         image: product.images, 
//       };
//     })
//     .filter(Boolean) as BasketProduct[];
// }


//   @Selector([BasketState])
//   static isInBasket(state: BasketItem[]) {
//     return (productId: number) => state.some(item => item.id === productId);
//   }
}








