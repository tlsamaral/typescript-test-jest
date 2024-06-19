import { Discount } from './discount';
import { CartItem } from './interfaces/cart-item';
import { ShoppingCart } from './shopping-cart';

const createSut = () => {
  const discountMock = createDiscountMock();
  const sut = new ShoppingCart(discountMock);
  return { sut, discountMock }
}

const createDiscountMock = () => {
  class DiscountMock extends Discount { }
  const discountMock = new DiscountMock();
  return discountMock;
}

const createCartItem = (name: string, price: number) => {
  class CartItemMock implements CartItem {
    constructor(public name: string, public price: number) { }
  }

  return new CartItemMock(name, price);
}

const createSutWithProducts = () => {
  const { sut, discountMock } = createSut();
  const carItem1 = createCartItem('Camiseta', 40);
  const carItem2 = createCartItem('Short', 20);
  sut.addItem(carItem1);
  sut.addItem(carItem2);
  return { sut, discountMock };
}

describe('Shopping cart', () => {
  it('should be an empty cart when no product is added', () => {
    const { sut } = createSut();

    expect(sut.isEmpty()).toBe(true);
  });

  it('should have 2 cart items', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
  })

  it('should test total and totalWithDiscount', () => {
    const { sut } = createSutWithProducts();
    expect(sut.total()).toBe(60);
    expect(sut.totalWithDiscount()).toBe(60);
  })

  it('should add products and clear cart', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
    sut.clear();
    expect(sut.items.length).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  })

  it('should remove products', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
    sut.removeItem(1);
    expect(sut.items.length).toBe(1);
    sut.removeItem(0);
    expect(sut.items.length).toBe(0);
  })

  it('should call discount.calculate once when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithProducts();

    const discountMockSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDiscount();
    expect(discountMockSpy).toHaveBeenCalledTimes(1);
  })

  it('should call discount.calculate with totalPrice when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithProducts();

    const discountMockSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDiscount();
    expect(discountMockSpy).toHaveBeenCalledWith(sut.total());
  })
})
