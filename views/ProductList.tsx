
import React, { useState } from 'react';
import { View, Product } from '../types';
import { CATEGORIES } from '../constants';

interface ProductListProps {
  navigate: (view: View) => void;
  products: Product[];
}

const ProductListView: React.FC<ProductListProps> = ({ navigate, products }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' 
      ? true 
      : activeCategory === 'Low Stock' 
        ? p.stock <= p.lowStockThreshold 
        : p.category === activeCategory;
    
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 animate-in slide-in-from-right duration-300">
      <header className="sticky top-0 z-20 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-lg">
              <span className="material-symbols-outlined text-zinc-900 dark:text-white">inventory_2</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">My Products</h2>
          </div>
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>

        <div className="px-4 pb-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="material-symbols-outlined text-zinc-400 group-focus-within:text-primary transition-colors">search</span>
            </div>
            <input 
              className="block w-full h-12 pl-10 pr-4 bg-zinc-100 dark:bg-zinc-900 border-none rounded-xl focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-zinc-800 transition-all placeholder:text-zinc-500" 
              placeholder="Search inventory..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 px-4 pb-3 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex h-9 shrink-0 items-center justify-center px-4 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat 
                  ? 'bg-primary text-zinc-900 shadow-sm' 
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium hover:bg-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 px-4 py-2 space-y-3 pb-24">
        {filteredProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-zinc-500">No products found.</p>
          </div>
        )}
      </main>

      <button 
        onClick={() => navigate('add-product')}
        className="fixed bottom-24 right-6 size-16 rounded-full bg-primary text-zinc-900 shadow-[0_8px_30px_rgb(72,232,23,0.4)] flex items-center justify-center transition-transform active:scale-90 z-30"
      >
        <span className="material-symbols-outlined text-3xl font-bold">add</span>
      </button>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const isOut = product.stock === 0;
  const isLow = !isOut && product.stock <= product.lowStockThreshold;

  return (
    <div className={`flex items-center gap-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-3 rounded-xl shadow-sm hover:border-primary/30 transition-colors cursor-pointer active:scale-[0.98] ${isOut ? 'opacity-70 grayscale-[0.5]' : ''}`}>
      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg size-16 shrink-0 flex items-center justify-center overflow-hidden">
        <img src={product.image} className="object-cover size-full" alt={product.name} />
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <p className="text-zinc-900 dark:text-zinc-50 text-base font-bold leading-tight truncate">{product.name}</p>
        <p className="text-primary font-bold text-sm mt-0.5">GH₵ {product.price.toLocaleString()}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <span className={`size-2 rounded-full ${isOut ? 'bg-red-500' : isLow ? 'bg-orange-500' : 'bg-primary'}`}></span>
          <p className={`text-xs font-bold uppercase tracking-wider ${isOut ? 'text-red-600 dark:text-red-400' : isLow ? 'text-orange-600 dark:text-orange-400' : 'text-zinc-500 dark:text-zinc-400 font-medium'}`}>
            {isOut ? 'Out of Stock' : isLow ? `${product.stock} in stock • Reorder soon` : `${product.stock} in stock`}
          </p>
        </div>
      </div>
      <span className="material-symbols-outlined text-zinc-300">chevron_right</span>
    </div>
  );
};

export default ProductListView;
