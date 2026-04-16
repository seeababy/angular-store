import { IShippingAddress } from "./shipping-address.interface";

export interface ICreateOrder {
  shippingAddress: IShippingAddress;
  notes?: string;
}
