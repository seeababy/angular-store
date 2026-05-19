import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CategoryItem } from '../../components/category-item/category-item';
import { AppRoutesConfig } from '../../../app.routes-config';
import { Store } from '@ngxs/store';
import { BasketSelectors } from '../../../core/ngxs/basket/basket.selectors';
import { CategoriesSelectors } from '../../../core/ngxs/categories/categories.selectors';
import { GetCategoriesTree } from '../../../core/ngxs/categories/categories.actions';

@Component({
  selector: 'app-mobile-side-menu',
  templateUrl: './mobile-side-menu.html',
  styleUrl: './mobile-side-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIcon, RouterLink, CategoryItem],
})
export class MobileSideMenu {
  private store = inject(Store);

  basketCount = this.store.selectSignal(BasketSelectors.totalCount);
  categories = this.store.selectSignal(CategoriesSelectors.categories);

  readonly AppRoutesConfig = AppRoutesConfig;

  emitMenuClosed = output<void>();

  ngOnInit() {
    this.store.dispatch(new GetCategoriesTree());
  }
}