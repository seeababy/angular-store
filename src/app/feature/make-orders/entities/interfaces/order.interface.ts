import { IOrderItem } from './order-item.interface';
import { IShippingAddress } from './shipping-address.interface';

export interface IOrder {
  id: string;
  userId: string;
  items: IOrderItem[];
  total: number;
  status: string;
  shippingAddress: IShippingAddress;
  notes?: string;
  shippedAt?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}
