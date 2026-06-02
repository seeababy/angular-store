export type ProductFilter = RangeFilter | ValuesFilter;

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

export interface AppliedFilter {
  field: string;
  value: string | string[] | [number, number];
}