interface Product {
  title: string;
  price: number;
}

interface Item {
  quantity: number;
  product: Product;
}

export interface CartInterface {
  items: Array<Item>;
  getTotal(): number;
  add(item: Item): void;
  remove(product: Product): void;
  summary(): void;
  checkout(): void;
}

export class Cart implements CartInterface {
  items: Array<Item> = [];

  getTotal(): number {
    return this.items.reduce(
      (acc, item: Item) => acc + item.quantity * item.product.price,
      0,
    );
  }

  add(item: Item): void {
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
