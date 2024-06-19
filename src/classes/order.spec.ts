// eslint-disable @typescript-eslint/no-unused-vars
// eslint-disable @typescript-eslint/no-empty-function
import { CartItem } from './interfaces/cart-item';
import { CustomerOrder } from './interfaces/customer-protocol';
import { MessagingProtocol } from './interfaces/messaging-protocol';
import { PersistencyProtocol } from './interfaces/persistency-protocol';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';
import { Order } from './order';
import { Product } from './product';

class ShoppingCartMock implements ShoppingCartProtocol {
  addItem(item: Product): void { }
  removeItem(index: number): void { }
  total(): number { return 1; }
  totalWithDiscount(): number { return 1; }
  clear(): void { }
  isEmpty(): boolean { return false; }
  get items(): Readonly<CartItem[]> {
    return [];
  };
}

class MessagingMock implements MessagingProtocol {
  sendMessage(msg: string): void { }
}

class PersistencyMock implements PersistencyProtocol {
  saveOrder(): void { }
}

class CustomerMock implements CustomerOrder {
  getName(): string {
    return '';
  }
  getIDN(): string {
    return '';
  }
}

const creatSut = () => {
  const shoppingCartMock = new ShoppingCartMock();
  const messagingMock = new MessagingMock();
  const persistencyMock = new PersistencyMock();
  const customerMock = new CustomerMock();
  const sut = new Order(shoppingCartMock, messagingMock, persistencyMock, customerMock);
  return { sut, shoppingCartMock, messagingMock, persistencyMock, customerMock };
}

describe('Order', () => {
  it('should not checkou if cart is empty', () => {
    const { sut, shoppingCartMock } = creatSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'isEmpty').mockReturnValueOnce(true);
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('open');
  })

  it('should not checkou if cart is not empty', () => {
    const { sut, shoppingCartMock } = creatSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'isEmpty').mockReturnValueOnce(false);
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('closed');
  })

  it('should send an email to customer', () => {
    const { sut, messagingMock } = creatSut();
    const messagingMockSpy = jest.spyOn(messagingMock, 'sendMessage');
    sut.checkout();
    expect(messagingMockSpy).toHaveBeenCalledTimes(1);
  })

  it('should save order', () => {
    const { sut, persistencyMock } = creatSut();
    const persistencyMockSpy = jest.spyOn(persistencyMock, 'saveOrder');
    sut.checkout();
    expect(persistencyMockSpy).toHaveBeenCalledTimes(1);
  })

  it('should clear cart', () => {
    const { sut, shoppingCartMock } = creatSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'clear');
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
  })
})
