import React from 'react';
import { Target, Shield, CreditCard, Plane, Plus, ChevronRight, ArrowRight } from 'lucide-react';
import { GOALS, ACCOUNTS } from '../constants';

const Plan = () => {
  const totalMonthlyIncome = 6400; // Mocked derived from transactions
  const totalMonthlyFixedCosts = 3200; // Mocked
  const freeCashFlow = totalMonthlyIncome - totalMonthlyFixedCosts;

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif font-bold text-bonsai-900 dark:text-white">Your Master Plan</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Miyagi has analyzed your finances. Here is the optimal path to cultivate your wealth, prioritizing stability, debt elimination, and then growth.
        </p>
      </div>

      {/* Cash Flow Summary */}
      <div className="bg-bonsai-900 rounded-2xl p-8 shadow-xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-bonsai-800 rounded-full -mr-16 -mt-16 opacity-50 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <p className="text-bonsai-200 font-medium mb-1">Monthly Free Cash Flow</p>
            <h3 className="text-5xl font-serif font-bold">${freeCashFlow.toLocaleString()}</h3>
            <p className="text-sm text-bonsai-300 mt-2">Available after Needs & Fixed Bills</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-bonsai-700 hidden md:block"></div>
            <div className="text-right">
              <p className="text-2xl font-bold text-bonsai-100">3 Goals</p>
              <p className="text-xs text-bonsai-400">Currently Active</p>
            </div>
             <div className="h-12 w-px bg-bonsai-700 hidden md:block"></div>
             <div className="text-right">
              <p className="text-2xl font-bold text-bonsai-100">Jun 2025</p>
              <p className="text-xs text-bonsai-400">Projected Debt Free</p>
            </div>
          </div>
        </div>
      </div>

      {/* The Steps (Waterfall) */}
      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-8 md:before:ml-[50%] before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700 before:z-0">
        
        {/* Step 1: Buffer */}
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 group">
          <div className="flex-1 md:text-right order-2 md:order-1">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">1. Monthly Bill Buffer</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Ensure 1 month of expenses sits in checking to avoid overdrafts.</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 border-4 border-white dark:border-slate-900 shadow-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 order-1 md:order-2">
            <Shield size={24} />
          </div>
          <div className="flex-1 order-3">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
               <div className="flex justify-between text-sm mb-2">
                 <span className="font-medium text-emerald-700 dark:text-emerald-400">Complete</span>
                 <span className="text-slate-400">$3,200 / $3,200</span>
               </div>
               <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                 <div className="bg-emerald-500 h-2 rounded-full w-full"></div>
               </div>
            </div>
          </div>
        </div>

        {/* Step 2: Debt */}
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 group">
          <div className="flex-1 md:text-right order-2 md:order-1">
             <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border-l-4 border-rose-500 shadow-sm border-y border-r border-y-slate-100 dark:border-y-slate-800 dark:border-r-slate-800">
               <h4 className="font-bold text-slate-800 dark:text-white">Chase Sapphire</h4>
               <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">24.99% APR • High Priority</p>
               <div className="flex justify-between text-sm mb-1">
                 <span className="font-medium text-slate-700 dark:text-slate-300">$800 paid</span>
                 <span className="text-slate-400">of $2,450</span>
               </div>
               <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                 <div className="bg-rose-500 h-2 rounded-full" style={{ width: '32%' }}></div>
               </div>
               <div className="mt-3 flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 font-medium">
                 <span>Allocating $400/mo</span>
                 <ArrowRight size={12} />
               </div>
            </div>
          </div>
          <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/50 border-4 border-white dark:border-slate-900 shadow-lg flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0 order-1 md:order-2 ring-4 ring-rose-50 dark:ring-rose-900/20">
            <CreditCard size={24} />
          </div>
          <div className="flex-1 order-3">
             <h3 className="text-xl font-bold text-slate-800 dark:text-white">2. Toxic Debt Elimination</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Paying off high-interest credit cards is your best guaranteed return on investment.</p>
          </div>
        </div>

        {/* Step 3: Emergency Fund */}
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 group opacity-75">
          <div className="flex-1 md:text-right order-2 md:order-1">
             <h3 className="text-xl font-bold text-slate-800 dark:text-white">3. Emergency Fund</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Build 3-6 months of living expenses for true peace of mind.</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 border-4 border-white dark:border-slate-900 shadow-lg flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 order-1 md:order-2">
            <Shield size={24} />
          </div>
          <div className="flex-1 order-3">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
               <div className="flex justify-between text-sm mb-2">
                 <span className="font-medium text-slate-700 dark:text-slate-300">In Progress</span>
                 <span className="text-slate-400">$15k / $20k</span>
               </div>
               <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                 <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
               </div>
            </div>
          </div>
        </div>

        {/* Step 4: Custom Goals */}
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 group opacity-50">
          <div className="flex-1 md:text-right order-2 md:order-1">
             <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
               <div className="flex justify-between text-sm mb-2">
                 <span className="font-medium text-slate-700 dark:text-slate-300">Vacation to Italy</span>
                 <span className="text-slate-400">$2,400 / $8,000</span>
               </div>
               <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                 <div className="bg-purple-500 h-2 rounded-full" style={{ width: '30%' }}></div>
               </div>
            </div>
          </div>
          <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/50 border-4 border-white dark:border-slate-900 shadow-lg flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 order-1 md:order-2">
            <Plane size={24} />
          </div>
          <div className="flex-1 order-3">
             <h3 className="text-xl font-bold text-slate-800 dark:text-white">4. Life Goals</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Once debt is gone and safety is secured, the sky is the limit.</p>
          </div>
        </div>

      </div>

      {/* Add Goal Action */}
      <div className="flex justify-center pt-8">
        <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-bonsai-300 dark:hover:border-bonsai-700 text-slate-600 dark:text-slate-300 hover:text-bonsai-700 dark:hover:text-bonsai-400 rounded-full font-medium transition-all shadow-sm hover:shadow-md">
          <Plus size={18} />
          <span>Add New Goal</span>
        </button>
      </div>

    </div>
  );
};

export default Plan;