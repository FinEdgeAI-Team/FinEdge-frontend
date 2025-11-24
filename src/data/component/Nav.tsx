import React, { useState } from "react";
import { Search, Settings, Sun, Moon, ChevronDown, Menu } from "lucide-react";
import AlertCenterContainer from "./AlertCenter/AlertCenterContainer";
import { useNavigate } from "@tanstack/react-router";

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
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <nav className="bg-slate-900 border-b border-slate-700 px-4 sm:px-6">
      {/* ROW 1 — Top navbar */}
      <div className="h-16 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-slate-400 hover:text-white transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* CENTER SEARCH (desktop only) */}
        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div
            className={`relative flex items-center bg-slate-800 rounded-lg border transition-colors ${
              searchFocused
                ? "border-blue-500 ring-1 ring-blue-500"
                : "border-slate-700"
            }`}
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

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Button */}
          <button
            onClick={() => setMobileSearchOpen(true)}
            className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          <AlertCenterContainer />

          <button
            onClick={() => navigate({ to: "/settings/" })}
            className="sm:flex p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="sm:flex p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <div className="hidden sm:block w-px h-6 bg-slate-700"></div>

          {/* PROFILE */}
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
          </div>
        </div>
      </div>

      {/* ROW 2 — Mobile search (appears under navbar) */}
      {mobileSearchOpen && (
        <div className="w-full bg-slate-900 px-4 py-3 border-b border-slate-700 md:hidden">
          <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              autoFocus
              className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-sm"
            />
            <button
              onClick={() => setMobileSearchOpen(false)}
              className="text-slate-400 hover:text-white text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
