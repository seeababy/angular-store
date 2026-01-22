import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ICategoryItem } from '../../entities/interfaces/category-item';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-category-item',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './category-item.html',
  styleUrl: './category-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryItem {
  item = input<ICategoryItem>();
}
