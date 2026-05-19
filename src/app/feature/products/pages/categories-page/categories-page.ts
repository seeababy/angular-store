import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { CategoriesSelectors } from '../../../../core/ngxs/categories/categories.selectors';
import { UpdateCategorySelection } from '../../../../core/ngxs/categories/categories.actions';
import { Category } from '../../../../shared/entities/interfaces/category.interface';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  templateUrl: './categories-page.html',
  styleUrl: './categories-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesPage {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  currentParentCategory = this.store.selectSignal(CategoriesSelectors.currentParentCategory);

  selectCategory(subCategory: Category) {
    this.store.dispatch(new UpdateCategorySelection(subCategory));
  }
}
