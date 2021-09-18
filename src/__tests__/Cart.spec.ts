import { Cart, Bag, Product } from '../Cart';

describe('Cart', () => {
  let cart: Bag;
  const product: Product = {
    title: 'Adidas running shoes',
    price: 35388,
  };

  beforeEach(() => {
    cart = new Cart();
  });

  it('should return 0 when getTotal() is executed in a newly created instance', () => {
    expect(cart.getTotal()).toBe(0);
  });

  it('should multiply quantity with price and receive the total amount', () => {
    const item = {
      product,
      quantity: 2,
    };

    cart.add(item);

    expect(cart.getTotal()).toBe(70776);
  });

  it('should ensure no more than one product exists at a time', () => {
    cart.add({
      product,
      quantity: 2,
    });

    cart.add({
      product,
      quantity: 1,
    });

    expect(cart.getTotal()).toBe(35388);
  });
});
