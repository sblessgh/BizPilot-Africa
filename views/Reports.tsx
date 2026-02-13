
import React, { useState, useEffect } from 'react';
import { View, Sale } from '../types';
import { analyzeSales } from '../services/geminiService';

interface ReportsProps {
  navigate: (view: View) => void;
  sales: Sale[];
}

const ReportsView: React.FC<ReportsProps> = ({ navigate, sales }) => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchInsight = async () => {
      if (sales.length > 0) {
        setLoading(true);
        const result = await analyzeSales(sales);
        setInsight(result || '');
        setLoading(false);
      }
    };
    fetchInsight();
  }, [sales]);

  const totalRevenue = sales.reduce((acc, s) => acc + s.totalPrice, 0);
  const totalProfit = sales.reduce((acc, s) => acc + s.profit, 0);

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      <header className="p-4 border-b dark:border-zinc-800">
        <h1 className="text-xl font-bold">Business Insights</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-10">
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900 dark:bg-zinc-800 p-4 rounded-xl text-white">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Total Revenue</p>
            <p className="text-xl font-bold">GH₵ {totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-primary p-4 rounded-xl text-zinc-900">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-900/60 mb-1">Total Profit</p>
            <p className="text-xl font-bold">GH₵ {totalProfit.toLocaleString()}</p>
          </div>
        </section>

        <section className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
            <h2 className="font-bold">AI Performance Analysis</h2>
          </div>
          
          {loading ? (
            <div className="flex flex-col gap-2 py-4">
              <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse w-5/6"></div>
              <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse w-4/6"></div>
            </div>
          ) : sales.length === 0 ? (
            <p className="text-sm text-zinc-500 italic">Record some sales to see AI insights about your shop's performance.</p>
          ) : (
            <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-2 leading-relaxed">
              {insight.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-4">
          <h2 className="font-bold text-lg">Sales Trend</h2>
          <div className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-xl p-4 h-48 flex items-end justify-around gap-2">
            {[30, 45, 60, 35, 70, 90, 65].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-primary/20 rounded-t-md relative group cursor-pointer overflow-hidden" 
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute inset-x-0 bottom-0 bg-primary h-0 group-hover:h-full transition-all duration-500"></div>
                </div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ReportsView;
