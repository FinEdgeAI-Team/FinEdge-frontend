import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import FinancialDashboard from '../../data/component/DashordComponent/Analytics'
<<<<<<< HEAD
import CashFlowTrendChart from './cashflowChart'
=======
import CashFlowTrendChart from '../../data/component/DashordComponent/cashFlowChart'
>>>>>>> 251f9430120b6e2a7d793e591665c7a0a1bc6cb4
import { dashboardData } from '../../data/dashboardData'
import ExpenseBreakdown from '../../data/component/DashordComponent/ExpenseBreakdown'
import RecentTransactionsTable from '../../data/component/DashordComponent/RecentTransactionsTable'

<<<<<<< HEAD
export const Route = createFileRoute('/Dashboard/')({
  component: RouteComponent,
})
=======
export const Route = createFileRoute("/Dashboard/")({
  component: RouteComponent,
});
>>>>>>> 251f9430120b6e2a7d793e591665c7a0a1bc6cb4

function RouteComponent() {
  return <Dashboard />
}

const Dashboard: React.FC = () => {
  // Extract available months
  const months = Object.keys(dashboardData)

  // Default to latest month
  const [selectedMonth, setSelectedMonth] = useState<string>(
    months[months.length - 1]
  )

  // Current month data
  const currentData = dashboardData[selectedMonth as keyof typeof dashboardData]

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
<<<<<<< HEAD
        
=======
>>>>>>> 251f9430120b6e2a7d793e591665c7a0a1bc6cb4
        <FinancialDashboard />

        {/* Month Selector */}
        <div className="mt-8 mb-8 flex items-center gap-4 bg-slate-800 p-4 rounded-lg border border-slate-700">
          <label className="text-white font-semibold">Select Month:</label>
<<<<<<< HEAD

=======
>>>>>>> 251f9430120b6e2a7d793e591665c7a0a1bc6cb4
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

        <RecentTransactionsTable/>
        <ExpenseBreakdown />
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Dashboard
=======
export default Dashboard;
>>>>>>> 251f9430120b6e2a7d793e591665c7a0a1bc6cb4
