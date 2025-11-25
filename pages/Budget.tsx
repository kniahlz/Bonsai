import React, { useState } from 'react';
import { PieChart, AlertTriangle, Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { BUDGET_CATEGORIES, IRREGULAR_EXPENSES, INSIGHTS } from '../constants';

const Budget = () => {
  const [filter, setFilter] = useState<'ALL' | 'NEED' | 'WANT'>('ALL');

  const filteredCategories = BUDGET_CATEGORIES.filter(c => filter === 'ALL' || c.type === filter);
  
  // Sort by percent spent (descending)
  filteredCategories.sort((a, b) => (b.spent / b.limit) - (a.spent / a.limit));

  return (
    <div className="max-w-7xl mx-auto pb-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
      
      {/* Left Main Content */}
      <div className="lg:col-span-3 space-y-8">
        
        {/* Header & Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
           <div>
             <h2 className="text-3xl font-serif font-bold text-slate-800 dark:text-white">Monthly Envelopes</h2>
             <p className="text-slate-500 dark:text-slate-400 mt-1">Track your spending limits for October.</p>
           </div>
           <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg flex gap-1 transition-colors">
             {['ALL', 'NEED', 'WANT'].map((type) => (
               <button
                 key={type}
                 onClick={() => setFilter(type as any)}
                 className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                   filter === type 
                     ? 'bg-white dark:bg-slate-700 text-bonsai-700 dark:text-bonsai-300 shadow-sm' 
                     : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                 }`}
               >
                 {type === 'ALL' ? 'All Envelopes' : `${type.charAt(0) + type.slice(1).toLowerCase()}s`}
               </button>
             ))}
           </div>
        </div>

        {/* AI Insights Banner */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl p-4 flex items-start gap-4">
          <div className="bg-white dark:bg-indigo-900 p-2 rounded-full text-indigo-600 dark:text-indigo-300 shrink-0">
            <Sparkles size={20} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-200">Pattern Detected</h4>
            <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
              You consistently overspend on Dining Out in the last week of the month. 
              Try setting a "Week 4" specific limit of $50 to stay on track.
            </p>
          </div>
          <button className="text-xs font-bold text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800 px-3 py-1 rounded-lg transition-colors">
            ADJUST PLAN
          </button>
        </div>

        {/* Envelopes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCategories.map((cat) => {
            const percent = Math.min((cat.spent / cat.limit) * 100, 100);
            const isOver = cat.spent > cat.limit;
            const isHigh = percent > 90;
            
            return (
              <div key={cat.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-5 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-800 dark:text-white">{cat.name}</h3>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        cat.type === 'NEED' ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
                      }`}>
                        {cat.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      ${(cat.limit - cat.spent).toFixed(0)} remaining
                    </p>
                  </div>
                  <div className={`text-sm font-bold ${isOver ? 'text-rose-500' : 'text-slate-700 dark:text-slate-300'}`}>
                    ${cat.spent.toLocaleString()} 
                    <span className="text-slate-300 dark:text-slate-600 font-normal"> / ${cat.limit.toLocaleString()}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      isOver ? 'bg-rose-500' : isHigh ? 'bg-amber-400' : 'bg-bonsai-500'
                    }`}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>

                {/* Footer Status */}
                <div className="mt-3 flex justify-between items-center">
                  {isOver ? (
                    <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
                      <AlertTriangle size={12} />
                      <span>Over budget</span>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 dark:text-slate-500">On track</div>
                  )}
                  <button className="text-xs font-medium text-slate-400 hover:text-bonsai-600 dark:hover:text-bonsai-400 transition-colors">
                    View transactions
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Sidebar: Irregular Expenses */}
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 transition-colors">
          <div className="flex items-center gap-2 mb-4 text-slate-800 dark:text-white">
            <Calendar size={20} className="text-bonsai-600" />
            <h3 className="font-serif font-bold text-lg">Known Upcoming</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            These are irregular expenses we are saving for monthly so they don't surprise you.
          </p>

          <div className="space-y-5">
            {IRREGULAR_EXPENSES.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  <span>{item.title}</span>
                  <span>${item.amount}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Due {new Date(item.dueDate).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</span>
                  <span className={item.saved >= item.amount ? 'text-emerald-500' : 'text-bonsai-600 dark:text-bonsai-400'}>
                    ${item.saved} saved
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full">
                  <div 
                    className="bg-bonsai-400 h-1.5 rounded-full" 
                    style={{ width: `${(item.saved / item.amount) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-2 flex items-center justify-center gap-2 text-sm font-medium text-bonsai-700 dark:text-bonsai-300 border border-bonsai-200 dark:border-bonsai-800 rounded-lg hover:bg-bonsai-50 dark:hover:bg-bonsai-900/20 transition-colors">
            <React.Fragment>Add Expense</React.Fragment>
          </button>
        </div>
      </div>

    </div>
  );
};

export default Budget;