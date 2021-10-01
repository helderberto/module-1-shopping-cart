import { Dinero } from 'dinero.js';

export type Money = Dinero;

export interface Product {
  title: string;
  price: number;
}

interface DiscountCondition {
  percentage?: number;
  minimum?: number;
  quantity?: number;
}

export interface Item {
  quantity: number;
  product: Product;
  condition?: DiscountCondition;
}

export interface Shopping {
  items: Item[];
  getTotal(): Money;
  add(item: Item): void;
  remove(product: Product): void;
  summary(): void;
  checkout(): void;
}

export interface Summary {
  items: Item[];
  total: number;
}
