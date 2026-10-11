import { AppliedFilters } from './product-filter.interface';

export interface ProductFilters {
  category?: string;
  page?: number;
  sortBy?: string;
  appliedFilters?: AppliedFilters;
}
