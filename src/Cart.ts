import find from 'lodash/find';
import remove from 'lodash/remove';
import Dinero from 'dinero.js';
import type { Item, Product, Shopping, Summary, Money } from './types';

Dinero.defaultCurrency = 'BRL';
Dinero.defaultPrecision = 2;

const calculatePercentageDiscount = (amount: Money, item: Item): Money => {
  if (
    item.condition?.percentage &&
    item.condition?.minimum &&
    item.quantity >= item.condition.minimum
  ) {
    return amount.percentage(item.condition.percentage);
  }
  return Dinero({ amount: 0 });
};

const calculateQuantityDiscount = (amount: Money, item: Item): Money => {
  const isEven = item.quantity % 2 === 0;
  if (item.condition?.quantity && item.quantity > item.condition.quantity) {
    return amount.percentage(isEven ? 50 : 40);
  }
  return Dinero({ amount: 0 });
};

export class Cart implements Shopping {
  items: Item[] = [];

  getTotal(): Money {
    return this.items.reduce((acc, item: Item) => {
      const amount = Dinero({ amount: item.quantity * item.product.price });
      let discount = Dinero({ amount: 0 });

      if (item.condition?.percentage && item.condition?.minimum) {
        discount = calculatePercentageDiscount(amount, item);
      } else if (item.condition?.quantity) {
        discount = calculateQuantityDiscount(amount, item);
      }

      return acc.add(amount).subtract(discount);
    }, Dinero({ amount: 0 }));
  }

  add(item: Item): void {
    const itemToMatch = { product: item.product };

    if (find(this.items, itemToMatch)) {
      remove(this.items, itemToMatch);
    }
    this.items.push(item);
  }

  remove(product: Product): void {
    remove(this.items, { product });
  }

  summary(): Summary {
    const total = this.getTotal().getAmount();
    const items = this.items;

    return { items, total };
  }

  checkout(): Summary {
    const { total, items } = this.summary();

    this.items = [];

    return { items, total };
  }
}
