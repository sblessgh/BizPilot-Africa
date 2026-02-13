
import React, { useState } from 'react';
import { View, Product } from '../types';
import { CATEGORIES } from '../constants';
import { generateProductDescription } from '../services/geminiService';

interface AddProductProps {
  navigate: (view: View) => void;
  onSave: (product: Product) => void;
}

const AddProductView: React.FC<AddProductProps> = ({ navigate, onSave }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState(CATEGORIES[2]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiDescription, setAiDescription] = useState('');

  const handleSave = () => {
    if (!name || !price || !stock) return;
    
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
      category,
      image: `https://picsum.photos/seed/${name}/200/200`,
      lowStockThreshold: 5,
    };
    onSave(newProduct);
  };

  const handleGenerateAI = async () => {
    if (!name) return;
    setIsGenerating(true);
    const desc = await generateProductDescription(name, category);
    setAiDescription(desc || '');
    setIsGenerating(false);
  };

  return (
    <div className="flex h-screen w-full flex-col bg-white dark:bg-zinc-950 overflow-hidden animate-in slide-in-from-right duration-300">
      <header className="flex items-center bg-white dark:bg-zinc-950 p-4 border-b border-zinc-100 dark:border-zinc-800 sticky top-0 z-10">
        <button 
          onClick={() => navigate('products')}
          className="text-zinc-900 dark:text-white flex size-10 shrink-0 items-center justify-center hover:bg-primary/10 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-zinc-900 dark:text-white text-lg font-bold ml-2 flex-1">Add New Product</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-zinc-900 dark:text-white/90 text-sm font-semibold">Product Name</label>
          <input 
            className="form-input w-full rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:border-primary focus:ring-2 focus:ring-primary/20 h-14 p-4 text-base transition-all" 
            placeholder="e.g., Organic Fertilizer" 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-zinc-900 dark:text-white/90 text-sm font-semibold">Category</label>
          <select 
            className="form-select w-full rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:border-primary focus:ring-2 focus:ring-primary/20 h-14 p-4 text-base"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.filter(c => c !== 'All' && c !== 'Low Stock').map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-zinc-900 dark:text-white/90 text-sm font-semibold">Price per Unit (GH₵)</label>
          <div className="flex w-full items-stretch group">
            <div className="flex items-center justify-center px-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 border-r-0 rounded-l-xl text-zinc-500 font-bold">GH₵</div>
            <input 
              className="form-input flex w-full rounded-r-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:border-primary focus:ring-2 focus:ring-primary/20 h-14 p-4 text-base border-l-0" 
              inputmode="decimal" 
              placeholder="0.00" 
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-zinc-900 dark:text-white/90 text-sm font-semibold">Initial Stock Quantity</label>
          <div className="relative flex items-center">
            <input 
              className="form-input w-full rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:border-primary focus:ring-2 focus:ring-primary/20 h-14 p-4 pr-12 text-base" 
              inputmode="numeric" 
              placeholder="0" 
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <div className="absolute right-4 text-zinc-400 flex items-center pointer-events-none">
              <span className="material-symbols-outlined">inventory_2</span>
            </div>
          </div>
        </div>

        {/* AI Enhancement */}
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white">AI Assistant</h4>
            </div>
            <button 
              onClick={handleGenerateAI}
              disabled={!name || isGenerating}
              className="text-xs font-bold text-primary hover:underline disabled:text-zinc-400"
            >
              {isGenerating ? 'Generating...' : 'Suggest Description'}
            </button>
          </div>
          {aiDescription && (
            <p className="text-xs text-zinc-600 dark:text-zinc-300 italic animate-in fade-in slide-in-from-top-1">
              "{aiDescription}"
            </p>
          )}
        </div>

        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
          <div className="size-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">add_photo_alternate</span>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Product Photos</h4>
            <p className="text-xs text-zinc-500">Upload photos to increase sales.</p>
          </div>
          <span className="material-symbols-outlined text-zinc-400">chevron_right</span>
        </div>
      </main>

      <footer className="p-4 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800">
        <button 
          onClick={handleSave}
          className="w-full flex items-center justify-center rounded-xl h-14 px-5 bg-primary text-zinc-900 text-base font-bold shadow-lg shadow-primary/20 hover:brightness-105 active:scale-[0.98] transition-all"
        >
          Save Product
        </button>
      </footer>
    </div>
  );
};

export default AddProductView;
