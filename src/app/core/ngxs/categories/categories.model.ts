import { Category } from "../../../shared/entities/interfaces/category.interface";

export interface CategoriesStateModel {
  categories: Category[];
  loading: boolean;
  selectedCategories: Category[];
}