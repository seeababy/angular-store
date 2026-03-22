export interface BasketProduct {
  productId: string;
  quantity: number;
  productName: string;
  price: number;
  subtotal: number;
  image: string;
  inStock: boolean;
  availableQuantity: number;
}
