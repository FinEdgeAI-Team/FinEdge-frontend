import React, { useState, useMemo } from "react";
import { Activity, TrendingUp, Award, ChevronDown } from "lucide-react";
import { dashboardData } from "../../dashboardData";

interface MetricCardProps {
  title: string;
  value: string;
  subValue?: string;
  change: number;
  period?: string;
  icon: React.ReactNode;
  iconBg: string;
  decorativeIcon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subValue,
  change,
  period,
  icon,
  iconBg,
  decorativeIcon,
}) => {
  const isPositive = change >= 0;

  return (
    <div className="relative bg-slate-800 rounded-lg p-6 overflow-hidden group hover:bg-slate-750 transition-colors">
      <div className="absolute md:right-12 md:top-1/2 hidden md:flex  -translate-y-1/2 text-slate-700 opacity-20 group-hover:opacity-30 transition-opacity">
        {decorativeIcon}
      </div>

      <div className="relative z-10">
        <div className="text-slate-400 text-xs md:text-sm font-medium mb-4 uppercase tracking-wide">
          {title}
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className={`${iconBg} rounded-full p-2 md:p-3`}>{icon}</div>
          <div>
            <div className="text-white md:text-3xl font-bold">{value}</div>
            {subValue && (
              <div className="text-slate-400 text-sm">{subValue}</div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span
            className={`flex items-center gap-1 font-medium ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {isPositive ? "▲" : "▼"} {Math.abs(change).toFixed(1)}%
          </span>
          <span className="text-slate-500">{period}</span>
        </div>
      </div>
    </div>
  );
};

const FinancialDashboard: React.FC = () => {
  const months = Object.keys(dashboardData) as (keyof typeof dashboardData)[];
  const [selectedMonth, setSelectedMonth] = useState<
    keyof typeof dashboardData
  >(months[months.length - 1] as keyof typeof dashboardData);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentData = dashboardData[selectedMonth];

  const currentIndex = months.indexOf(selectedMonth);
  const previousMonth = currentIndex > 0 ? months[currentIndex - 1] : null;
  const previousData = previousMonth
    ? dashboardData[previousMonth as keyof typeof dashboardData]
    : null;

  const calculateChange = (current: number, previous: number | null) => {
    if (previous === null || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const financialHealthScore = useMemo(() => {
    const stabilityWeight = 0.4;
    const cashFlowWeight = 0.3;
    const creditWeight = 0.3;

    const normalizedCashFlow = Math.min(
      (currentData.net_monthly_cash_flow / 5000000) * 100,
      100
    );
    const normalizedCredit = (currentData.credit_score / 100) * 100;

    return (
      currentData.cash_flow_stability_score * stabilityWeight +
      normalizedCashFlow * cashFlowWeight +
      normalizedCredit * creditWeight
    );
  }, [currentData]);

  const prevFinancialHealthScore = useMemo(() => {
    if (!previousData) return null;
    const stabilityWeight = 0.4;
    const cashFlowWeight = 0.3;
    const creditWeight = 0.3;

    const normalizedCashFlow = Math.min(
      (previousData.net_monthly_cash_flow / 5000000) * 100,
      100
    );
    const normalizedCredit = (previousData.credit_score / 100) * 100;

    return (
      previousData.cash_flow_stability_score * stabilityWeight +
      normalizedCashFlow * cashFlowWeight +
      normalizedCredit * creditWeight
    );
  }, [previousData]);

  const formatCurrency = (amount: number) =>
    `₦${(amount / 1000000).toFixed(1)}M`;

  const metrics = [
    {
      title: "Financial Health Score",
      value: financialHealthScore.toFixed(1),
      subValue: "out of 10",
      change: calculateChange(financialHealthScore, prevFinancialHealthScore),
      period: "Since last month",
      icon: <Activity className="w-6 h-6 text-blue-400" />,
      iconBg: "bg-blue-500/20",
      decorativeIcon: <Activity className="w-32 h-32" />,
    },
    {
      title: "Cashflow Stability",
      value: `${currentData.cash_flow_stability_score.toFixed(1)}%`,
      subValue:
        currentData.cash_flow_stability_score >= 70
          ? "Excellent"
          : currentData.cash_flow_stability_score >= 60
            ? "Good"
            : "Fair",
      change: calculateChange(
        currentData.cash_flow_stability_score,
        previousData?.cash_flow_stability_score ?? null
      ),
      period: "Since last month",
      icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
      iconBg: "bg-emerald-500/20",
      decorativeIcon: <TrendingUp className="w-32 h-32" />,
    },
    {
      title: "Net Cash Flow",
      value: formatCurrency(currentData.net_monthly_cash_flow),
      subValue: "Monthly",
      change: calculateChange(
        currentData.net_monthly_cash_flow,
        previousData?.net_monthly_cash_flow ?? null
      ),
      icon: (
        <span className="w-6 h-6 flex items-center justify-center text-purple-400 font-bold">
          ₦
        </span>
      ),
      iconBg: "bg-purple-500/20",

      decorativeIcon: (
        <span className="w-full h-full flex items-start justify-start text-[6rem] font-bold  leading-none select-none">
          ₦
        </span>
      ),
    },
    {
      title: "Credit Score",
      value: currentData.credit_score.toString(),
      subValue:
        currentData.credit_score >= 75
          ? "Excellent"
          : currentData.credit_score >= 65
            ? "Good"
            : "Fair",
      change: calculateChange(
        currentData.credit_score,
        previousData?.credit_score ?? null
      ),
      period: "Since last month",
      icon: <Award className="w-6 h-6 text-amber-400" />,
      iconBg: "bg-amber-500/20",
      decorativeIcon: <Award className="w-32 h-32" />,
    },
  ];

  return (
    <div className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="md:text-3xl text-xl font-bold text-white mb-2">
              Financial Dashboard
            </h1>
            <p className="text-slate-400 text-sm md:text-md">
              Monitor your key financial metrics
            </p>
          </div>

          {/* Month Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-slate-800 text-sm md:text-md hover:bg-slate-700 text-white md:px-4 md:py-3 py-2 px-3 rounded-lg border border-slate-600 transition-colors md:min-w-40 justify-between"
            >
              <span className="font-medium">{selectedMonth}</span>
              <ChevronDown
                className={`md:w-5 md:h-5 w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180 transform" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-full bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
                {months.map((month) => (
                  <button
                    key={month}
                    onClick={() => {
                      setSelectedMonth(month);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-slate-700 transition-colors ${
                      selectedMonth === month
                        ? "bg-slate-700 text-blue-400"
                        : "text-white"
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;
