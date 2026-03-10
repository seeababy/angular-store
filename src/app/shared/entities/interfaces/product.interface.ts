import { Characteristics } from "./characteristics.interface";
import { Review } from "./review-interface";

export interface Product {
  id: string;
  price: number;
  images: string[];
  name: string;
  description: string;
  quantity: number;
  guarantee: string;
  color: string;
  cssColor: string;
  productType: string;
  characteristics: Characteristics[];
  categories: string[];
  relatedProducts?: Product[];
  reviews?: Review[];
}