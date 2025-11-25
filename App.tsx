import React, { useState } from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Target, 
  PieChart, 
  CreditCard, 
  Settings as SettingsIcon, 
  Search, 
  Sprout,
  Bell
} from 'lucide-react';
import Overview from './pages/Overview';
import Plan from './pages/Plan';
import Budget from './pages/Budget';
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';
import { MiyagiDrawer } from './components/MiyagiDrawer';
import { ThemeProvider } from './context/ThemeContext';

const SidebarItem = ({ to, icon: Icon, label }: { to: string, icon: React.ElementType, label: string }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => `
        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
        ${isActive 
          ? 'bg-bonsai-100 text-bonsai-900 font-medium shadow-sm dark:bg-bonsai-900 dark:text-bonsai-100' 
          : 'text-slate-500 hover:bg-slate-50 hover:text-bonsai-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-bonsai-300'}
      `}
    >
      <Icon size={20} />
      <span>{label}</span>
    </NavLink>
  );
};

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const [isMiyagiOpen, setIsMiyagiOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getPageTitle = () => {
    switch(location.pathname) {
      case '/': return 'Overview';
      case '/plan': return 'My Plan';
      case '/budget': return 'Budget & Insights';
      case '/transactions': return 'Transactions';
      case '/settings': return 'Account Settings';
      default: return 'Bonsai';
    }
  };

  const handleOmniBarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // If it looks like a question, open Miyagi
      if (searchQuery.includes('?') || searchQuery.toLowerCase().startsWith('how') || searchQuery.toLowerCase().startsWith('what')) {
        setIsMiyagiOpen(true);
        // Pass query to drawer via props (handled in parent state in a real app, simplifying here)
      } else {
        console.log("Searching for:", searchQuery);
      }
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col hidden md:flex z-20 transition-colors duration-300">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-bonsai-400 to-bonsai-600 rounded-lg flex items-center justify-center text-white">
            <Sprout size={20} />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-slate-800 dark:text-white">Bonsai</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <SidebarItem to="/" icon={LayoutDashboard} label="Overview" />
          <SidebarItem to="/plan" icon={Target} label="The Plan" />
          <SidebarItem to="/budget" icon={PieChart} label="Budget" />
          <SidebarItem to="/transactions" icon={CreditCard} label="Transactions" />
        </nav>

        <div className="p-4 mt-auto">
          <SidebarItem to="/settings" icon={SettingsIcon} label="Settings" />
          <div className="mt-4 p-4 bg-bonsai-50 dark:bg-slate-800 rounded-xl border border-transparent dark:border-slate-700">
            <div className="flex items-center gap-2 mb-2 text-bonsai-800 dark:text-bonsai-300 font-medium">
              <Sprout size={16} />
              <span className="text-sm">Miyagi Tip</span>
            </div>
            <p className="text-xs text-bonsai-700 dark:text-slate-300 leading-relaxed">
              "Pruning small expenses today allows for larger growth tomorrow."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Bar / Omni Bar */}
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10 transition-colors duration-300">
          <h1 className="font-serif text-2xl font-bold text-slate-800 dark:text-white hidden md:block">{getPageTitle()}</h1>
          
          {/* Omni Bar */}
          <div className="flex-1 max-w-xl mx-4 relative">
            <form onSubmit={handleOmniBarSubmit} className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-bonsai-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search transactions or ask Miyagi..." 
                className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:bg-white dark:focus:bg-slate-900 border border-transparent focus:border-bonsai-300 rounded-full pl-10 pr-12 py-2.5 text-sm outline-none transition-all shadow-sm dark:text-white dark:placeholder-slate-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setIsMiyagiOpen(true)}
                className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-white dark:bg-slate-700 rounded-full text-bonsai-600 dark:text-bonsai-400 hover:bg-bonsai-50 dark:hover:bg-slate-600 shadow-sm border border-slate-100 dark:border-slate-600 transition-colors"
                title="Ask Miyagi"
              >
                <Sprout size={16} />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-bonsai-200 border-2 border-white dark:border-slate-700 shadow-sm overflow-hidden">
              <img src="https://picsum.photos/100/100" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
           {children}
        </div>

        <MiyagiDrawer 
          isOpen={isMiyagiOpen} 
          onClose={() => setIsMiyagiOpen(false)} 
          initialQuery={searchQuery}
        />
      </main>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;