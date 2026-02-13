
import React, { useState, useMemo } from 'react';
import { View, Product } from '../types';

interface RecordSaleProps {
  navigate: (view: View) => void;
  products: Product[];
  onRecord: (productId: string, quantity: number) => void;
}

const RecordSaleView: React.FC<RecordSaleProps> = ({ navigate, products, onRecord }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const selectedProduct = useMemo(() => 
    products.find(p => p.id === selectedProductId),
    [products, selectedProductId]
  );

  const totalAmount = selectedProduct ? selectedProduct.price * quantity : 0;
  const profitAmount = totalAmount * 0.28; // Mock profit margin

  const handleConfirm = () => {
    if (!selectedProductId) return;
    
    setShowToast(true);
    setTimeout(() => {
      onRecord(selectedProductId, quantity);
    }, 1500);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col animate-in slide-in-from-bottom duration-300">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-primary/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('dashboard')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
            <span className="material-symbols-outlined text-zinc-600 dark:text-zinc-300">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold tracking-tight">Record Sale</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
            <span className="material-symbols-outlined text-primary text-sm filled-icon">cloud_done</span>
            <span className="text-[10px] font-bold text-primary uppercase">Online</span>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
            <span className="material-symbols-outlined text-zinc-600 dark:text-zinc-300">history</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 w-full space-y-6">
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-primary/20 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <h2 className="font-semibold text-zinc-800 dark:text-zinc-200">What did you sell?</h2>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">search</span>
            <select 
              className="w-full pl-11 pr-4 py-4 bg-white dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-xl focus:ring-primary focus:border-primary appearance-none shadow-sm text-base"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              <option value="" disabled>Search or select product</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name} (Qty: {p.stock})</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">unfold_more</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
             {products.slice(0, 4).map(p => (
               <button 
                key={p.id}
                onClick={() => setSelectedProductId(p.id)}
                className={`whitespace-nowrap px-4 py-2 border rounded-full text-sm font-medium transition-all ${
                  selectedProductId === p.id 
                  ? 'bg-primary/20 border-primary text-primary' 
                  : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700'
                }`}
               >
                 {p.name.split(' ')[0]}
               </button>
             ))}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-primary/20 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <h2 className="font-semibold text-zinc-800 dark:text-zinc-200">How many?</h2>
          </div>
          <div className="flex items-center justify-between bg-white dark:bg-zinc-800 p-2 rounded-xl border-2 border-zinc-100 dark:border-zinc-700 shadow-sm">
            <button 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-16 h-16 flex items-center justify-center bg-zinc-100 dark:bg-zinc-700 rounded-lg active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-2xl font-bold">remove</span>
            </button>
            <div className="flex flex-col items-center">
              <input 
                className="w-24 text-center text-4xl font-bold bg-transparent border-none focus:ring-0 p-0" 
                type="number" 
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Quantity</span>
            </div>
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="w-16 h-16 flex items-center justify-center bg-primary text-zinc-900 rounded-lg active:scale-95 transition-transform shadow-lg shadow-primary/30"
            >
              <span className="material-symbols-outlined text-2xl font-bold">add</span>
            </button>
          </div>
        </section>

        <section className="bg-zinc-900 dark:bg-primary/10 rounded-2xl p-6 text-white dark:text-primary shadow-xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors"></div>
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-zinc-400 dark:text-primary/60 text-xs font-bold uppercase tracking-wider mb-1">Total Sale Amount</p>
                <p className="text-4xl font-black tracking-tight">GH₵ {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-1 text-primary bg-primary/10 px-2 py-0.5 rounded text-[10px] font-bold mb-1">
                  <span className="material-symbols-outlined text-xs">trending_up</span>
                  PROFIT
                </div>
                <p className="text-xl font-bold text-primary">GH₵ {profitAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
            <div className="h-px bg-white/10 dark:bg-primary/20 w-full"></div>
            <div className="flex justify-between text-sm text-zinc-400 dark:text-primary/60">
              <span>Unit Price: GH₵ {selectedProduct?.price.toLocaleString() || '0.00'}</span>
              <span>Cost: GH₵ {(totalAmount * 0.7).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </section>
      </main>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white dark:bg-zinc-800 border-l-4 border-primary rounded-lg shadow-2xl p-4 flex items-center gap-4 z-50 animate-in slide-in-from-top duration-300">
          <div className="bg-primary/20 p-2 rounded-full">
            <span className="material-symbols-outlined text-primary">check_circle</span>
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm">Sale Recorded!</p>
            <p className="text-xs text-zinc-500">Inventory updated successfully.</p>
          </div>
          <button className="text-primary text-xs font-bold" onClick={() => setShowToast(false)}>DISMISS</button>
        </div>
      )}

      <footer className="p-4 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800">
        <button 
          onClick={handleConfirm}
          disabled={!selectedProductId}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-zinc-200 disabled:text-zinc-400 text-zinc-900 font-bold py-5 rounded-xl text-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined font-bold">point_of_sale</span>
          Confirm Sale
        </button>
        <p className="text-center text-[10px] text-zinc-400 mt-3 font-medium uppercase tracking-widest">Tap once to finalize record</p>
      </footer>
    </div>
  );
};

export default RecordSaleView;
