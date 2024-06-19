import { CartItem } from './interfaces/cart-item';
import { Discount } from './discount';
import { Product } from './product';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';

export class ShoppingCart implements ShoppingCartProtocol {
  private readonly _items: CartItem[] = [];

  constructor(private readonly discount: Discount) {}

  addItem(item: Product): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1);
  }

  get items(): Readonly<Product[]> {
    return this._items;
  }

  total(): number {
    return +this._items
      .reduce((total, next) => {
        return total + next.price;
      }, 0)
      .toFixed(2);
  }

  totalWithDiscount(): number {
    return this.discount.calculate(this.total());
  }

  clear(): void {
    this._items.length = 0;
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }
}
