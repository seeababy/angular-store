import { Product } from '../../../shared/entities/interfaces/product.interface';

export interface ProductsStateModel {
  homeProducts: Product[];
  products: Product[];
  recomendedProducts: Product[];
  currentProduct: Product | null;
  viewedProducts: Product[];
}