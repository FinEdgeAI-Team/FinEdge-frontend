import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { RefreshCw } from 'lucide-react';
import { dashboardData } from '../../dashboardData';

interface ChartDataItem {
  name: string;
  value: number;
  amount: number;
  color: string;
}

const ExpenseBreakdown = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("Nov 2025");
  
  const months = Object.keys(dashboardData);
  
  // Get top 3 expenses for selected month
  const getTop3Expenses = (): ChartDataItem[] => {
    const monthData = dashboardData[selectedMonth as keyof typeof dashboardData];
    const expenses = monthData.expense_breakdown;
    const top3 = expenses.slice(0, 3);
    
    return top3.map((expense, index) => ({
      name: expense.category,
      value: expense.percentage,
      amount: expense.amount,
      color: index === 0 ? '#3B82F6' : index === 1 ? '#8B5CF6' : '#10B981'
    }));
  };

  const data = getTop3Expenses();

  const handleRefresh = () => {
    const currentIndex = months.indexOf(selectedMonth);
    const nextIndex = (currentIndex + 1) % months.length;
    setSelectedMonth(months[nextIndex]);
  };

  const formatCurrency = (amount: number): string => {
    return `₦${(amount / 1000000).toFixed(1)}M`;
  };

  const renderLabel = (entry: ChartDataItem) => {
    return `${entry.value}%`;
  };

  return (
    <div className="min-h-screenflex items-center justify-center p-8">
      <div className="bg-gray-900 rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-gray-300 text-lg font-medium">Top 3 Expense Breakdown</h2>
          <button
            onClick={handleRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
          >
            Refresh
            <RefreshCw size={16} />
          </button>
        </div>
        
        <div className="mb-6">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className=" text-gray-300 px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
          >
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
              label={renderLabel}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-300 text-sm">{entry.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-300 text-sm">
                    {item.name}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold" style={{ color: item.color }}>
                    {item.value}%
                  </div>
                  <div className="text-gray-400 text-xs">
                    {formatCurrency(item.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-800">
          <div className="text-center">
            <div className="text-gray-400 text-sm mb-2">Total Top 3 Expenses</div>
            <div className="text-2xl font-bold text-blue-400">
              {formatCurrency(data.reduce((sum, item) => sum + item.amount, 0))}
            </div>
            <div className="text-gray-500 text-xs mt-1">
              {data.reduce((sum, item) => sum + item.value, 0).toFixed(1)}% of total expenses
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseBreakdown;