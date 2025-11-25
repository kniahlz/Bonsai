import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  CreditCard, 
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  MoreHorizontal,
  Sprout,
  Target,
  Home,
  Car,
  Banknote,
  Landmark
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { ACCOUNTS, GOALS, BUDGET_CATEGORIES, INSIGHTS, RECENT_TRANSACTIONS } from '../constants';
import { TransactionType } from '../types';
import { useTheme } from '../context/ThemeContext';

const Overview = () => {
  const { theme } = useTheme();
  // Derived State
  const netWorth = ACCOUNTS.reduce((acc, curr) => acc + curr.balance, 0);
  
  // Asset Grouping
  const assets = ACCOUNTS.filter(a => a.balance > 0);
  const totalAssets = assets.reduce((acc, curr) => acc + curr.balance, 0);
  
  const cashAssets = assets.filter(a => ['CHECKING', 'SAVINGS'].includes(a.type)).reduce((acc, c) => acc + c.balance, 0);
  const investAssets = assets.filter(a => a.type === 'INVESTMENT').reduce((acc, c) => acc + c.balance, 0);
  const propertyAssets = assets.filter(a => ['REAL_ESTATE', 'VEHICLE'].includes(a.type)).reduce((acc, c) => acc + c.balance, 0);

  // Liability Grouping
  const liabilities = ACCOUNTS.filter(a => a.balance < 0);
  const totalDebt = liabilities.reduce((acc, curr) => acc + Math.abs(curr.balance), 0);
  
  const mortgageDebt = liabilities.filter(a => a.type === 'LOAN' && a.name.toLowerCase().includes('mortgage')).reduce((acc, c) => acc + Math.abs(c.balance), 0);
  const consumerDebt = totalDebt - mortgageDebt;

  // Mock Data for Net Worth Chart
  const netWorthData = [
    { name: 'Jan', value: 152000 },
    { name: 'Feb', value: 156000 },
    { name: 'Mar', value: 165000 },
    { name: 'Apr', value: 168000 },
    { name: 'May', value: 172000 },
    { name: 'Jun', value: 176000 },
    { name: 'Jul', value: netWorth }, // Current
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-800 dark:text-white">Good Morning, Alex</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Here is what's happening in your financial garden today.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            Add Account
          </button>
          <button className="bg-bonsai-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-bonsai-700 shadow-md shadow-bonsai-200 dark:shadow-none transition-all">
            View Full Report
          </button>
        </div>
      </section>

      {/* Goal Status Banner */}
      <section className="bg-bonsai-900 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500 opacity-10 rounded-full -ml-10 -mb-10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
          
          {/* Summary Text */}
          <div className="flex items-center gap-5 min-w-[240px]">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner">
              <Target size={32} className="text-emerald-300" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-white">On Track</h3>
              <p className="text-bonsai-200 text-sm mt-1">You are meeting 100% of your monthly targets.</p>
            </div>
          </div>

          {/* Vertical Separator (Desktop) */}
          <div className="hidden lg:block w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

          {/* Goals Grid */}
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            {GOALS.slice(0,3).map((goal) => {
              const percent = Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100);
              return (
                <div key={goal.id} className="bg-black/20 hover:bg-black/30 transition-colors rounded-xl p-4 border border-white/5 flex flex-col justify-center group cursor-default">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-white/90 truncate pr-2">{goal.title}</span>
                    {goal.type === 'DEBT' ? (
                        <span className="text-[10px] font-bold bg-rose-500/20 text-rose-200 px-1.5 py-0.5 rounded">DEBT</span>
                    ) : (
                        <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-200 px-1.5 py-0.5 rounded">SAVE</span>
                    )}
                  </div>
                  
                  <div className="flex items-end justify-between mb-2">
                     <span className="text-xs text-white/60">${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}</span>
                     <span className="text-sm font-bold text-white">{percent}%</span>
                  </div>

                  <div className="w-full bg-black/30 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${goal.type === 'DEBT' ? 'bg-rose-400' : 'bg-emerald-400'}`} 
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Net Worth Banner (Full Width) */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden transition-colors">
        <div className="flex flex-col lg:flex-row gap-8 justify-between">
          {/* Left Metrics */}
          <div className="min-w-[280px] space-y-6">
             <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-600 dark:text-emerald-400">
                   <Sprout size={24} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-800 dark:text-white">Net Worth</h3>
             </div>
             
             <div>
                 <div className="text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
                     ${netWorth.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                 </div>
                 <div className="flex items-center gap-2 mt-3">
                     <span className="flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                         <ArrowUpRight size={16} className="mr-1" /> +4.2%
                     </span>
                     <span className="text-slate-400 dark:text-slate-500 text-sm">vs last month</span>
                 </div>
             </div>

             <div className="pt-6 border-t border-slate-50 dark:border-slate-800 hidden lg:block">
                <p className="text-xs uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mb-3">The Equation</p>
                <div className="flex items-center gap-4 text-sm">
                     <div>
                         <span className="block font-bold text-xl text-slate-700 dark:text-slate-200">${totalAssets.toLocaleString()}</span>
                         <span className="text-xs text-slate-400">Total Assets</span>
                     </div>
                     <span className="text-2xl font-serif text-slate-200 dark:text-slate-700">-</span>
                     <div>
                         <span className="block font-bold text-xl text-slate-700 dark:text-slate-200">${totalDebt.toLocaleString()}</span>
                         <span className="text-xs text-slate-400">Total Debt</span>
                     </div>
                </div>
             </div>
          </div>
          
          {/* Right Chart */}
          <div className="flex-1 h-[280px] w-full min-w-0 pt-4 lg:pt-0">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={netWorthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#475569" strokeOpacity={0.1} />
                 <XAxis 
                     dataKey="name" 
                     axisLine={false} 
                     tickLine={false} 
                     tick={{fill: '#94a3b8', fontSize: 12}} 
                     dy={10}
                 />
                 <YAxis 
                     axisLine={false} 
                     tickLine={false} 
                     tick={{fill: '#94a3b8', fontSize: 12}} 
                     tickFormatter={(value) => `$${value/1000}k`}
                 />
                 <Tooltip 
                     contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                     formatter={(value: number) => [`$${value.toLocaleString()}`, 'Net Worth']}
                 />
                 <Area 
                     type="monotone" 
                     dataKey="value" 
                     stroke="#10b981" 
                     strokeWidth={3} 
                     fillOpacity={1} 
                     fill="url(#colorNetWorth)" 
                     activeDot={{ r: 6, strokeWidth: 0, stroke: '#fff' }}
                 />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Assets & Liabilities Split */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Assets Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                <Landmark size={20} />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-white">Total Assets</h3>
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-white">${totalAssets.toLocaleString()}</span>
          </div>

          <div className="space-y-5 mt-auto">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Home size={14} className="text-slate-400 dark:text-slate-500" />
                  <span>Property & Vehicles</span>
                </div>
                <span className="font-medium text-slate-800 dark:text-slate-200">${propertyAssets.toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-50 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(propertyAssets/totalAssets)*100}%` }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                 <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <TrendingUp size={14} className="text-slate-400 dark:text-slate-500" />
                  <span>Investments</span>
                </div>
                <span className="font-medium text-slate-800 dark:text-slate-200">${investAssets.toLocaleString()}</span>
              </div>
               <div className="w-full bg-slate-50 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(investAssets/totalAssets)*100}%` }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                 <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Banknote size={14} className="text-slate-400 dark:text-slate-500" />
                  <span>Cash</span>
                </div>
                <span className="font-medium text-slate-800 dark:text-slate-200">${cashAssets.toLocaleString()}</span>
              </div>
               <div className="w-full bg-slate-50 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${(cashAssets/totalAssets)*100}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Liabilities Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded-lg text-rose-600 dark:text-rose-400">
                <CreditCard size={20} />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-white">Total Debt</h3>
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-white">${totalDebt.toLocaleString()}</span>
          </div>

          <div className="space-y-5 mt-auto">
             <div className="space-y-2">
               <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Home size={14} className="text-slate-400 dark:text-slate-500" />
                  <span>Mortgages</span>
                </div>
                <span className="font-medium text-slate-800 dark:text-slate-200">${mortgageDebt.toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-50 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-300 h-full rounded-full" style={{ width: `${(mortgageDebt/totalDebt)*100}%` }}></div>
              </div>
            </div>

             <div className="space-y-2">
               <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Car size={14} className="text-slate-400 dark:text-slate-500" />
                  <span>Consumer & Auto</span>
                </div>
                <span className="font-medium text-slate-800 dark:text-slate-200">${consumerDebt.toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-50 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: `${(consumerDebt/totalDebt)*100}%` }}></div>
              </div>
            </div>
             
             <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-xl mt-4 text-xs text-rose-800 dark:text-rose-200 leading-relaxed border border-rose-100 dark:border-rose-800">
               <strong>Strategy:</strong> Focusing on high-interest credit card debt first will save you ~$450 this year in interest.
             </div>
          </div>
        </div>

      </section>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Goals & Plan */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Plan / Goals */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 transition-colors">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-white">Your Plan Progress</h3>
              <button className="text-bonsai-600 dark:text-bonsai-400 text-sm font-medium hover:text-bonsai-700 dark:hover:text-bonsai-300">Edit Plan</button>
            </div>
            
            <div className="space-y-6">
              {GOALS.map((goal) => (
                <div key={goal.id} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${goal.type === 'DEBT' ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400' : 'bg-bonsai-50 text-bonsai-600 dark:bg-bonsai-900/20 dark:text-bonsai-400'}`}>
                         <CheckCircle2 size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{goal.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{goal.type === 'DEBT' ? 'Payoff Goal' : 'Savings Goal'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800 dark:text-white">${goal.currentAmount.toLocaleString()} <span className="text-slate-400 dark:text-slate-600 font-normal">/ ${goal.targetAmount.toLocaleString()}</span></p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${goal.type === 'DEBT' ? 'bg-rose-500' : 'bg-bonsai-500'}`} 
                      style={{ width: `${(goal.currentAmount / goal.targetAmount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spending Trends Chart */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 transition-colors">
             <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-white">Spending vs. Budget</h3>
               <select className="bg-slate-50 dark:bg-slate-800 border-none text-sm text-slate-600 dark:text-slate-300 rounded-lg px-3 py-1 focus:ring-0 outline-none">
                 <option>This Month</option>
                 <option>Last Month</option>
               </select>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BUDGET_CATEGORIES} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                   <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#475569" strokeOpacity={0.1} />
                   <XAxis type="number" hide />
                   <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12, fill: '#64748b'}} />
                   <Tooltip 
                      cursor={{fill: '#f8fafc', opacity: 0.1}}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(255,255,255,0.9)' }} 
                   />
                   <Bar dataKey="limit" fill="#f1f5f9" radius={[0, 4, 4, 0]} barSize={20} />
                   <Bar dataKey="spent" radius={[0, 4, 4, 0]} barSize={20}>
                      {BUDGET_CATEGORIES.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.spent > entry.limit ? '#f43f5e' : '#3e9f82'} />
                      ))}
                   </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Insights & Transactions */}
        <div className="space-y-8">
          
          {/* Miyagi Insights */}
          <div className="bg-gradient-to-br from-bonsai-50 to-emerald-50 dark:from-bonsai-900/40 dark:to-emerald-900/40 rounded-2xl p-6 border border-bonsai-100 dark:border-bonsai-800/50 transition-colors">
             <div className="flex items-center gap-2 mb-4 text-bonsai-800 dark:text-bonsai-200">
               <Sprout size={20} />
               <h3 className="font-serif font-bold">Miyagi's Insights</h3>
             </div>
             <div className="space-y-4">
                {INSIGHTS.map((insight) => (
                  <div key={insight.id} className="bg-white/60 dark:bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-white dark:border-white/10 shadow-sm">
                    <div className="flex items-start gap-3">
                      {insight.type === 'WARNING' ? (
                        <AlertCircle size={18} className="text-amber-500 mt-0.5 shrink-0" />
                      ) : (
                        <TrendingUp size={18} className="text-bonsai-600 dark:text-bonsai-400 mt-0.5 shrink-0" />
                      )}
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{insight.title}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{insight.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
             <button className="w-full mt-4 py-2 text-xs font-bold text-bonsai-700 dark:text-bonsai-300 hover:bg-white/50 dark:hover:bg-white/10 rounded-lg transition-colors uppercase tracking-wide">
               View all analysis
             </button>
          </div>

          {/* Recent Transactions List */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 transition-colors">
             <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-white">Recent Activity</h3>
              <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {RECENT_TRANSACTIONS.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors -mx-2 cursor-pointer">
                   <div className="flex items-center gap-3">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${t.type === TransactionType.INCOME ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-slate-100 dark:bg-slate-800'}`}>
                       {t.type === TransactionType.INCOME ? '💰' : '🛍️'}
                     </div>
                     <div>
                       <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{t.merchant}</p>
                       <p className="text-xs text-slate-500 dark:text-slate-400">{t.category} • {new Date(t.date).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</p>
                     </div>
                   </div>
                   <span className={`font-bold text-sm ${t.type === TransactionType.INCOME ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
                     {t.type === TransactionType.INCOME ? '+' : '-'}${t.amount.toFixed(2)}
                   </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Overview;