import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CashFlowDataPoint {
  date: string;
  net_flow: number;
}

interface CashFlowTrendChartProps {
  data: CashFlowDataPoint[];
  title?: string;
  showHeader?: boolean;
  height?: number;
  currency?: string;
}

/* ---------------------------
    Utility Formatters
---------------------------- */
const toMillions = (value: number) => value / 1_000_000;
const formatCurrency = (value: number, currency: string) =>
  `${currency}${value.toLocaleString()}`;

/* ---------------------------
    Custom Tooltip
---------------------------- */
type RechartsTooltipPayload = {
  value: number;
  payload: { date: string; net_flow: number };
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: RechartsTooltipPayload[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const item = payload[0];

  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl">
      <p className="text-slate-400 text-xs mb-1">{item.payload.date}</p>
      <p className="text-white font-semibold">₦{item.value.toFixed(2)}M</p>
      <p className="text-slate-500 text-xs mt-1">
        {formatCurrency(item.payload.net_flow, "₦")}
      </p>
    </div>
  );
};

/* ---------------------------
    Summary Stat Block
---------------------------- */
const StatBlock = ({
  label,
  value
}: {
  label: string;
  value: string | number;
}) => (
  <div>
    <p className="text-xs text-slate-500 mb-1">{label}</p>
    <p className="text-sm font-semibold text-white">{value}</p>
  </div>
);

/* ---------------------------
    Main Chart Component
---------------------------- */
const CashFlowTrendChart: React.FC<CashFlowTrendChartProps> = ({
  data,
  title = "Cash Flow Trend",
  showHeader = true,
  height = 300,
  currency = "₦"
}) => {
  const {
    chartData,
    average,
    highest,
    lowest,
    variance,
    trendPercentage,
    isPositiveTrend
  } = useMemo(() => {
    const firstValue = data[0]?.net_flow ?? 0;
    const lastValue = data[data.length - 1]?.net_flow ?? 0;
    const trend = lastValue - firstValue;

    const max = Math.max(...data.map((d) => d.net_flow));
    const min = Math.min(...data.map((d) => d.net_flow));

    return {
      chartData: data.map((d) => ({
        ...d,
        net_flow_formatted: toMillions(d.net_flow)
      })),
      average: data.reduce((sum, d) => sum + d.net_flow, 0) / data.length,
      highest: max,
      lowest: min,
      variance: max - min,
      trendPercentage: firstValue ? (trend / firstValue) * 100 : 0,
      isPositiveTrend: trend >= 0
    };
  }, [data]);

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      {showHeader && (
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm text-slate-400">
              Average: {currency}{toMillions(average).toFixed(2)}M
            </p>
          </div>

          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              isPositiveTrend
                ? "bg-green-500/10 text-green-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {isPositiveTrend ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}

            <span className="font-semibold">
              {isPositiveTrend ? "+" : ""}
              {trendPercentage.toFixed(1)}%
            </span>
          </div>
        </div>
      )}

      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />
          <YAxis
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            label={{
              value: `Cash Flow (${currency}M)`,
              angle: -90,
              position: "insideLeft",
              style: { fill: "#94a3b8", fontSize: 12 }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="line"
            formatter={() => "Net Cash Flow"}
          />

          <Line
            type="monotone"
            dataKey="net_flow_formatted"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{
              fill: "#3b82f6",
              r: 5,
              strokeWidth: 2,
              stroke: "#1e293b"
            }}
            activeDot={{ r: 7, strokeWidth: 2 }}
            name="Net Cash Flow"
          />
        </LineChart>
      </ResponsiveContainer>

      {showHeader && (
        <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-slate-700">
          <StatBlock
            label="Highest"
            value={`${currency}${toMillions(highest).toFixed(2)}M`}
          />
          <StatBlock
            label="Lowest"
            value={`${currency}${toMillions(lowest).toFixed(2)}M`}
          />
          <StatBlock
            label="Variance"
            value={`${currency}${toMillions(variance).toFixed(2)}M`}
          />
        </div>
      )}
    </div>
  );
};

export default CashFlowTrendChart;
