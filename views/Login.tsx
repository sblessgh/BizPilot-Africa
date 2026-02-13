
import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const LoginView: React.FC<LoginProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 8) {
      onLogin();
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-xl shadow-xl overflow-hidden flex flex-col">
        <div className="pt-10 pb-6 px-6 flex flex-col items-center text-center">
          <div className="size-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-primary text-4xl filled-icon">inventory_2</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mb-2">BizPilot Africa</h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg font-medium leading-tight max-w-[240px]">
            Stop losing money from stock mistakes
          </p>
        </div>

        <div className="px-6 pb-8">
          <div className="mb-8">
            <h2 className="text-zinc-900 dark:text-white text-base font-semibold mb-1">Welcome back</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Enter your phone number to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Phone Number</label>
              <div className="flex gap-2 h-14">
                <div className="relative w-32">
                  <select className="w-full h-full rounded-lg border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm focus:ring-primary focus:border-primary appearance-none pl-3 pr-8">
                    <option value="NG">🇳🇬 +234</option>
                    <option value="GH">🇬🇭 +233</option>
                    <option value="KE">🇰🇪 +254</option>
                  </select>
                  <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-zinc-400 text-sm">expand_more</span>
                  </div>
                </div>
                <input 
                  className="flex-1 h-full rounded-lg border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-base focus:ring-primary focus:border-primary placeholder:text-zinc-400" 
                  inputmode="numeric" 
                  placeholder="801 234 5678" 
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <button 
              className="w-full bg-primary hover:bg-opacity-90 text-zinc-900 font-bold py-4 rounded-lg transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2" 
              type="submit"
            >
              Send OTP
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </form>

          <div className="mt-10 flex flex-col gap-4 items-center">
            <button className="text-primary font-semibold text-sm hover:underline flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">storefront</span>
              I’m a new shop
            </button>
            <button className="text-zinc-500 dark:text-zinc-400 font-medium text-sm hover:text-zinc-800 dark:hover:text-zinc-200">
              Existing shop
            </button>
          </div>
        </div>

        <div className="h-32 w-full relative overflow-hidden bg-primary/10">
          <div className="absolute inset-0 flex items-center justify-around opacity-20">
            <span className="material-symbols-outlined text-6xl text-primary">analytics</span>
            <span className="material-symbols-outlined text-6xl text-primary">bar_chart</span>
            <span className="material-symbols-outlined text-6xl text-primary">trending_up</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent"></div>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 text-zinc-400 dark:text-zinc-600 text-xs font-medium uppercase tracking-widest">
        <span className="material-symbols-outlined text-xs">lock</span>
        Secure Stock Management
      </div>
    </div>
  );
};

export default LoginView;
