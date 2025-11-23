import { useState, useMemo } from "react";
import { AlertTypes } from "../../../types";
import type { GenerateSmartAlertParams, SmartAlert } from "../../../types";
import { AlertBellIcon } from "./AlertBellIcon";

// alertIcons.ts
import {
  AlertTriangle,
  TrendingDown,
  Activity,
  Package,
  PiggyBank,
  Calculator,
  Wallet,
} from "lucide-react";

export const ALERT_ICONS = {
  cash_crunch: AlertTriangle,
  declining_trend: TrendingDown,
  expense_spike: Activity,
  opportunity: PiggyBank,
  logistics: Package,
  growth: Wallet,
  tax_deadline: Calculator,
};

export const generateSmartAlerts = ({
  stabilityScore,
  netCashFlow,
  expenseBreakdown,
  cashFlowTrend,
}: GenerateSmartAlertParams): SmartAlert[] => {
  const alerts: SmartAlert[] = [];

  // 1. Cash Crunch Warning
  if (stabilityScore < 60) {
    const runway = Math.floor((netCashFlow / 1_000_000) * 30);
    alerts.push({
      id: "alert_cash_crunch",
      type: "cash_crunch",
      urgency: 3,
      title: "Low Cash Flow Stability Detected",
      description: `Your stability score is ${stabilityScore.toFixed(
        1
      )}/100. Estimated cash runway: ~${runway} days.`,
      recommended_action:
        "Consider invoice financing or negotiate extended payment terms with suppliers.",
      impact_if_ignored:
        "Risk of missing payroll or supplier payments within 30-45 days.",
      potential_savings: 1_400_000,
      created_at: new Date().toISOString(),
    });
  }

  // 2. Declining Cash Flow Trend
  if (cashFlowTrend.length >= 3) {
    const lastThree = cashFlowTrend.slice(-3);
    const isDecreasing = lastThree.every((item, i) =>
      i === 0 ? true : item.net_flow < lastThree[i - 1].net_flow
    );

    if (isDecreasing) {
      alerts.push({
        id: "alert_declining_trend",
        type: "cash_crunch",
        urgency: 2,
        title: "Declining Cash Flow Trend",
        description: "Your cash flow has decreased for 3 consecutive weeks.",
        recommended_action:
          "Review receivables aging and accelerate collections. Consider offering early payment discounts.",
        impact_if_ignored:
          "Continued decline may lead to working capital shortage.",
        potential_savings: 850_000,
        created_at: new Date().toISOString(),
      });
    }
  }

  // 3. High COGS Alert
  const cogsItem = expenseBreakdown.find((e) => e.category.includes("COGS"));
  if (cogsItem && cogsItem.percentage > 30) {
    const potentialSavings = cogsItem.amount * 0.05;
    alerts.push({
      id: "alert_high_cogs",
      type: "expense_spike",
      urgency: 2,
      title: "High Cost of Goods Sold",
      description: `COGS is ${cogsItem.percentage.toFixed(
        1
      )}% of expenses (industry average: 30%).`,
      recommended_action:
        "Negotiate bulk purchasing discounts with top 3 suppliers or explore alternative suppliers.",
      impact_if_ignored: "Missing 5-10% cost reduction opportunities monthly.",
      potential_savings: potentialSavings,
      created_at: new Date().toISOString(),
    });
  }

  // 4. Logistics Optimization
  const logisticsItem = expenseBreakdown.find((e) =>
    e.category.includes("Logistics")
  );
  if (logisticsItem && logisticsItem.percentage > 15) {
    alerts.push({
      id: "alert_logistics",
      type: "opportunity",
      urgency: 1,
      title: "Logistics Optimization Opportunity",
      description: `Logistics costs are ${logisticsItem.percentage.toFixed(
        1
      )}% of expenses (target: <15%).`,
      recommended_action:
        "Consider route optimization software or negotiate bulk rates with logistics partners.",
      impact_if_ignored: "Overpaying by approximately 8% on logistics monthly.",
      potential_savings: logisticsItem.amount * 0.08,
      created_at: new Date().toISOString(),
    });
  }

  // 5. Growth Opportunity
  if (netCashFlow > 3_000_000 && stabilityScore > 65) {
    alerts.push({
      id: "alert_growth",
      type: "opportunity",
      urgency: 1,
      title: "Growth Capital Available",
      description:
        "Strong cash position detected. You may qualify for growth financing.",
      recommended_action:
        "Consider inventory expansion, new equipment, or market expansion.",
      impact_if_ignored:
        "Missing potential 15-25% revenue growth opportunities.",
      potential_savings: netCashFlow * 0.2,
      created_at: new Date().toISOString(),
    });
  }

  // 6. Tax Deadline
  alerts.push({
    id: "alert_tax",
    type: "tax_deadline",
    urgency: 2,
    title: "Upcoming Tax Deadline",
    description: "VAT and WHT filings due by end of month (Dec 21, 2025).",
    recommended_action:
      "Ensure all transaction records are up-to-date. Consult with your accountant.",
    impact_if_ignored:
      "Risk of penalties (5-10% of tax owed) plus interest charges.",
    created_at: new Date().toISOString(),
    potential_savings: undefined, // keep typing consistent
  });

  // 7. Payroll Check
  const payrollItem = expenseBreakdown.find((e) =>
    e.category.includes("Payroll")
  );
  if (payrollItem && payrollItem.percentage > 22) {
    alerts.push({
      id: "alert_payroll",
      type: "expense_spike",
      urgency: 2,
      title: "High Payroll Ratio",
      description: `Payroll is ${payrollItem.percentage.toFixed(
        1
      )}% of expenses (recommended: <22%).`,
      recommended_action:
        "Review productivity metrics. Consider automation for repetitive tasks.",
      impact_if_ignored: "Reduced profitability and competitiveness.",
      potential_savings: payrollItem.amount * 0.03,
      created_at: new Date().toISOString(),
    });
  }

  return alerts.sort((a, b) => b.urgency - a.urgency);
};

