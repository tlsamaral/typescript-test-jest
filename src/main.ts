import { Messaging } from './services/messaging';
import { Order } from './classes/order';
import { Persistency } from './services/persistency';
import { Product } from './classes/product';
import { ShoppingCart } from './classes/shopping-cart';
import { FiftyPercentDiscount, NoDiscount } from './classes/discount';
import { IndividualCustomer } from './classes/customer';

const noDiscount = new NoDiscount();
// const fiftyPercentDiscount = new FiftyPercentDiscount();
const shoppingCart = new ShoppingCart(noDiscount);
const messaging = new Messaging();
const persistency = new Persistency();
const individualCustomer = new IndividualCustomer('Talles', 'Amaral', '1111');
const order = new Order(
  shoppingCart,
  messaging,
  persistency,
  individualCustomer,
);
shoppingCart.addItem(new Product('Camiseta', 49.9));
shoppingCart.addItem(new Product('Short', 59.9));
shoppingCart.addItem(new Product('Blusa', 29.9));
shoppingCart.addItem(new Product('Meias', 19.9));
shoppingCart.addItem(new Product('Cueca', 19.9));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
order.checkout();
