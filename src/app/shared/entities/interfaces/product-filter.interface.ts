export interface RangeFilter {
  type: 'range';
  field: 'price' | 'averageRating';
  label: string;
  minV: number;
  maxV: number;
}

export interface ValuesFilter {
  type: 'select' | 'multiselect';
  field: string;
  label: string;
  values: string[];
}

export type ProductFilter = RangeFilter | ValuesFilter;

export type AppliedFilterValue = [number | undefined, number | undefined] | string[];

export interface AppliedFilters {
  [field: string]: AppliedFilterValue;
}
