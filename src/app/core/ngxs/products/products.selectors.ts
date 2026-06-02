import { Selector } from '@ngxs/store';
import { ProductsState } from './products.state';
import { Product } from '../../../shared/entities/interfaces/product.interface';
import { ProductsStateModel } from './products.model';
import { Characteristics } from '../../../shared/entities/interfaces/characteristics.interface';
import { Review } from '../../../shared/entities/interfaces/review-interface';
import { ProductFilter } from '../../../shared/entities/interfaces/product-filter.interface';

export class ProductsSelectors {
  @Selector([ProductsState])
  static products(state: ProductsStateModel): Product[] {
    return state.products;
  }

  @Selector([ProductsState])
  static homeProducts(state: ProductsStateModel): Product[] {
    return state.homeProducts;
  }

  @Selector([ProductsState])
  static recommendedProducts(state: ProductsStateModel): Product[] {
    return state.recomendedProducts;
  }

  @Selector([ProductsState])
  static currentProduct(state: ProductsStateModel): Product | null {
    return state.currentProduct;
  }

  @Selector([ProductsState])
  static currentProductCharacteristics(state: ProductsStateModel): Characteristics[] {
    return state.currentProduct?.characteristics || [];
  }

  @Selector([ProductsState])
  static currentProductReviews(state: ProductsStateModel): Review[] {
    return state.currentProduct?.reviews ?? [];
  }

  @Selector([ProductsState])
  static viewedProducts(state: ProductsStateModel): Product[] {
    return state.viewedProducts;
  }

  @Selector([ProductsState])
  static pagination(state: ProductsStateModel) {
    return state.pagination;
  }

  @Selector([ProductsState])
  static loading(state: ProductsStateModel): boolean {
    return state.loading;
  }

  @Selector([ProductsState])
  static availableFilters(state: ProductsStateModel): ProductFilter[] {
    return state.availableFilters;
  }
}

