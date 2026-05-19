import { Selector } from '@ngxs/store';
import { CategoriesState } from './categories.state';
import { CategoriesStateModel } from './categories.model';
import { Category } from '../../../shared/entities/interfaces/category.interface';

export class CategoriesSelectors {
  @Selector([CategoriesState])
  static categories(state: CategoriesStateModel): Category[] {
    return state.categories;
  }

  @Selector([CategoriesState])
  static loading(state: CategoriesStateModel): boolean {
    return state.loading;
  }

  @Selector([CategoriesState])
  static currentParentCategory(state: CategoriesStateModel): Category {
    return state.selectedCategories[0];
  }
}
