export abstract class Discount {
  protected discount = 0;
  calculate(price: number): number {
    return price - price * this.discount;
  }
}

export class FiftyPercentDiscount extends Discount {
  protected readonly discount = 0.5;
}

export class NoDiscount extends Discount {
  calculate(price: number): number {
    return 10000;
  }
}
