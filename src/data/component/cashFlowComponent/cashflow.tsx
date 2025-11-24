import { useState } from "react";
import { Download, Share2, Printer, ChevronDown } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { dashboardData } from "../../dashboardData";

// Types
type MonthKey =
  | "Jan 2025"
  | "Feb 2025"
  | "Mar 2025"
  | "Apr 2025"
  | "May 2025"
  | "Jun 2025"
  | "Jul 2025"
  | "Aug 2025"
  | "Sep 2025"
  | "Oct 2025"
  | "Nov 2025";

// Utility Functions
const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) return `₦${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `₦${(amount / 1000).toFixed(0)}K`;
  return `₦${amount}`;
};

const getScoreColor = (score: number): string => {
  if (score >= 70) return "text-green-400";
  if (score >= 40) return "text-amber-400";
  return "text-red-400";
};

const getScoreBgColor = (score: number): string => {
  if (score >= 70) return "bg-green-500/10 border-green-500/30";
  if (score >= 40) return "bg-amber-500/10 border-amber-500/30";
  return "bg-red-500/10 border-red-500/30";
};

// KPI Card Component
interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  comparison?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  unit,
  trend = "neutral",
  trendValue,
  comparison,
}) => {
  const trendColor =
    trend === "up"
      ? "text-green-400"
      : trend === "down"
        ? "text-red-400"
        : "text-slate-400";
  const trendIcon = trend === "up" ? "↑" : trend === "down" ? "↓" : "→";

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl  p-5 hover:border-slate-700 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <h4 className="md:text-sm text-xs font-medium text-slate-400">
          {title}
        </h4>
      </div>

      <div className="mb-2 ">
        <div className="flex items-baseline gap-1">
          <p className="md:text-3xl text-xl font-bold text-white">{value}</p>
          {unit && <span className="text-sm text-slate-400">{unit}</span>}
        </div>
      </div>

      {(trend !== "neutral" || comparison) && (
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
          {trendIcon && (
            <div
              className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}
            >
              {trendIcon}
              <span>{trendValue}</span>
            </div>
          )}
          {comparison && (
            <span className="text-xs text-slate-400">{comparison}</span>
          )}
        </div>
      )}
    </div>
  );
};

// Cash Flow Chart Component - Using Recharts
interface ChartProps {
  data: Array<{ date: string; net_flow: number }>;
}

const CashFlowChart: React.FC<ChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-white">
            {payload[0].payload.date}
          </p>
          <p className="text-sm font-bold text-blue-400">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h3 className="md:text-lg text-md font-bold text-white mb-6">
        Cash Flow Trend
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="rgba(59, 130, 246, 0.3)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="rgba(59, 130, 246, 0.01)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(71, 85, 105, 0.2)"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            stroke="rgba(148, 163, 184, 0.5)"
            style={{ fontSize: "12px" }}
          />

          <YAxis
            stroke="rgba(148, 163, 184, 0.5)"
            style={{ fontSize: "12px" }}
            tickFormatter={(value) => formatCurrency(value)}
            width={80}
          />

          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="net_flow"
            stroke="rgb(59, 130, 246)"
            strokeWidth={3}
            dot={false}
            fillOpacity={1}
            fill="url(#colorFlow)"
            isAnimationActive={true}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Expense Breakdown Table Component
interface ExpenseTableProps {
  expenses: Array<{ category: string; amount: number; percentage: number }>;
  prevExpenses?: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  prevExpenses,
}) => {
  const getTrendIndicator = (current: number, previous?: number) => {
    if (!previous) return { trend: "neutral", change: "—" };
    const change = ((current - previous) / previous) * 100;
    return {
      trend: change > 0 ? "up" : change < 0 ? "down" : "neutral",
      change: `${change > 0 ? "+" : ""}${change.toFixed(1)}%`,
    };
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-800/50">
            <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm md:text-base font-semibold text-slate-300">
              Category
            </th>
            <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm md:text-base font-semibold text-slate-300">
              Amount
            </th>
            <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm md:text-base font-semibold text-slate-300">
              % of Total
            </th>
            <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm md:text-base font-semibold text-slate-300">
              Trend
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, idx) => {
            const prev = prevExpenses?.[idx];
            const { trend, change } = getTrendIndicator(
              expense.amount,
              prev?.amount
            );
            const trendColor =
              trend === "up"
                ? "text-red-400"
                : trend === "down"
                  ? "text-green-400"
                  : "text-slate-400";

            return (
              <tr
                key={idx}
                className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors"
              >
                <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3">
                  <p className="text-xs sm:text-sm md:text-base font-medium text-white">
                    {expense.category}
                  </p>
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3">
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-white">
                    {formatCurrency(expense.amount)}
                  </p>
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3">
                  <div className="flex items-center gap-1 sm:gap-2 w-28 sm:w-32">
                    <div className="flex-1 bg-slate-800 rounded-full h-2 sm:h-2.5">
                      <div
                        className="bg-blue-500 h-2 sm:h-2.5 rounded-full"
                        style={{ width: `${expense.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs sm:text-sm md:text-base font-medium text-slate-300 w-10 text-right">
                      {expense.percentage.toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td
                  className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base font-medium ${trendColor}`}
                >
                  {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {change}
                </td>
              </tr>
            );
          })}
          <tr className="bg-slate-800/50 font-semibold">
            <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base text-white">
              Total Expenses
            </td>
            <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base text-blue-400">
              {formatCurrency(totalExpenses)}
            </td>
            <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base text-blue-400">
              100%
            </td>
            <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base text-slate-400">
              —
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// Score Gauge Component
interface GaugeProps {
  score: number;
  label: string;
  maxScore?: number;
}

const ScoreGauge: React.FC<GaugeProps> = ({ score, label, maxScore = 100 }) => {
  const percentage = (score / maxScore) * 100;

  return (
    <div className={`${getScoreBgColor(score)} border rounded-xl p-6`}>
      <p className="md:text-sm text-xs text-slate-300 mb-3">{label}</p>
      <div className="flex items-end gap-4">
        <div className=" text-2xl md:text-4xl font-bold text-white">
          {score}
        </div>
        <div className="flex-1">
          <div className="bg-slate-800 rounded-full h-2 mb-2">
            <div
              className={`h-2 rounded-full transition-all ${
                score >= 70
                  ? "bg-green-500"
                  : score >= 40
                    ? "bg-amber-500"
                    : "bg-red-500"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className={`text-xs font-medium ${getScoreColor(score)}`}>
            {score >= 70
              ? "Excellent"
              : score >= 40
                ? "Fair"
                : "Needs Improvement"}
          </p>
        </div>
      </div>
    </div>
  );
};

// Main Page Component
export default function CashFlowPage() {
  const months = Object.keys(dashboardData) as MonthKey[];
  const [selectedMonth, setSelectedMonth] = useState<MonthKey>("Nov 2025");
  const [showDropdown, setShowDropdown] = useState(false);

  const currentData = dashboardData[selectedMonth];
  const monthIndex = months.indexOf(selectedMonth);
  const previousData =
    monthIndex > 0 ? dashboardData[months[monthIndex - 1]] : null;

  const momChange = previousData
    ? ((currentData.net_monthly_cash_flow -
        previousData.net_monthly_cash_flow) /
        previousData.net_monthly_cash_flow) *
      100
    : 0;

  const momTrend = momChange > 0 ? "up" : momChange < 0 ? "down" : "neutral";
  const totalExpenses = currentData.expense_breakdown.reduce(
    (sum, e) => sum + e.amount,
    0
  );
  const topExpense = currentData.expense_breakdown[0];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="md:text-2xl text-md md:font-bold text-white">
                Cash Flow Analysis
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time financial insights
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Month Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center text-sm md:text-md gap-2 md:px-4 md:py-2.5 px-2 py-1.5 bg-slate-800 
                  border border-slate-700 rounded-lg text-white font-medium
                   hover:border-blue-500 transition-colors whitespace-nowrap"
                >
                  {selectedMonth}
                  <ChevronDown size={18} />
                </button>

                {showDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                    {months.map((month) => (
                      <button
                        key={month}
                        onClick={() => {
                          setSelectedMonth(month);
                          setShowDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          selectedMonth === month
                            ? "bg-blue-600 text-white"
                            : "text-slate-300 hover:bg-slate-700"
                        }`}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Export Buttons */}
              <div className="flex items-center gap-2 pl-3 border-l border-slate-700">
                <button
                  className="p-2 md:p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                  title="Download PDF"
                >
                  <Download size={16} />
                </button>
                <button
                  className="p-2 md:p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                  title="Share Report"
                >
                  <Share2 size={16} />
                </button>
                <button
                  className="p-2 md:p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                  title="Print"
                >
                  <Printer size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* KPI Cards Grid */}
          <div className="space-y-6 mb-12">
            {/* First Row - Primary Metric */}
            <div>
              <KPICard
                title="Net Monthly Cash Flow"
                value={formatCurrency(currentData.net_monthly_cash_flow)}
                trend={momTrend}
                trendValue={`${momChange > 0 ? "+" : ""}${momChange.toFixed(1)}%`}
                comparison="vs last month"
              />
            </div>

            {/* Second Row - Supporting Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                title="Total Expenses"
                value={formatCurrency(totalExpenses)}
                trend="neutral"
              />

              <KPICard
                title="Top Expense Category"
                value={topExpense.category.split("/")[0].trim()}
                comparison={`${topExpense.percentage.toFixed(1)}% of total`}
              />

              <KPICard
                title="Cash Flow Stability"
                value={currentData.cash_flow_stability_score}
                unit="/100"
                trend={
                  currentData.cash_flow_stability_score >= 70 ? "up" : "down"
                }
              />

              <KPICard
                title="Credit Score"
                value={currentData.credit_score}
                unit="/100"
                trend={currentData.credit_score >= 70 ? "up" : "down"}
              />
            </div>
          </div>

          {/* Charts and Scores */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CashFlowChart data={currentData.cash_flow_trend} />
            </div>

            <div className="space-y-4">
              <ScoreGauge
                score={currentData.cash_flow_stability_score}
                label="Cash Flow Stability"
              />
              <ScoreGauge
                score={currentData.credit_score}
                label="Credit Score"
              />
            </div>
          </div>

          {/* Expense Table */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Expense Breakdown
            </h2>
            <ExpenseTable
              expenses={currentData.expense_breakdown}
              prevExpenses={previousData?.expense_breakdown}
            />
          </div>

          {/* Coach Recommendation */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl md:p-6 p-4">
            <h3 className="md:text-lg text-md font-bold text-blue-300 mb-2">
              AI Coach Recommendation
            </h3>
            <p className="text-slate-300 md:text-md text-sm">
              {currentData.coach_recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
