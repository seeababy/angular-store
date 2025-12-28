export class AddToBasket {
  static readonly type = '[BASKET] Add To Basket';
  constructor(public id: number) {}
}

export class UpdateQuantity { 
  static readonly type = '[BASKET] Update Quantity';
  constructor(public id: number, public quantity: number) {}
}

export class RemoveFromBasket { 
  static readonly type = '[BASKET] Remove From Basket';
  constructor(public id: number) {}
}
