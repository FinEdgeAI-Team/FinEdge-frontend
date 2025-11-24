import React, { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  TrendingUp,
  MessageSquare,
  Settings,
  FileText,
  Menu,
  X,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "@tanstack/react-router";

// ---------------- NavItem ----------------
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  route: string;
  badge?: string;
  hasSubmenu?: boolean;
  isCollapsed: boolean;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  badge,
  hasSubmenu = false,
  isCollapsed,
  active,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all group
        ${active ? "bg-blue-500/20 text-blue-400" : "text-slate-400 hover:bg-slate-700/50 hover:text-white"}
      `}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className={`shrink-0 ${active ? "text-blue-400" : ""}`}>
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
          {hasSubmenu && <ChevronRight className="w-4 h-4 text-slate-500" />}
        </div>
      )}
    </button>
  );
};

// ---------------- SidebarSection ----------------
interface SidebarSectionProps {
  title: string;
  isCollapsed: boolean;
  children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  isCollapsed,
  children,
}) => (
  <div className="mb-6">
    {!isCollapsed && (
      <div className="px-4 mb-3">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </h3>
      </div>
    )}
    <div className="space-y-1">{children}</div>
  </div>
);

// ---------------- Sidebar ----------------
const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // derive active item from current path
  const currentPath = location.pathname;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const goTo = (route: string) => {
    navigate({ to: route });
    setIsMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-2">
        {/* MAIN */}
        <SidebarSection title="Main" isCollapsed={isCollapsed}>
          <NavItem
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Dashboard"
            route="/dashboard"
            active={currentPath === "/dashboard"}
            badge="3"
            isCollapsed={isCollapsed}
            onClick={() => goTo("/dashboard")}
          />
          <NavItem
            icon={<Building2 className="w-5 h-5" />}
            label="Banks"
            route="/bank"
            active={currentPath === "/bank"}
            isCollapsed={isCollapsed}
            onClick={() => goTo("/bank")}
          />
          <NavItem
            icon={<TrendingUp className="w-5 h-5" />}
            label="Cash Flow"
            route="/cashflow"
            active={currentPath === "/cashflow"}
            isCollapsed={isCollapsed}
            onClick={() => goTo("/cashflow")}
          />
          <NavItem
            icon={<MessageSquare className="w-5 h-5" />}
            label="AI Coach"
            route="/Ai_coach"
            active={currentPath === "/Ai_coach"}
            isCollapsed={isCollapsed}
            onClick={() => goTo("/Ai_coach")}
          />
        </SidebarSection>

        {/* REPORTS */}
        <SidebarSection title="Reports" isCollapsed={isCollapsed}>
          <NavItem
            icon={<FileText className="w-5 h-5" />}
            label="Insights"
            route="/insights"
            active={currentPath === "/insights"}
            isCollapsed={isCollapsed}
            onClick={() => goTo("/insights")}
          />
          <NavItem
            icon={<FileText className="w-5 h-5" />}
            label="Expense Report"
            route="/expenseReport"
            active={currentPath === "/expenseReport"}
            isCollapsed={isCollapsed}
            onClick={() => goTo("/expenseReport")}
          />
        </SidebarSection>

        {/* SETTINGS */}
        <SidebarSection title="Settings" isCollapsed={isCollapsed}>
          <NavItem
            icon={<Settings className="w-5 h-5" />}
            label="Settings"
            route="/settings"
            active={currentPath === "/settings"}
            isCollapsed={isCollapsed}
            onClick={() => goTo("/settings")}
          />
        </SidebarSection>
      </div>

      {/* LOGOUT */}
      <div className="border-t border-slate-700 p-4">
        <button
          onClick={() => goTo("/logout")}
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
      {/* Mobile Open Button */}
      {!isMobileOpen && (
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded-lg shadow-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

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
        ${isCollapsed ? "w-20" : "w-64"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700 relative">
            {!isCollapsed ? (
              <h1 className="text-sm sm:text-base md:text-xl font-bold text-white">
                FinEdge AI
              </h1>
            ) : (
              <span className="text-2xl text-white">FE</span>
            )}

            {/* Mobile Close Button */}
            {isMobileOpen && (
              <button
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden p-2 bg-slate-800 text-white rounded-lg shadow-lg"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Navigation Scroll Area */}
          <div className="flex-1 overflow-y-auto py-4 px-2">
            {sidebarContent}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex absolute -right-3 top-8 w-6 h-6 bg-slate-700 border border-slate-600 rounded-full items-center justify-center text-slate-400 hover:text-white hover:bg-slate-600 transition-all"
          >
            <ChevronRight
              className={`w-4 h-4 transition-transform ${
                isCollapsed ? "" : "rotate-180"
              }`}
            />
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
