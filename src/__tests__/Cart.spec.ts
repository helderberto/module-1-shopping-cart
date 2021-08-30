import { Cart, CartInterface } from '../Cart';

describe('Cart', () => {
  let cart: CartInterface;

  beforeEach(() => {
    cart = new Cart();
  });

  it('should return 0 when getTotal() is executed in a newly created instance', () => {
    expect(cart.getTotal()).toBe(0);
  });

  it('should multiply quantity with price and receive the total amount', () => {
    const item = {
      product: {
        title: 'Adidas running shoes',
        price: 35388,
      },
      quantity: 2,
    };

    cart.add(item);

    expect(cart.getTotal()).toBe(70776);
  });
});