// ---- ALERT CARD PROPS ----
interface AlertCardProps {
  alert: SmartAlert;
  isExpanded: boolean;
  onToggle: () => void;
}

// ---- COMPONENT ----
export const AlertCard: React.FC<AlertCardProps> = ({
  alert,
  isExpanded,
  onToggle,
}) => {
  const urgencyStyles: Record<
    SmartAlert["urgency"],
    {
      border: string;
      bg: string;
      badge: string;
      badgeText: string;
    }
  > = {
    3: {
      border: "border-red-500/40",
      bg: "bg-red-500/5",
      badge: "bg-red-500 text-white",
      badgeText: "CRITICAL",
    },
    2: {
      border: "border-amber-500/40",
      bg: "bg-amber-500/5",
      badge: "bg-amber-500 text-slate-900",
      badgeText: "MEDIUM",
    },
    1: {
      border: "border-blue-500/40",
      bg: "bg-blue-500/5",
      badge: "bg-blue-500 text-white",
      badgeText: "INFO",
    },
  };

  const style = urgencyStyles[alert.urgency];
  const alertMeta = AlertTypes[alert.type];

  // If you're formatting Naira
  const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

  return (
    <div
      className={`border ${style.border} ${style.bg} rounded-xl overflow-hidden transition-all duration-200 hover:border-opacity-100`}
    >
      {/* Header */}
      <div
        onClick={onToggle}
        className="p-4 cursor-pointer flex items-start gap-3"
      >
        {/* Icon */}
        <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center shrink-0 text-lg">
          {alertMeta.icon && (
            <alertMeta.icon size={20} className="text-white" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="font-semibold text-white text-sm truncate">
              {alert.title}
            </h4>
            <span
              className={`px-2.5 py-1 text-xs font-bold rounded-full shrink-0 ${style.badge}`}
            >
              {style.badgeText}
            </span>
          </div>
          <p className="text-xs text-slate-400 line-clamp-2">
            {alert.description}
          </p>
        </div>
      </div>

      {/* Expanded Section */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-slate-700/50 pt-3 mx-4">
          {/* Potential Savings */}
          {alert.potential_savings !== undefined && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Potential Impact:</span>
              <span className="text-sm font-bold text-emerald-400">
                {formatNaira(alert.potential_savings)}
              </span>
            </div>
          )}

          {/* Recommended Action */}
          <div>
            <p className="text-xs font-medium text-slate-300 mb-1">
              Recommended Action
            </p>
            <p className="text-xs text-slate-400 bg-slate-800/50 p-2.5 rounded-lg">
              {alert.recommended_action}
            </p>
          </div>

          {/* Impact if Ignored */}
          <div>
            <p className="text-xs font-medium text-slate-300 mb-1">
              If Ignored
            </p>
            <p className="text-xs text-red-300/80 bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg">
              {alert.impact_if_ignored}
            </p>
          </div>

          {/* Button */}
          <button className="w-full mt-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
            View Action Plan
            <span>→</span>
          </button>
        </div>
      )}

      {/* Expand Indicator */}
      <div className="text-center pb-2">
        <span className="text-xs text-slate-500">
          {isExpanded ? "Click to collapse ▲" : "Click to expand ▼"}
        </span>
      </div>
    </div>
  );
};

