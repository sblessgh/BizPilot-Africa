
export type View = 'login' | 'dashboard' | 'products' | 'record-sale' | 'add-product' | 'sales' | 'reports' | 'settings';

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  lowStockThreshold: number;
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  profit: number;
  date: string;
}

export interface DailySummary {
  totalSales: number;
  totalProfit: number;
  salesGrowth: number;
  profitGrowth: number;
}
