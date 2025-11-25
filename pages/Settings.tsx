import React from 'react';
import { User, Shield, Bell, LogOut, PlusCircle, Trash2, CreditCard, Monitor, Moon, Sun } from 'lucide-react';
import { ACCOUNTS } from '../constants';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-3xl mx-auto pb-20 space-y-8">
      
      <div>
        <h2 className="text-3xl font-serif font-bold text-slate-800 dark:text-white">Settings</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your profile and connections.</p>
      </div>

      {/* Appearance Section (New) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Monitor size={20} className="text-bonsai-600" />
            Appearance
          </h3>
        </div>
        <div className="p-6">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Select your preferred interface theme.</p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setTheme('light')}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                theme === 'light' 
                  ? 'bg-bonsai-50 border-bonsai-500 text-bonsai-800 dark:bg-bonsai-900/30 dark:text-bonsai-100' 
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-bonsai-300 dark:hover:border-bonsai-700'
              }`}
            >
              <Sun size={18} />
              <span className="font-medium text-sm">Light Mode</span>
            </button>
            <button 
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                theme === 'dark' 
                  ? 'bg-bonsai-50 border-bonsai-500 text-bonsai-800 dark:bg-bonsai-900/30 dark:text-bonsai-100' 
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-bonsai-300 dark:hover:border-bonsai-700'
              }`}
            >
              <Moon size={18} />
              <span className="font-medium text-sm">Dark Mode</span>
            </button>
            <button 
              onClick={() => setTheme('system')}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                theme === 'system' 
                  ? 'bg-bonsai-50 border-bonsai-500 text-bonsai-800 dark:bg-bonsai-900/30 dark:text-bonsai-100' 
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-bonsai-300 dark:hover:border-bonsai-700'
              }`}
            >
              <Monitor size={18} />
              <span className="font-medium text-sm">System Default</span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <User size={20} className="text-bonsai-600" />
            Profile Details
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-bonsai-100 dark:bg-slate-800 border-4 border-white dark:border-slate-700 shadow-md overflow-hidden">
               <img src="https://picsum.photos/200" alt="User" className="w-full h-full object-cover" />
            </div>
            <div>
              <button className="text-sm font-bold text-bonsai-700 dark:text-bonsai-400 hover:underline">Change Photo</button>
              <p className="text-xs text-slate-400 mt-1">JPG or PNG. Max 1MB.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-2">Full Name</label>
              <input type="text" defaultValue="Alex Smith" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-800 dark:text-white focus:border-bonsai-400 focus:outline-none focus:ring-1 focus:ring-bonsai-400" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-2">Email Address</label>
              <input type="email" defaultValue="alex.smith@example.com" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-800 dark:text-white focus:border-bonsai-400 focus:outline-none focus:ring-1 focus:ring-bonsai-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Linked Accounts */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Shield size={20} className="text-bonsai-600" />
            Linked Accounts
          </h3>
          <button className="flex items-center gap-1 text-sm font-bold text-bonsai-600 dark:text-bonsai-400 hover:text-bonsai-700">
            <PlusCircle size={16} />
            Link New
          </button>
        </div>
        <div className="divide-y divide-slate-50 dark:divide-slate-800">
          {ACCOUNTS.map(account => (
            <div key={account.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400">
                  <CreditCard size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{account.name}</p>
                  <p className="text-xs text-slate-400">Last synced: {account.lastUpdated}</p>
                </div>
              </div>
              <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Bell size={20} className="text-bonsai-600" />
            Preferences
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
             <div>
               <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Weekly Report</p>
               <p className="text-xs text-slate-500 dark:text-slate-400">Receive a summary of your spending every Sunday.</p>
             </div>
             <div className="w-11 h-6 bg-bonsai-500 rounded-full relative cursor-pointer">
               <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
             </div>
          </div>
          <div className="flex items-center justify-between">
             <div>
               <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Miyagi Hints</p>
               <p className="text-xs text-slate-500 dark:text-slate-400">Allow Miyagi to offer unsolicited advice on the dashboard.</p>
             </div>
             <div className="w-11 h-6 bg-bonsai-500 rounded-full relative cursor-pointer">
               <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
             </div>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-center">
        <button className="text-rose-600 font-medium text-sm flex items-center gap-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 px-4 py-2 rounded-lg transition-colors">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>

    </div>
  );
};

export default Settings;