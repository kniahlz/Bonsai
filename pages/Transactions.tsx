import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { RECENT_TRANSACTIONS, ACCOUNTS } from '../constants';
import { TransactionType } from '../types';

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Derived categories for filter dropdown
  const categories = ['All', ...Array.from(new Set(RECENT_TRANSACTIONS.map(t => t.category)))];

  const filteredTransactions = RECENT_TRANSACTIONS.filter(t => {
    const matchesSearch = t.merchant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto pb-10 space-y-6">
      
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-800 dark:text-white">Transactions</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">View and manage your activity.</p>
        </div>
        <button className="text-sm font-medium text-bonsai-600 dark:text-bonsai-400 hover:text-bonsai-700 dark:hover:text-bonsai-300">
          Export CSV
        </button>
      </div>

      {/* Controls Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between transition-colors">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search merchant..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-bonsai-400 focus:ring-1 focus:ring-bonsai-400 transition-all dark:text-white dark:placeholder-slate-500"
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <Filter size={16} />
              <span>{selectedCategory}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
            {/* Dropdown (Simplified for this demo) */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-lg p-1 hidden group-hover:block z-10">
              {categories.map(c => (
                <button 
                  key={c} 
                  onClick={() => setSelectedCategory(c)}
                  className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden transition-colors">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Merchant</th>
              <th className="px-6 py-4">Account</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredTransactions.map((t) => {
              const accountName = ACCOUNTS.find(a => a.id === t.accountId)?.name || 'Unknown Account';
              return (
                <tr key={t.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {new Date(t.date).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                    <div className="flex items-center gap-3">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center ${t.type === TransactionType.INCOME ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                         {t.type === TransactionType.INCOME ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
                       </div>
                       {t.merchant}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">
                    {accountName}
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-bonsai-100 dark:hover:bg-bonsai-900/30 hover:text-bonsai-700 dark:hover:text-bonsai-300 transition-colors">
                      {t.category}
                    </button>
                  </td>
                  <td className={`px-6 py-4 text-sm font-bold text-right ${t.type === TransactionType.INCOME ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                    {t.type === TransactionType.INCOME ? '+' : ''}${t.amount.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {filteredTransactions.length === 0 && (
          <div className="p-12 text-center text-slate-400">
            No transactions found matching your criteria.
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button className="text-sm font-medium text-slate-500 hover:text-bonsai-600 dark:text-slate-400 dark:hover:text-bonsai-400 transition-colors">
          Load more transactions
        </button>
      </div>

    </div>
  );
};

export default Transactions;