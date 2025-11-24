import { Download, Filter } from "lucide-react";
import { useState } from "react";

const formatAmount = (amount: number) => `₦${amount.toLocaleString()}`;

export const ExpenseReportsPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<
    "all" | "paid" | "pending" | "overdue"
  >("all");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  interface ExpenseItem {
    id: string;
    category: string;
    amount: number;
    date: string;
    vendor: string;
    status: "paid" | "pending" | "overdue";
  }

  const expenses: ExpenseItem[] = [
    {
      id: "1",
      category: "Logistics",
      amount: 125000,
      date: "2025-11-28",
      vendor: "ABC Logistics",
      status: "paid",
    },
    {
      id: "2",
      category: "Inventory",
      amount: 850000,
      date: "2025-11-26",
      vendor: "Supplier XYZ",
      status: "paid",
    },
    {
      id: "3",
      category: "Rent",
      amount: 200000,
      date: "2025-11-25",
      vendor: "Property Management",
      status: "pending",
    },
    {
      id: "4",
      category: "Payroll",
      amount: 520000,
      date: "2025-11-24",
      vendor: "Staff Salary",
      status: "paid",
    },
    {
      id: "5",
      category: "Marketing",
      amount: 85000,
      date: "2025-11-22",
      vendor: "Ad Agency",
      status: "overdue",
    },
    {
      id: "6",
      category: "Utilities",
      amount: 35000,
      date: "2025-11-20",
      vendor: "Power Company",
      status: "pending",
    },
  ];

  const filteredExpenses = expenses.filter(
    (e) => filterStatus === "all" || e.status === filterStatus
  );
  const sortedExpenses = [...filteredExpenses].sort((a, b) =>
    sortBy === "date"
      ? new Date(b.date).getTime() - new Date(a.date).getTime()
      : b.amount - a.amount
  );

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const paidExpenses = expenses
    .filter((e) => e.status === "paid")
    .reduce((sum, e) => sum + e.amount, 0);
  const pendingExpenses = expenses
    .filter((e) => e.status === "pending")
    .reduce((sum, e) => sum + e.amount, 0);
  const overdueExpenses = expenses
    .filter((e) => e.status === "overdue")
    .reduce((sum, e) => sum + e.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "overdue":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 md:p-6 p-4">
      <div className="max-w-6xl mx-auto md:space-y-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="md:text-3xl text-xl font-bold text-white mb-2">
            Expense Reports
          </h1>
          <p className="text-slate-400 md:text-xl text-sm">
            Track and manage all your business expenses
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className="text-xs font-medium text-slate-400 mb-1">
              Total Expenses
            </p>
            <p className="md:text-2xl text-xl font-bold text-white">
              ₦{(totalExpenses / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-slate-500 mt-2">
              {expenses.length} transactions
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className="text-xs font-medium text-emerald-400 mb-1">Paid</p>
            <p className="md:text-2xl text-xl font-bold text-white">
              ₦{(paidExpenses / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-slate-500 mt-2">
              {expenses.filter((e) => e.status === "paid").length} processed
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className="text-xs font-medium text-amber-400 mb-1">Pending</p>
            <p className="md:text-2xl text-xl font-bold text-white">
              ₦{(pendingExpenses / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-slate-500 mt-2">
              {expenses.filter((e) => e.status === "pending").length} awaiting
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className="text-xs font-medium text-red-400 mb-1">Overdue</p>
            <p className="md:text-2xl text-xl font-bold text-white">
              ₦{(overdueExpenses / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-slate-500 mt-2">
              {expenses.filter((e) => e.status === "overdue").length} overdue
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-2">
            <Filter size={18} className="text-slate-400 mt-2" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="md:px-4 md:py-2 px-3 py-1.5 bg-slate-800 border cursor-pointer border-slate-700 rounded-lg text-white text-sm focus:border-blue-600 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="md:px-4 md:py-2 px-3 py-1.5 bg-slate-800 cursor-pointer border border-slate-700 rounded-lg text-white text-sm focus:border-blue-600 focus:outline-none"
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
            </select>
          </div>

          <button
            className="flex items-center gap-2 md:px-4 px-3 py-2
           bg-blue-600 hover:bg-blue-700 text-white font-medium 
           rounded-lg transition-colors text-sm md:text-md"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>

        {/* Expenses Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-800/50 border-b border-slate-800">
                  {["Date", "Category", "Vendor", "Amount", "Status"].map(
                    (col, idx) => (
                      <th
                        key={idx}
                        className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left text-xs sm:text-sm md:text-base font-semibold text-slate-300"
                        {...(col === "Amount" && {
                          className:
                            "px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-right text-xs sm:text-sm md:text-base font-semibold text-slate-300",
                        })}
                        {...(col === "Status" && {
                          className:
                            "px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-center text-xs sm:text-sm md:text-base font-semibold text-slate-300",
                        })}
                      >
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {sortedExpenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-sm text-slate-300">
                      {expense.date}
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-sm text-white font-medium">
                      {expense.category}
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-sm text-slate-300">
                      {expense.vendor}
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-sm font-semibold text-white text-right">
                      {formatAmount(expense.amount)}
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-center">
                      <span
                        className={`px-2 sm:px-3 md:px-3 py-0.5 sm:py-1 md:py-1 rounded-full text-xs sm:text-sm md:text-sm font-medium border ${getStatusColor(
                          expense.status
                        )} capitalize`}
                      >
                        {expense.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
