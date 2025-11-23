import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Upload, 
  List, 
  TrendingUp, 
  MessageSquare, 
  Award,
  Settings,
  FileText,
  Menu,
  X,
  ChevronRight,
  LogOut
} from 'lucide-react';

import { useNavigate } from '@tanstack/react-router';


// NAV ITEM
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  route: string;
  active?: boolean;
  badge?: string;
  hasSubmenu?: boolean;
  isCollapsed: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon, 
  label, 
  active = false, 
  badge, 
  hasSubmenu = false,
  isCollapsed,
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all group
        ${active 
          ? 'bg-blue-500/20 text-blue-400' 
          : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
        }
      `}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className={`shrink-0 ${active ? 'text-blue-400' : ''}`}>
          {icon}
        </div>
        {!isCollapsed && (
          <span className="text-sm font-medium truncate">{label}</span>
        )}
      </div>
      
      {!isCollapsed && (
        <div className="flex items-center gap-2 shrink-0">
          {badge && (
            <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
              {badge}
            </span>
          )}
          {hasSubmenu && (
            <ChevronRight className="w-4 h-4 text-slate-500" />
          )}
        </div>
      )}
    </button>
  );
};


// SECTION
interface SidebarSectionProps {
  title: string;
  isCollapsed: boolean;
}

const SidebarSection: React.FC<SidebarSectionProps & { children: React.ReactNode }> = ({ 
  title, 
  isCollapsed,
  children 
}) => {
  return (
    <div className="mb-6">
      {!isCollapsed && (
        <div className="px-4 mb-3">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {title}
          </h3>
        </div>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};



// SIDEBAR MAIN
const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const [activeItem, setActiveItem] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const goTo = (route: string, item: string) => {
    setActiveItem(item);
    navigate({ to: route });
    setIsMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <h1 className="text-xl font-bold text-white">FinEdge AI</h1>
          </div>
        )}
        {isCollapsed && (
          <span className="text-2xl mx-auto">🔥</span>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-2">

        {/* MAIN */}
        <SidebarSection title="Main" isCollapsed={isCollapsed}>
          <NavItem
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Dashboard"
            route="/dashboard"
            active={activeItem === 'dashboard'}
            badge="3"
            isCollapsed={isCollapsed}
            onClick={() => goTo('/dashboard', 'dashboard')}
          />

          <NavItem
            icon={<Upload className="w-5 h-5" />}
            label="Upload CSV"
            route="/upload"
            active={activeItem === 'upload'}
            isCollapsed={isCollapsed}
            onClick={() => goTo('/upload', 'upload')}
          />

          <NavItem
            icon={<List className="w-5 h-5" />}
            label="Transactions"
            route="/transactions"
            active={activeItem === 'transactions'}
            isCollapsed={isCollapsed}
            onClick={() => goTo('/transactions', 'transactions')}
          />

          <NavItem
            icon={<TrendingUp className="w-5 h-5" />}
            label="Cash Flow"
            route="/cashflow"
            active={activeItem === 'cashflow'}
            isCollapsed={isCollapsed}
            onClick={() => goTo('/cashflow', 'cashflow')}
          />

          <NavItem
            icon={<MessageSquare className="w-5 h-5" />}
            label="AI Coach"
            route="/coach"
            active={activeItem === 'coach'}
            isCollapsed={isCollapsed}
            onClick={() => goTo('/coach', 'coach')}
          />

          <NavItem
            icon={<Award className="w-5 h-5" />}
            label="Credit Score"
            route="/credit"
            active={activeItem === 'credit'}
            isCollapsed={isCollapsed}
            onClick={() => goTo('/credit', 'credit')}
          />
        </SidebarSection>


        {/* REPORTS */}
        <SidebarSection title="Reports" isCollapsed={isCollapsed}>
          <NavItem
            icon={<FileText className="w-5 h-5" />}
            label="Insights"
            route="/insights"
            active={activeItem === 'insights'}
            isCollapsed={isCollapsed}
            onClick={() => goTo('/insights', 'insights')}
          />

          <NavItem
            icon={<FileText className="w-5 h-5" />}
            label="Expense Report"
            route="/expenses"
            active={activeItem === 'expenses'}
            isCollapsed={isCollapsed}
            onClick={() => goTo('/expenses', 'expenses')}
          />
        </SidebarSection>


        {/* SETTINGS */}
        <SidebarSection title="Settings" isCollapsed={isCollapsed}>
          <NavItem
            icon={<Settings className="w-5 h-5" />}
            label="Settings"
            route="/settings"
            active={activeItem === 'settings'}
            isCollapsed={isCollapsed}
            onClick={() => goTo('/settings', 'settings')}
          />
        </SidebarSection>

      </div>

      {/* LOGOUT */}
      <div className="border-t border-slate-700 p-4">
        <button
          onClick={() => navigate({ to: '/Auth/' })}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-700/50 hover:text-white rounded-lg transition-all"
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>

    </div>
  );


  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded-lg shadow-lg"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative h-screen bg-slate-800 border-r border-slate-700 
          transition-all duration-300 z-40
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {sidebarContent}

        {/* Desktop Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-8 w-6 h-6 bg-slate-700 border border-slate-600 rounded-full items-center justify-center text-slate-400 hover:text-white hover:bg-slate-600 transition-all"
        >
          <ChevronRight className={`w-4 h-4 transition-transform ${isCollapsed ? '' : 'rotate-180'}`} />
        </button>
      </aside>
    </div>
  );
};

export default Sidebar;
