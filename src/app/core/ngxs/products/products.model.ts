import { Pagination } from '../../../shared/entities/interfaces/pagination.interface';
import { ProductFilter } from '../../../shared/entities/interfaces/product-filter.interface';
import { ProductFilters } from '../../../shared/entities/interfaces/product-filters.interface';
import { Product } from '../../../shared/entities/interfaces/product.interface';

export interface ProductsStateModel {
  homeProducts: Product[];
  products: Product[];
  recomendedProducts: Product[];
  currentProduct: Product | null;
  viewedProducts: Product[];
  filters: ProductFilters;
  pagination: Pagination;
  loading: boolean;
  availableFilters: ProductFilter[];
}
