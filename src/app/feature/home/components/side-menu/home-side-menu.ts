import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CategoryItem } from '../../../../shared/components/category-item/category-item';
import { SocialNetworks } from '../../../../shared/components/social-networks/social-networks';
import { Store } from '@ngxs/store';
import { CategoriesSelectors } from '../../../../core/ngxs/categories/categories.selectors';
import { GetCategoriesTree } from '../../../../core/ngxs/categories/categories.actions';

@Component({
  selector: 'app-home-side-menu',
  templateUrl: './home-side-menu.html',
  styleUrl: './home-side-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, MatIcon, CategoryItem, SocialNetworks],
})
export class HomeSideMenu {
  private store = inject(Store);

  categories = this.store.selectSignal(CategoriesSelectors.categories);

  ngOnInit() {
    this.store.dispatch(new GetCategoriesTree());
  }
}