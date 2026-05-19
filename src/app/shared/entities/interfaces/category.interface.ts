export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  parentId?: string;
  order?: number;
  icon?: string;
  image?: string;
  isActive: boolean;
  productCount: number;
  children?: Category[];
}
