import { Product } from '../../../shared/entities/interfaces/product.interface';

export class SetProducts {
  static readonly type = '[Products] Set Products';
  constructor(public products: Product[]) {}
}

export class GetProducts {
  static readonly type = '[Products] Get Products';
}

export class GetHomeProducts {
  static readonly type = '[Products] Get Home Products';
}

export class GetRecommendedProducts {
  static readonly type = '[Products] Get Recommended Products';
}

export class GetProductById {
  static readonly type = '[Products] Get Product By Id';
  constructor(public id: string) {}
}

export class AddReview {
  static readonly type = '[Products] Add Review';
  constructor(
    public productId: string,
    public review: { comment: string; rating: number },
  ) {}
}

export class GetViewedProducts {
  static readonly type = '[Products] Get Viewed Products';
}

export class AddRecentlyProducts {
  static readonly type = '[Products] Add Recently Products';
}
