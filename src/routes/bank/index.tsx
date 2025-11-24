import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Loader2,
  ArrowRight,
  CheckCircle,
  Download,
  AlertTriangle,
  BarChart2,
  RefreshCcw,
} from "lucide-react";

export const Route = createFileRoute("/bank/")({
  component: BankConnectionPage,
});

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "debit" | "credit";
  category?: string;
}

interface BankAccount {
  name: string;
  logo: string;

  status: "available" | "connecting" | "connected" | "error";
  lastSync?: string;
}

// Bank data with better structure
const BANKS: BankAccount[] = [
  {
    name: "GTBank",

    logo: "GT",
    status: "available",
  },
  {
    name: "Access Bank",

    logo: "AB",
    status: "available",
  },
  {
    name: "Zenith Bank",

    logo: "ZB",
    status: "available",
  },
  {
    name: "UBA",
    logo: "UB",
    status: "available",
  },
  {
    name: "First Bank",

    logo: "FB",
    status: "available",
  },
];

// Generate realistic dummy transactions
const generateDummyTransactions = (): Transaction[] => {
  return [
    {
      id: "1",
      date: "2025-11-28",
      description: "Sales Revenue",
      amount: 580000,
      type: "credit",
      category: "income",
    },
    {
      id: "2",
      date: "2025-11-27",
      description: "Supplier Payment - ABC Logistics",
      amount: 125000,
      type: "debit",
      category: "expense",
    },
    {
      id: "3",
      date: "2025-11-26",
      description: "Customer Invoice - XYZ Ltd",
      amount: 420000,
      type: "credit",
      category: "income",
    },
    {
      id: "4",
      date: "2025-11-25",
      description: "Monthly Rent Payment",
      amount: 200000,
      type: "debit",
      category: "expense",
    },
    {
      id: "5",
      date: "2025-11-24",
      description: "Inventory Purchase",
      amount: 850000,
      type: "debit",
      category: "expense",
    },
    {
      id: "6",
      date: "2025-11-22",
      description: "Payroll Processing",
      amount: 520000,
      type: "debit",
      category: "expense",
    },
    {
      id: "7",
      date: "2025-11-21",
      description: "Customer Payment - Tech Corp",
      amount: 1200000,
      type: "credit",
      category: "income",
    },
    {
      id: "8",
      date: "2025-11-20",
      description: "Utilities & Internet",
      amount: 35000,
      type: "debit",
      category: "expense",
    },
  ];
};

