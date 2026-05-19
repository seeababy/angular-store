import { Category } from "../../../shared/entities/interfaces/category.interface";

export class GetCategoriesTree {
  static readonly type = '[Categories] Get Tree';
}

export class UpdateCategorySelection {
  static readonly type = '[Categories] Update Selection';
  constructor(public category: Category) {}
}