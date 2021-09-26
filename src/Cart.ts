import find from 'lodash/find';
import remove from 'lodash/remove';
import Dinero, { Dinero as DineroInterface } from 'dinero.js';

const Money = Dinero;

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

export interface Product {
  title: string;
  price: number;
}

interface DiscountCondition {
  percentage?: number;
  minimum?: number;
  quantity?: number;
}

interface Item {
  quantity: number;
  product: Product;
  condition?: DiscountCondition;
}

export interface Shopping {
  items: Item[];
  getTotal(): DineroInterface;
  add(item: Item): void;
  remove(product: Product): void;
  summary(): void;
  checkout(): void;
}

interface Summary {
  items: Item[];
  total: number;
}

const calculatePercentageDiscount = (
  amount: DineroInterface,
  item: Item,
): DineroInterface => {
  if (
    item.condition?.percentage &&
    item.condition?.minimum &&
    item.quantity >= item.condition.minimum
  ) {
    return amount.percentage(item.condition.percentage);
  }
  return Money({ amount: 0 });
};

const calculateQuantityDiscount = (
  amount: DineroInterface,
  item: Item,
): DineroInterface => {
  const isEven = item.quantity % 2 === 0;
  if (item.condition?.quantity && item.quantity > item.condition.quantity) {
    return amount.percentage(isEven ? 50 : 40);
  }
  return Money({ amount: 0 });
};

export class Cart implements Shopping {
  items: Item[] = [];

  getTotal(): DineroInterface {
    return this.items.reduce((acc, item: Item) => {
      const amount = Money({ amount: item.quantity * item.product.price });
      let discount = Money({ amount: 0 });

      if (item.condition?.percentage && item.condition?.minimum) {
        discount = calculatePercentageDiscount(amount, item);
      } else if (item.condition?.quantity) {
        discount = calculateQuantityDiscount(amount, item);
      }

      return acc.add(amount).subtract(discount);
    }, Money({ amount: 0 }));
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