// Format currency
const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) return `₦${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `₦${(amount / 1000).toFixed(0)}K`;
  return `₦${amount}`;
};

// Transaction Analysis Component
const TransactionAnalysis: React.FC<{ transactions: Transaction[] }> = ({
  transactions,
}) => {
  const totalIncome = transactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);

  const netFlow = totalIncome - totalExpense;

  const avgTransaction = (totalIncome + totalExpense) / transactions.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <p className="text-xs text-slate-400 mb-2">Total Income</p>
        <p className="md:text-2xl text-xl font-bold text-green-400">
          {formatCurrency(totalIncome)}
        </p>
        <p className="text-xs text-slate-500 mt-2">
          {transactions.filter((t) => t.type === "credit").length} transactions
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <p className="text-xs text-slate-400 mb-2">Total Expenses</p>
        <p className="md:text-2xl text-xl font-bold text-red-400">
          {formatCurrency(totalExpense)}
        </p>
        <p className="text-xs text-slate-500 mt-2">
          {transactions.filter((t) => t.type === "debit").length} transactions
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <p className="text-xs text-slate-400 mb-2">Net Flow</p>
        <p
          className={`md:text-2xl text-xl font-bold ${netFlow >= 0 ? "text-emerald-400" : "text-amber-400"}`}
        >
          {formatCurrency(netFlow)}
        </p>
        <p className="text-xs text-slate-500 mt-2">
          {netFlow >= 0 ? "Positive" : "Negative"} trend
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <p className="text-xs text-slate-400 mb-2">Avg Transaction</p>
        <p className="md:text-2xl text-xl font-bold text-blue-400">
          {formatCurrency(avgTransaction)}
        </p>
        <p className="text-xs text-slate-500 mt-2">
          {transactions.length} total
        </p>
      </div>
    </div>
  );
};

// AI Recommendations Component
const AIRecommendations: React.FC<{
  transactions: Transaction[];
  bank: string;
}> = ({ transactions }) => {
  const recommendations = [];

  // Analyze transaction patterns
  const expenses = transactions.filter((t) => t.type === "debit");
  const avgExpense =
    expenses.reduce((sum, t) => sum + t.amount, 0) / expenses.length;

  if (expenses.length > 0) {
    const highExpenses = expenses.filter((t) => t.amount > avgExpense * 1.5);
    if (highExpenses.length > 0) {
      recommendations.push({
        title: "High Transaction Alert",
        description: `${highExpenses.length} expense(s) above your average. Review these for optimization.`,

        priority: "high",
      });
    }
  }

  // Check income vs expense ratio
  const totalIncome = transactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  if (expenses.length > 0) {
    const expenseRatio =
      (expenses.reduce((sum, t) => sum + t.amount, 0) / totalIncome) * 100;
    if (expenseRatio > 60) {
      recommendations.push({
        title: "High Expense Ratio",
        description: `Your expenses are ${expenseRatio.toFixed(0)}% of income. Consider cost optimization.`,

        priority: "medium",
      });
    }
  }

  // Suggest CSV sync frequency
  recommendations.push({
    title: "Auto-Sync Recommended",
    description:
      "Enable daily transaction sync to keep your data updated for accurate forecasting.",

    priority: "low",
  });

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-white mb-4">Recommendations</h3>
      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className={`border rounded-xl p-4 ${
              rec.priority === "high"
                ? "bg-red-500/10 border-red-500/30"
                : rec.priority === "medium"
                  ? "bg-amber-500/10 border-amber-500/30"
                  : "bg-blue-500/10 border-blue-500/30"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">
                {rec.priority === "high" ? (
                  <AlertTriangle className="text-white" />
                ) : rec.priority === "medium" ? (
                  <BarChart2 className="text-white" />
                ) : (
                  <RefreshCcw className="text-white" />
                )}
              </span>
              <div className="flex-1">
                <p className="font-semibold text-white text-sm">{rec.title}</p>
                <p className="text-xs text-slate-300 mt-1">{rec.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Component
export default function BankConnectionPage() {
  const [connectedBank, setConnectedBank] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [banks, setBanks] = useState<BankAccount[]>(BANKS);
  const connectBank = async (bankName: string) => {
    // Set only this bank to "connecting"
    setBanks((prev) =>
      prev.map((b) =>
        b.name === bankName ? { ...b, status: "connecting" } : b
      )
    );

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // After connection, mark it as connected
    setBanks((prev) =>
      prev.map((b) =>
        b.name === bankName
          ? { ...b, status: "connected", lastSync: new Date().toISOString() }
          : { ...b, status: "available" }
      )
    );

    setConnectedBank(bankName);
    setTransactions(generateDummyTransactions());
  };

  const generateCSV = (): string => {
    if (!transactions.length) return "";
    const header = ["Date", "Description", "Amount", "Type", "Category"];
    const rows = transactions.map((t) => [
      t.date,
      t.description,
      t.amount,
      t.type,
      t.category || "uncategorized",
    ]);
    return [header, ...rows].map((r) => r.join(",")).join("\n");
  };

  const downloadCSV = () => {
    const csv = generateCSV();
    if (!csv) return;

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${connectedBank}_transactions_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="md:text-3xl text-xl font-bold text-white mb-2">
            Bank Integration
          </h1>
          <p className="text-slate-400 text-sm md:text-xs">
            Securely connect your Nigerian bank account to auto-import
            transactions and get AI-powered financial insights.
          </p>
        </div>

        {/* Bank Cards Grid */}
        <div>
          <h2 className="md:text-lg text-md font-semibold text-white mb-4">
            Available Banks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {banks.map((bank) => (
              <button
                key={bank.name}
                onClick={() =>
                  bank.status === "available" && connectBank(bank.name)
                }
                className={`relative overflow-hidden rounded-xl p-5 transition-all duration-200 border-2 ${
                  bank.status === "connected"
                    ? "bg-emerald-500/10 border-emerald-500/50"
                    : "bg-slate-900 border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/50"
                }`}
                disabled={bank.status !== "available"}
              >
                {/* Bank Name */}
                <p className="font-semibold text-white text-sm text-center mb-4">
                  {bank.name}
                </p>

                {/* Status */}
                <div className="flex items-center justify-center gap-2">
                  {bank.status === "connected" ? (
                    <>
                      <CheckCircle size={16} className="text-emerald-400" />
                      <span className="text-xs font-semibold text-emerald-400">
                        Connected
                      </span>
                    </>
                  ) : bank.status === "connecting" ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      <span className="text-xs font-semibold text-slate-300">
                        Connecting...
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-xs font-semibold text-blue-400">
                        Connect
                      </span>
                      <ArrowRight className="text-white" size={12} />
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Connected Bank Section */}
        {connectedBank && (
          <div className="space-y-6">
            {/* Bank Status */}
            <div className="blue-500/10 border border-emerald-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Connected Account</p>
                  <p className="md:ext-2xl text-xl font-bold text-white mt-1">
                    {connectedBank}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    Last sync: Just now
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-emerald-400 mb-2">
                    <CheckCircle size={18} />
                    <span className="font-semibold">Active</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {transactions.length} transactions
                  </p>
                </div>
              </div>
            </div>

            {/* Transaction Analysis */}
            <TransactionAnalysis transactions={transactions} />

            {/* Transactions Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white">
                  Recent Transactions
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-800/50 border-b border-slate-800">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">
                        Category
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="md:px-6 md:py-4 px-3 py-2 text-xs md:text-sm text-slate-300">
                          {transaction.date}
                        </td>
                        <td className="md:px-6 md:py-4 px-3 py-2 text-xs md:text-sm text-white font-medium">
                          {transaction.description}
                        </td>
                        <td className="md:px-6 md:py-4 px-3 py-2 text-xs md:text-sm">
                          <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 capitalize">
                            {transaction.category || "Other"}
                          </span>
                        </td>
                        <td
                          className={`md:px-6 md:py-4 px-3 py-2 text-xs md:text-sm  font-semibold text-right ${
                            transaction.type === "credit"
                              ? "text-emerald-400"
                              : "text-red-400"
                          }`}
                        >
                          {transaction.type === "credit" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Recommendations */}
            <AIRecommendations
              transactions={transactions}
              bank={connectedBank}
            />

            {/* Download Section */}
            <div
              className="flex items-center justify-between
             bg-blue-500/10  border border-blue-500/30
              rounded-xl md:p-6 px-3 py-4"
            >
              <div>
                <p className="font-semibold text-white mb-1">
                  Export Transactions
                </p>
                <p className="text-sm text-slate-400">
                  Download your transaction history as CSV for accounting or
                  analysis
                </p>
              </div>
              <button
                onClick={downloadCSV}
                className="flex items-center gap-2 md:px-6 md:py-3 px-3 py-2
                 bg-blue-600 hover:bg-blue-700 text-white font-semibold
                  rounded-lg transition-colors whitespace-nowrap text-xs md:text-lg"
              >
                <Download size={18} />
                Download CSV
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
