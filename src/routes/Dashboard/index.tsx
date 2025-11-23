import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import FinancialDashboard from "../../data/component/DashordComponent/Analytics";
import { dashboardData } from "../../data/dashboardData"; // Import your data
import CashFlowTrendChart from "../../data/component/DashordComponent/cashFlowChart";

export const Route = createFileRoute("/Dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Dashboard />;
}

const Dashboard: React.FC = () => {
  // Get available months from dashboardData
  const months = Object.keys(dashboardData);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    months[months.length - 1]
  ); // Default to latest month

  // Get current month's data
  const currentData =
    dashboardData[selectedMonth as keyof typeof dashboardData];

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <FinancialDashboard />

        {/* Month Selector */}
        <div className="mb-8 mt-8 flex gap-4 items-center bg-slate-800 p-4 rounded-lg border border-slate-700">
          <label className="text-white font-semibold">Select Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 cursor-pointer hover:bg-slate-600 transition-colors"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* Cash Flow Chart */}
        <CashFlowTrendChart
          data={currentData.cash_flow_trend}
          title={`Cash Flow Trend - ${selectedMonth}`}
          showHeader={true}
          height={300}
          currency="₦"
        />
      </div>
    </div>
  );
};

export default Dashboard;
