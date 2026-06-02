export interface ProductFilters {
  categories: string[];
  page?: number;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  color?: string;
  charFilters?: string[];
  sortBy?: string;
}
