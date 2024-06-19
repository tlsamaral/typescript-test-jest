import { Product } from '../product';
import { CartItem } from './cart-item';

export interface ShoppingCartProtocol {
  items: Readonly<CartItem[]>;
  addItem(item: Product): void;
  removeItem(index: number): void;
  total(): number;
  totalWithDiscount(): number;
  clear(): void;
  isEmpty(): boolean;
}
