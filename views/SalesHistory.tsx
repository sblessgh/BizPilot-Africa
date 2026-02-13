
import React from 'react';
import { View, Sale } from '../types';

interface SalesHistoryProps {
  navigate: (view: View) => void;
  sales: Sale[];
}

const SalesHistoryView: React.FC<SalesHistoryProps> = ({ navigate, sales }) => {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      <header className="p-4 border-b dark:border-zinc-800 flex items-center justify-between">
        <h1 className="text-xl font-bold">Sales History</h1>
        <button className="text-primary text-sm font-bold">Filter</button>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {sales.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-zinc-300 text-6xl mb-4">history_toggle_off</span>
            <p className="text-zinc-500">No sales recorded yet.</p>
            <button 
              onClick={() => navigate('record-sale')}
              className="mt-4 text-primary font-bold"
            >
              Record your first sale
            </button>
          </div>
        ) : (
          sales.map(sale => (
            <div key={sale.id} className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 p-4 rounded-xl shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">shopping_cart</span>
                </div>
                <div>
                  <p className="font-bold text-sm truncate max-w-[150px]">{sale.productName}</p>
                  <p className="text-[10px] text-zinc-500 font-medium">
                    {new Date(sale.date).toLocaleDateString()} • {sale.quantity} items
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-zinc-900 dark:text-zinc-50">GH₵ {sale.totalPrice.toLocaleString()}</p>
                <p className="text-[10px] font-bold text-primary">Profit: GH₵ {sale.profit.toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default SalesHistoryView;
