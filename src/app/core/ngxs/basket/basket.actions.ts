export class GetCart {
  static readonly type = '[BASKET] Get Cart';
}

export class UpdateCart {
  static readonly type = '[BASKET] Update Cart';
  constructor(
    public productId: string,
    public quantity: number,
  ) {}
}

export class RemoveFromCart {
  static readonly type = '[BASKET] Remove From Cart';
  constructor(public productId: string) {}
}

export class ClearCart {
  static readonly type = '[BASKET] Clear Cart';
}