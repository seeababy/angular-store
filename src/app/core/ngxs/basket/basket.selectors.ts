import { Selector } from '@ngxs/store';
import { BasketState } from './basket.state';
import { BasketStateModel } from './basket.model';

export class BasketSelectors {
  @Selector([BasketState])
  static items(state: BasketStateModel) {
    return state.items;
  }

  @Selector([BasketState])
  static totalCount(state: BasketStateModel) {
    return state.totalItems;
  }

  @Selector([BasketState])
  static total(state: BasketStateModel) {
    return state.total;
  }
}










