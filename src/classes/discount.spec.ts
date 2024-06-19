import { Discount, FiftyPercentDiscount, NoDiscount } from './discount';

const createSut = (className: new () => Discount): Discount => {
  return new className();
}

describe('Discount', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have no discount', () => {
    // System under test
    const sut = createSut(NoDiscount);
    expect(sut.calculate(10.99)).toBe(10.99);
  })

  it('should apply 50% discount on price', () => {
    // System under test
    const sut = createSut(FiftyPercentDiscount);
    expect(sut.calculate(150.50)).toBeCloseTo(75.25);
  })
})
