interface Product {
  title: string;
  price: string;
}

interface Item {
  quantity: number;
  product: Product;
}

export class Cart {
  items = [];

  getTotal(): number {
    return 0;
  }

  add(item: Item): void {
    return;
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
