import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import FinancialDashboard from '../../data/component/DashordComponent/Analytics'
import CashFlowTrendChart from '../../data/component/DashordComponent/cashFlowChart'
import { dashboardData } from '../../data/dashboardData'
import ExpenseBreakdown from '../../data/component/DashordComponent/ExpenseBreakdown'
import RecentTransactionsTable from '../../data/component/DashordComponent/RecentTransactionsTable'
import QuickActionsDemo from '../../data/component/DashordComponent/QuickAcion'
import TaxObligationsWidget from '../../data/component/DashordComponent/Tax'

export const Route = createFileRoute('/Dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Dashboard />
}

const Dashboard: React.FC = () => {
  const months = Object.keys(dashboardData)

  const [selectedMonth, setSelectedMonth] = useState<string>(
    months[months.length - 1]
  )

  const currentData =
    dashboardData[selectedMonth as keyof typeof dashboardData]

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">

        <FinancialDashboard />

        {/* Month Selector */}
        <div className="mt-8 mb-8 flex items-center gap-4 bg-slate-800 p-4 rounded-lg border border-slate-700">
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

        <RecentTransactionsTable />
        <div className="flex flex-col justify-between md:flex-row gap-6 mt-8">
          <ExpenseBreakdown />
          <div className="flex flex-col gap-4 md:w-1/2">
            <QuickActionsDemo />
            <TaxObligationsWidget  />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
