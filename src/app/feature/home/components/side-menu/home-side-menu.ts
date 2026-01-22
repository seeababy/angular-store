import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import { CategoryItem } from "../../../../shared/components/category-item/category-item";
import { SocialNetworks } from "../../../../shared/components/social-networks/social-networks";

@Component({
  selector: 'app-home-side-menu',
  templateUrl: './home-side-menu.html',
  styleUrl: './home-side-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, MatIcon, CategoryItem, SocialNetworks],
})
export class HomeSideMenu {
  categoryItems = [
    {
      name: 'laptops-computers', 
      value: 'Ноутбуки та комп’ютери'
    },
        {
      name: 'smartphones', 
      value: 'Смартфони'
    },
        {
      name: 'tv-electronics', 
      value: 'ТВ і електроніка'
    },
        {
      name: 'gaming', 
      value: 'Товари для геймерів'
    },

  ];


}
