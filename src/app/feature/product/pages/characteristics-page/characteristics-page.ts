import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductsSelectors } from '../../../../core/ngxs/products/products.selectors';
import { Store } from '@ngxs/store';
import { Characteristics } from '../../../../shared/entities/interfaces/characteristics.interface';
import { GetProductById } from '../../../../core/ngxs/products/products.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-characteristics-page',
  standalone: true,
  imports: [],
  templateUrl: './characteristics-page.html',
  styleUrl: './characteristics-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacteristicsPage { 
  private store = inject(Store);
  private activatedRoute = inject(ActivatedRoute);

  characteristics = this.store.selectSignal(ProductsSelectors.currentProductCharacteristics);

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(new GetProductById(id));
    }
  }
}
