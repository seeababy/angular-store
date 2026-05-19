import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Category } from '../../entities/interfaces/category.interface';
import { UpdateCategorySelection } from '../../../core/ngxs/categories/categories.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-category-item',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './category-item.html',
  styleUrl: './category-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryItem {
  private store = inject(Store);

  item = input<Category>();

  go() {
    const category = this.item();
    if (!category) return;

    this.store.dispatch(new UpdateCategorySelection(category));
  }
}