// Alert Panel Component
interface AlertPanelProps {
  alerts: SmartAlert[];
  isOpen: boolean;
  onClose: () => void;
}

export const AlertPanel = ({ alerts, isOpen, onClose }: AlertPanelProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "critical" | "medium" | "info">(
    "all"
  );

  const filteredAlerts = useMemo(() => {
    if (filter === "all") return alerts;

    return alerts.filter((a: SmartAlert) => {
      if (filter === "critical") return a.urgency === 3;
      if (filter === "medium") return a.urgency === 2;
      if (filter === "info") return a.urgency === 1;
      return true;
    });
  }, [alerts, filter]);

  const criticalCount = alerts.filter(
    (a: SmartAlert) => a.urgency === 3
  ).length;
  const mediumCount = alerts.filter((a: SmartAlert) => a.urgency === 2).length;
  const infoCount = alerts.filter((a: SmartAlert) => a.urgency === 1).length;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-700/50 z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-blue-500 rounded-full" />
              <div>
                <h2 className="text-lg font-bold text-white">Alert Center</h2>
                <p className="text-xs text-slate-400">
                  AI-powered financial intelligence
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {[
              { id: "all", label: "All", count: alerts.length },
              { id: "critical", label: "Critical", count: criticalCount },
              { id: "medium", label: "Medium", count: mediumCount },
              { id: "info", label: "Info", count: infoCount },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setFilter(tab.id as "all" | "critical" | "medium" | "info")
                }
                className={`px-3 py-1.5 text-xs cursor-pointer font-medium rounded-lg transition-colors ${
                  filter === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Alerts List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredAlerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <p className="text-sm">No alerts in this category</p>
            </div>
          ) : (
            filteredAlerts.map((alert: SmartAlert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                isExpanded={expandedId === alert.id}
                onToggle={() =>
                  setExpandedId(expandedId === alert.id ? null : alert.id)
                }
              />
            ))
          )}
        </div>

        {/* Footer Summary */}
        <div className="p-4 border-t border-slate-700/50 bg-slate-800/50">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              <strong className="text-white">{alerts.length}</strong> active
              alerts
            </span>
            <span>
              <strong className="text-white">{criticalCount}</strong> require
              attention
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

// Main Demo Component
export default function AlertCenterDemo() {
  const [isAlertPanelOpen, setIsAlertPanelOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // Mock data for demo
  const mockExpenseBreakdown = [
    { category: "COGS / Inventory", amount: 3200000, percentage: 32 },
    { category: "Payroll / Wages", amount: 2400000, percentage: 24 },
    { category: "Logistics / Transport", amount: 1800000, percentage: 18 },
    { category: "Rent / Utilities", amount: 700000, percentage: 7 },
    { category: "Marketing", amount: 400000, percentage: 4 },
  ];

  const mockCashFlowTrend = [
    { date: "Week 1", net_flow: 2100000 },
    { date: "Week 2", net_flow: 1850000 },
    { date: "Week 3", net_flow: 1600000 },
    { date: "Week 4", net_flow: 1400000 },
  ];

  const alerts = useMemo(
    () =>
      generateSmartAlerts({
        stabilityScore: 55,
        netCashFlow: 3500000,
        expenseBreakdown: mockExpenseBreakdown,
        cashFlowTrend: mockCashFlowTrend,
      }),
    []
  );

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      {/* Demo Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 p-4 bg-slate-900 rounded-xl border border-slate-800">
          {/* Alert Bell */}
          <AlertBellIcon
            count={alerts.length}
            onClick={() => setIsAlertPanelOpen(true)}
            isOpen={isAlertPanelOpen}
          />
        </div>
      </div>

      {/* Alert Panel */}
      <AlertPanel
        alerts={alerts}
        isOpen={isAlertPanelOpen}
        onClose={() => setIsAlertPanelOpen(false)}
      />
    </div>
  );
}
