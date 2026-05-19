import { inject, Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { GetCategoriesTree, UpdateCategorySelection } from './categories.actions';
import { CategoriesStateModel } from './categories.model';
import { Category } from '../../../shared/entities/interfaces/category.interface';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { ApiResponse } from '../../entities/interfaces/api-response.interface';
import { UpdateFilters } from '../products/products.actions';

@State<CategoriesStateModel>({
  name: 'categories',
  defaults: {
    categories: [],
    loading: false,
    selectedCategories: [],
  },
})
@Injectable()
export class CategoriesState {
  private http = inject(HttpClient);
  private router = inject(Router);
  private store = inject(Store);

  private apiUrl = 'http://localhost:3000/api';

  @Action(GetCategoriesTree)
  getTree(ctx: StateContext<CategoriesStateModel>) {
    ctx.patchState({ loading: true });

    return this.http.get<ApiResponse<Category[]>>(`${this.apiUrl}/categories/tree`).pipe(
      tap((res) => {
        ctx.patchState({
          categories: res.data ?? [],
          loading: false,
        });
      }),
    );
  }

  @Action(UpdateCategorySelection)
  updateSelection(ctx: StateContext<CategoriesStateModel>, action: UpdateCategorySelection) {
    const state = ctx.getState();
    const category = action.category;

    if (!category?.children && !category.parentId) {
      ctx.patchState({
        selectedCategories: [category],
      });

      this.store.dispatch(
        new UpdateFilters({
          categories: ctx.getState().selectedCategories.map((c) => c.slug),
        }),
      );

      this.router.navigate(['/products', category.slug]);
    } else if (category.children && category?.children?.length > 0) {
      ctx.patchState({
        selectedCategories: [category],
      });

      this.router.navigate(['/categories', category.slug]);
    } else {
      const parentCategory = state.selectedCategories[0];

      if (parentCategory?.id === category.parentId) {
        ctx.patchState({
          selectedCategories: [...state.selectedCategories, category],
        });
      } else {
        const parentCategory = state.categories.find((c) => c.id === category.parentId);
        if (!parentCategory) return;

        ctx.patchState({
          selectedCategories: [parentCategory, category],
        });
      }

      this.store.dispatch(
        new UpdateFilters({
          categories: ctx.getState().selectedCategories.map((c) => c.slug),
        }),
      );

      this.router.navigate(['/products', category.slug]);
    }
  }

  private findBySlug(list: Category[], slug: string): Category | undefined {
    for (const cat of list) {
      if (cat.slug === slug) return cat;

      if (cat.children && cat.children.length > 0) {
        const found = this.findBySlug(cat.children, slug);
        if (found) return found;
      }
    }
    return undefined;
  }
}
