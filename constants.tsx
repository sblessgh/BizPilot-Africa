
import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Kenyan Coffee',
    price: 1200,
    stock: 45,
    category: 'Coffee',
    image: 'https://picsum.photos/seed/coffee/200/200',
    lowStockThreshold: 10
  },
  {
    id: '2',
    name: 'Mwea Pishori Rice (5kg)',
    price: 850,
    stock: 3,
    category: 'Grains',
    image: 'https://picsum.photos/seed/rice/200/200',
    lowStockThreshold: 5
  },
  {
    id: '3',
    name: 'Organic Avocados (Box)',
    price: 2500,
    stock: 12,
    category: 'Produce',
    image: 'https://picsum.photos/seed/avocado/200/200',
    lowStockThreshold: 5
  },
  {
    id: '4',
    name: 'Assorted Tea Masala',
    price: 450,
    stock: 0,
    category: 'Spices',
    image: 'https://picsum.photos/seed/tea/200/200',
    lowStockThreshold: 5
  },
  {
    id: '5',
    name: 'Pure Acacia Honey (1L)',
    price: 1800,
    stock: 8,
    category: 'Honey',
    image: 'https://picsum.photos/seed/honey/200/200',
    lowStockThreshold: 5
  }
];

export const CATEGORIES = ['All', 'Low Stock', 'Coffee', 'Grains', 'Produce', 'Spices', 'Honey'];
