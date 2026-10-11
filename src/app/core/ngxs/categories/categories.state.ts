import { inject, Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { GetCategoriesTree } from './categories.actions';
import { CategoriesStateModel } from './categories.model';
import { Category } from '../../../shared/entities/interfaces/category.interface';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { ApiResponse } from '../../entities/interfaces/api-response.interface';
import { UpdateFilters } from '../product-filters/product-filters.actions';

@State<CategoriesStateModel>({
  name: 'categories',
  defaults: {
    categories: [],
    loading: false
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
}
