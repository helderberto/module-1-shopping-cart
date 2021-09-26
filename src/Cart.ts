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
  percentage: number;
  minimum: number;
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

export class Cart implements Shopping {
  items: Item[] = [];

  getTotal(): DineroInterface {
    return this.items.reduce((acc, item: Item) => {
      const amount = Money({ amount: item.quantity * item.product.price });
      let discount = Money({ amount: 0 });

      if (
        item.condition &&
        item.condition.percentage &&
        item.quantity > item.condition.minimum
      ) {
        discount = amount.percentage(item.condition.percentage);
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
