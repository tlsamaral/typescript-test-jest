import { Messaging } from './services/messaging';
import { Order } from './entities/order';
import { Persistency } from './services/persistency';
import { Product } from './entities/product';
import { ShoppingCart } from './entities/shopping-cart';
import { NoDiscount } from './entities/interfaces/discount';

const noDiscount = new NoDiscount();
// const fiftyPercentDiscount = new FiftyPercentDiscount();
const shoppingCart = new ShoppingCart(noDiscount);
const messaging = new Messaging();
const persistency = new Persistency();
const order = new Order(shoppingCart, messaging, persistency);
shoppingCart.addItem(new Product('Camiseta', 49.9));
shoppingCart.addItem(new Product('Short', 59.9));
shoppingCart.addItem(new Product('Blusa', 29.9));
shoppingCart.addItem(new Product('Meias', 19.9));
shoppingCart.addItem(new Product('Cueca', 19.9));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
order.checkout();
