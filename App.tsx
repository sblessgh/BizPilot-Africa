
import React, { useState, useEffect } from 'react';
import { View, Product, Sale } from './types';
import { INITIAL_PRODUCTS } from './constants';
import LoginView from './views/Login';
import DashboardView from './views/Dashboard';
import ProductListView from './views/ProductList';
import RecordSaleView from './views/RecordSale';
import AddProductView from './views/AddProduct';
import SalesHistoryView from './views/SalesHistory';
import ReportsView from './views/Reports';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [sales, setSales] = useState<Sale[]>([]);
  
  // Theme state initialized from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('bizpilot-theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply theme class to document element and persist to localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('bizpilot-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('bizpilot-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  // Navigation Logic
  const navigate = (view: View) => {
    setCurrentView(view);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    setCurrentView('products');
  };

  const handleRecordSale = (productId: string, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const totalPrice = product.price * quantity;
    const cost = product.price * 0.7; // Mock cost
    const profit = (product.price - cost) * quantity;

    const newSale: Sale = {
      id: Math.random().toString(36).substr(2, 9),
      productId,
      productName: product.name,
      quantity,
      totalPrice,
      profit,
      date: new Date().toISOString(),
    };

    setSales(prev => [newSale, ...prev]);
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, stock: Math.max(0, p.stock - quantity) } : p
    ));
    setCurrentView('dashboard');
  };

  if (!isLoggedIn) {
    return (
      <div className="relative">
        <button 
          onClick={toggleTheme}
          className="fixed top-4 right-4 z-[100] size-10 rounded-full bg-white dark:bg-zinc-800 shadow-lg flex items-center justify-center border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 transition-all hover:scale-110 active:scale-95"
          aria-label="Toggle Theme"
        >
          <span className="material-symbols-outlined text-xl">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        <LoginView onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white dark:bg-zinc-950 shadow-xl overflow-hidden flex flex-col relative transition-colors duration-300">
      {/* Universal Theme Toggle (Floats above headers) */}
      <button 
        onClick={toggleTheme}
        className="absolute top-4 right-4 z-[60] size-9 rounded-full bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm shadow-sm flex items-center justify-center border border-zinc-100 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 transition-all hover:scale-105 active:scale-95"
        aria-label="Toggle Theme"
      >
        <span className="material-symbols-outlined text-lg">
          {isDarkMode ? 'light_mode' : 'dark_mode'}
        </span>
      </button>

      <div className="flex-1 pb-24">
        {currentView === 'dashboard' && (
          <DashboardView 
            navigate={navigate} 
            sales={sales} 
            products={products} 
          />
        )}
        {currentView === 'products' && (
          <ProductListView 
            navigate={navigate} 
            products={products} 
          />
        )}
        {currentView === 'record-sale' && (
          <RecordSaleView 
            navigate={navigate} 
            products={products} 
            onRecord={handleRecordSale} 
          />
        )}
        {currentView === 'add-product' && (
          <AddProductView 
            navigate={navigate} 
            onSave={handleAddProduct} 
          />
        )}
        {currentView === 'sales' && (
          <SalesHistoryView 
            navigate={navigate} 
            sales={sales} 
          />
        )}
        {currentView === 'reports' && (
          <ReportsView 
            navigate={navigate} 
            sales={sales} 
          />
        )}
        {currentView === 'settings' && (
          <div className="p-10 text-center">
            <h2 className="text-xl font-bold mb-4 capitalize">Settings</h2>
            <p className="text-zinc-500">Profile and preferences coming soon.</p>
            <button onClick={() => navigate('dashboard')} className="mt-4 text-primary font-bold">Back Home</button>
          </div>
        )}
      </div>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-t border-zinc-100 dark:border-zinc-800 px-6 pb-6 pt-3 flex justify-between items-center z-50">
        <NavButton 
          icon="home" 
          label="Home" 
          active={currentView === 'dashboard'} 
          onClick={() => navigate('dashboard')} 
        />
        <NavButton 
          icon="inventory_2" 
          label="Products" 
          active={currentView === 'products'} 
          onClick={() => navigate('products')} 
        />
        <NavButton 
          icon="receipt_long" 
          label="Sales" 
          active={currentView === 'sales'} 
          onClick={() => navigate('sales')} 
        />
        <NavButton 
          icon="query_stats" 
          label="Reports" 
          active={currentView === 'reports'} 
          onClick={() => navigate('reports')} 
        />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ icon: string; label: string; active: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-1 flex-col items-center gap-1 transition-colors ${active ? 'text-primary' : 'text-zinc-400 dark:text-zinc-500'}`}
  >
    <span className={`material-symbols-outlined text-2xl ${active ? 'filled-icon' : ''}`}>{icon}</span>
    <span className="text-[10px] font-bold uppercase tracking-wide">{label}</span>
  </button>
);

export default App;
