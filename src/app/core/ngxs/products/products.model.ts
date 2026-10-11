import { Pagination } from '../../../shared/entities/interfaces/pagination.interface';
import { Product } from '../../../shared/entities/interfaces/product.interface';

export interface ProductsStateModel {
  homeProducts: Product[];
  products: Product[];
  recommendedProducts: Product[];
  currentProduct: Product | null;
  viewedProducts: Product[];
  pagination: Pagination;
  loading: boolean;
}
