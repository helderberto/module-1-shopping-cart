import find from 'lodash/find';
import remove from 'lodash/remove';

export interface Product {
  title: string;
  price: number;
}

interface Item {
  quantity: number;
  product: Product;
}

export interface Bag {
  items: Array<Item>;
  getTotal(): number;
  add(item: Item): void;
  remove(product: Product): void;
  summary(): void;
  checkout(): void;
}

export class Cart implements Bag {
  items: Array<Item> = [];

  getTotal(): number {
    return this.items.reduce(
      (acc, item: Item) => acc + item.quantity * item.product.price,
      0,
    );
  }

  add(item: Item): void {
    const itemToMatch = { product: item.product };

    if (find(this.items, itemToMatch)) {
      remove(this.items, itemToMatch);
    }
    this.items.push(item);
  }

  remove(product: Product): void {
    return;
  }

  summary(): void {
    return;
  }

  checkout(): void {
    return;
  }
}
