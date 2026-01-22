import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { CategoryItem } from "../../components/category-item/category-item";
import { AppRoutesConfig } from '../../../app.routes-config';
import { Store } from '@ngxs/store';
import { BasketSelectors } from '../../../core/ngxs/basket/basket.selectors';

@Component({
  selector: 'app-mobile-side-menu',
  templateUrl: './mobile-side-menu.html',
  styleUrl: './mobile-side-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIcon, RouterLink, CategoryItem],
})
export class MobileSideMenu {
  store = inject(Store);
  basketCount = this.store.selectSignal(BasketSelectors.totalCount);
  AppRoutesConfig = AppRoutesConfig;

  categoryItems = [
    { name: 'laptops-computers', value: 'Ноутбуки та комп’ютери' },
    { name: 'smartphones', value: 'Смартфони' },
    { name: 'tv-electronics', value: 'ТВ і електроніка' },
    { name: 'gaming', value: 'Товари для геймерів' }
  ];

  emitMenuClosed = output<void>();
}
