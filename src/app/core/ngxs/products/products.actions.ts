import { Product } from '../../../shared/entities/interfaces/product.interface';

export class SetProducts {
  static readonly type = '[Products] Set Products';
  constructor(public products: Product[]) {}
}