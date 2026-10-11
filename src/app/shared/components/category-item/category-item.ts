import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Category } from '../../entities/interfaces/category.interface';
import { Store } from '@ngxs/store';
import { SetCategory } from '../../../core/ngxs/product-filters/product-filters.actions';

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

    this.store.dispatch(new SetCategory(category));
  }
}
