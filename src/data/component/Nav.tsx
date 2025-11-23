import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Grid3x3, 
  Settings, 
  Sun,
  Moon,
  ChevronDown,
  Menu,
  AlertTriangle,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { supplyChainAlerts } from '../../data/dashboardData';


interface NavbarProps {
  cashCrisisAlert?: {
    title: string;
    days_until: number;
    amount: number;
    confidence: number;
  };
  coachRecommendation?: string;
  formatCurrency?: (amount: number) => string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  cashCrisisAlert,
  coachRecommendation,
  formatCurrency = (amount) => `₦${(amount / 1000000).toFixed(1)}M`
}) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Type cast supplyChainAlerts to fix severity type
  const typedSupplyChainAlerts = (supplyChainAlerts as any[]).map(alert => ({
    ...alert,
    severity: alert.severity as 'low' | 'medium' | 'high' | 'critical'
  }));

  // Combine all alerts
  const allAlerts = [
    cashCrisisAlert && {
      id: 'crisis',
      type: 'cash_crisis',
      title: cashCrisisAlert.title,
      severity: 'critical' as const,
      description: `Predicted shortfall of ${formatCurrency(cashCrisisAlert.amount)} in ${cashCrisisAlert.days_until} days (${cashCrisisAlert.confidence}% confidence)`,
      timestamp: 'Just now',
      icon: 'alert'
    },
    coachRecommendation && {
      id: 'coach',
      type: 'recommendation',
      title: 'AI Coach Insight',
      severity: 'info' as const,
      description: coachRecommendation,
      timestamp: '5 minutes ago',
      icon: 'trend'
    },
    ...typedSupplyChainAlerts.map((alert, idx) => ({
      id: `supply_${idx}`,
      type: 'supply_chain',
      title: alert.title,
      severity: alert.severity,
      description: `Potential impact: ${formatCurrency(alert.impact)}`,
      timestamp: 'Today',
      icon: 'alert' as const
    }))
  ].filter(Boolean);

  const getAlertColor = (severity: 'low' | 'medium' | 'high' | 'critical' | 'info') => {
    switch(severity) {
      case 'critical': return 'bg-red-500/10 border-red-500/30';
      case 'high': return 'bg-orange-500/10 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500/30';
      case 'low': return 'bg-blue-500/10 border-blue-500/30';
      case 'info': return 'bg-blue-500/10 border-blue-500/30';
      default: return 'bg-slate-700/50 border-slate-600';
    }
  };

  const getAlertTextColor = (severity: 'low' | 'medium' | 'high' | 'critical' | 'info') => {
    switch(severity) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-blue-400';
      case 'info': return 'text-blue-400';
      default: return 'text-slate-300';
    }
  };

  const getAlertIcon = (iconType: string, severity: string) => {
    if (iconType === 'trend') return <TrendingUp className="w-4 h-4" />;
    if (iconType === 'alert') {
      if (severity === 'critical') return <AlertTriangle className="w-4 h-4 text-red-400" />;
      if (severity === 'high') return <AlertCircle className="w-4 h-4 text-orange-400" />;
      return <AlertCircle className="w-4 h-4 text-blue-400" />;
    }
    return <Bell className="w-4 h-4" />;
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-700 px-4 sm:px-6 h-16 flex items-center justify-between">
      {/* Left Section - Logo & Menu */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button className="lg:hidden text-slate-400 hover:text-white transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>


      {/* Center Section - Search */}
      <div className="flex-1 max-w-xl mx-4 hidden md:block">
        <div className={`
          relative flex items-center bg-slate-800 rounded-lg border transition-colors
          ${searchFocused ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-700'}
        `}>
          <Search className="w-5 h-5 text-slate-400 ml-3" />
          <input
            type="text"
            placeholder="Search something..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="flex-1 bg-transparent text-white placeholder-slate-500 px-3 py-2 outline-none text-sm"
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-1 mr-2 text-xs font-mono text-slate-400 bg-slate-700 rounded">
            ⌘K
          </kbd>
        </div>
      </div>


      {/* Right Section - Actions & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Icon (Mobile) */}
        <button className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <Search className="w-5 h-5" />
        </button>


        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
            {allAlerts.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>


          {/* Notification Dropdown */}
          {notificationOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setNotificationOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-96 max-h-96 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800">
                  <h3 className="text-white font-semibold">Alerts & Notifications</h3>
                  <span className="text-xs text-slate-400">{allAlerts.length} alerts</span>
                </div>

                {/* Alerts List */}
                <div className="overflow-y-auto flex-1">
                  {allAlerts.length > 0 ? (
                    <div className="space-y-2 p-3">
                      {allAlerts.map((alert: any) => (
                        <div 
                          key={alert.id}
                          className={`p-3 rounded-lg border ${getAlertColor(alert.severity)} hover:opacity-80 transition-opacity cursor-pointer`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              {getAlertIcon(alert.icon, alert.severity)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${getAlertTextColor(alert.severity)}`}>
                                {alert.title}
                              </p>
                              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                                {alert.description}
                              </p>
                              <p className="text-xs text-slate-500 mt-2">
                                {alert.timestamp}
                              </p>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${getAlertColor(alert.severity)}`}>
                              {alert.severity.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-24 text-slate-400">
                      <p className="text-sm">No alerts</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                {allAlerts.length > 0 && (
                  <div className="border-t border-slate-700 p-3 bg-slate-800">
                    <button className="w-full text-sm text-blue-400 hover:text-blue-300 transition-colors">
                      View All Alerts
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>


        {/* Apps Grid */}
        <button className="hidden sm:flex p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <Grid3x3 className="w-5 h-5" />
        </button>


        {/* Settings */}
        <button className="hidden sm:flex p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
        </button>


        {/* Theme Toggle */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="hidden sm:flex p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>


        {/* Divider */}
        <div className="hidden sm:block w-px h-6 bg-slate-700"></div>


        {/* User Profile */}
        <div className="relative">
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 sm:gap-3 hover:bg-slate-800 rounded-lg p-1 sm:p-2 transition-colors"
          >
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha" 
              alt="User" 
              className="w-8 h-8 rounded-full border-2 border-slate-700"
            />
            <div className="hidden lg:block text-left">
              <p className="text-sm font-medium text-white">Aisha M.</p>
              <p className="text-xs text-slate-400">SME Owner</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
          </button>


          {/* Profile Dropdown */}
          {profileOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 py-2">
                <div className="px-4 py-3 border-b border-slate-700">
                  <p className="text-sm font-medium text-white">Aisha M.</p>
                  <p className="text-xs text-slate-400">aisha@example.com</p>
                </div>
                <div className="py-2">
                  <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors">
                    Account Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors">
                    Help & Support
                  </button>
                </div>
                <div className="border-t border-slate-700 pt-2">
                  <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700 transition-colors">
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
