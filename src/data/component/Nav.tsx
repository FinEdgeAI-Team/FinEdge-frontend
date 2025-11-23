import React, { useState } from "react";
import {
  Search,
  Grid3x3,
  Settings,
  Sun,
  Moon,
  ChevronDown,
  Menu,
} from "lucide-react";
import { supplyChainAlerts } from "../../data/dashboardData";
import AlertCenter from "./DashordComponent/alertCenter";

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

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

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
        <div
          className={`
          relative flex items-center bg-slate-800 rounded-lg border transition-colors
          ${searchFocused ? "border-blue-500 ring-1 ring-blue-500" : "border-slate-700"}
        `}
        >
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
        <AlertCenter />

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
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
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
