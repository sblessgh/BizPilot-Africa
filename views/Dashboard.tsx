
import React from 'react';
import { View, Product, Sale } from '../types';

interface DashboardProps {
  navigate: (view: View) => void;
  sales: Sale[];
  products: Product[];
}

const DashboardView: React.FC<DashboardProps> = ({ navigate, sales, products }) => {
  const totalSalesVal = sales.reduce((acc, s) => acc + s.totalPrice, 142500); // Base mock value
  const totalProfitVal = sales.reduce((acc, s) => acc + s.profit, 48200); // Base mock value
  const lowStockItems = products.filter(p => p.stock <= p.lowStockThreshold);

  return (
    <div className="p-4 pt-6 animate-in fade-in duration-500">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-full border-2 border-primary p-0.5">
            <div 
              className="w-full h-full rounded-full bg-cover bg-center" 
              style={{ backgroundImage: "url('https://picsum.photos/seed/user/100/100')" }}
            ></div>
          </div>
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Welcome back,</p>
            <h1 className="text-lg font-bold leading-tight">James Okoro</h1>
          </div>
        </div>
        <button className="relative p-2 rounded-xl bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-700">
          <span className="material-symbols-outlined text-zinc-900 dark:text-white">notifications</span>
          <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-800"></span>
        </button>
      </header>

      <section className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Daily Summary</h2>
            <span className="text-xs font-semibold text-primary">Today, Oct 24</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SummaryCard 
              label="Total Sales" 
              value={`GH₵${totalSalesVal.toLocaleString()}`} 
              growth="+12.5%" 
              icon="payments" 
            />
            <SummaryCard 
              label="Total Profit" 
              value={`GH₵${totalProfitVal.toLocaleString()}`} 
              growth="+8.2%" 
              icon="account_balance_wallet" 
            />
          </div>
        </div>

        <button 
          onClick={() => navigate('record-sale')}
          className="w-full bg-primary hover:bg-primary/90 transition-all py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-3 text-zinc-900 font-bold text-lg active:scale-95"
        >
          <span className="material-symbols-outlined font-bold">add_shopping_cart</span>
          Record Sale
        </button>

        {lowStockItems.length > 0 && (
          <section className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-600 dark:text-orange-400">warning</span>
                <h2 className="font-bold text-orange-900 dark:text-orange-100">Low Stock Alerts</h2>
              </div>
              <span className="bg-orange-200 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                {lowStockItems.length} Items
              </span>
            </div>
            <div className="space-y-3">
              {lowStockItems.slice(0, 3).map(p => (
                <div key={p.id} className="flex items-center justify-between bg-white/60 dark:bg-black/20 p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <img src={p.image} className="size-10 rounded-lg object-cover" alt={p.name} />
                    <div>
                      <p className="text-sm font-bold truncate max-w-[120px]">{p.name}</p>
                      <p className="text-xs text-red-600 font-medium">Only {p.stock} left</p>
                    </div>
                  </div>
                  <button onClick={() => navigate('products')} className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-3 py-1.5 rounded-lg text-xs font-bold">Restock</button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">Top Sellers</h2>
            <button onClick={() => navigate('products')} className="text-primary text-sm font-bold">View All</button>
          </div>
          <div className="space-y-4">
            {products.slice(0, 3).map(p => (
              <div key={p.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="size-14 rounded-xl bg-white dark:bg-white/5 border border-zinc-100 dark:border-zinc-800 overflow-hidden flex items-center justify-center p-1">
                    <img src={p.image} className="w-full h-full rounded-lg object-cover" alt={p.name} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{p.name}</p>
                    <p className="text-xs text-zinc-500">42 Units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-primary">GH₵{(p.price * 350).toLocaleString()}</p>
                  <p className="text-[10px] font-medium text-zinc-400">Total Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

const SummaryCard: React.FC<{ label: string; value: string; growth: string; icon: string }> = ({ label, value, growth, icon }) => (
  <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800">
    <div className="flex items-center gap-2 mb-2">
      <span className="material-symbols-outlined text-primary text-xl">{icon}</span>
      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{label}</p>
    </div>
    <p className="text-xl font-bold">{value}</p>
    <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-primary">
      <span className="material-symbols-outlined text-xs">trending_up</span>
      <span>{growth}</span>
    </div>
  </div>
);

export default DashboardView;
