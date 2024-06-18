import { CardItem } from '../srp/entities/interfaces/cart-item';
import { OrderStatus } from '../srp/entities/interfaces/order-status';

export class ShoppingCartLegacy {
  private readonly _items: CardItem[] = [];
  private _orderStatus: OrderStatus = 'open';

  addItem(item: CardItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1);
  }

  get items(): Readonly<CardItem[]> {
    return this._items;
  }

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  total(): number {
    return +this._items
      .reduce((total, next) => {
        return total + next.price;
      }, 0)
      .toFixed(2);
  }

  checkout(): void {
    if (this.isEmpty()) {
      console.log('Your cart is empty.');
      return;
    }

    this._orderStatus = 'closed';
    this.sendMessage('Pedido recebido.');
    this.saveOrder();
    this.clear();
  }

  clear(): void {
    this._items.length = 0;
  }
  saveOrder(): void {
    console.log('Pedido salvo com sucesso!');
  }

  sendMessage(msg: string): void {
    console.log(`${msg}`);
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }
}

const shoppingCartLegacy = new ShoppingCartLegacy();
shoppingCartLegacy.addItem({ name: 'Camiseta', price: 49.9 });
shoppingCartLegacy.addItem({ name: 'Short', price: 59.9 });
shoppingCartLegacy.addItem({ name: 'Blusa', price: 129.9 });
shoppingCartLegacy.addItem({ name: 'Meias', price: 19.9 });
shoppingCartLegacy.addItem({ name: 'Cueca', price: 19.9 });

console.log(shoppingCartLegacy.items);
console.log(shoppingCartLegacy.total());
shoppingCartLegacy.checkout();
