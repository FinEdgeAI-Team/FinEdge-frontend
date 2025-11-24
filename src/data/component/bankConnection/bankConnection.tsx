import { useState } from "react";
import { Download } from "lucide-react";

// Dummy list of banks
const banks = ["GTBank", "Access Bank", "Zenith Bank", "UBA", "First Bank"];

// Dummy transaction data (replace with API response)
interface Transaction {
  date: string;
  description: string;
  amount: number;
  type: "debit" | "credit";
}

export default function BankConnectionPage() {
  const [connectedBank, setConnectedBank] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  // Simulate connecting to a bank
  const connectBank = async (bank: string) => {
    setLoading(true);
    // Replace this with real API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setConnectedBank(bank);

    // Fetch transactions from bank API (stubbed here)
    const dummyTransactions: Transaction[] = [
      {
        date: "2025-11-01",
        description: "Salary",
        amount: 200000,
        type: "credit",
      },
      {
        date: "2025-11-03",
        description: "Groceries",
        amount: 45000,
        type: "debit",
      },
      {
        date: "2025-11-10",
        description: "Electricity Bill",
        amount: 15000,
        type: "debit",
      },
    ];
    setTransactions(dummyTransactions);
    setLoading(false);
  };

  // Generate CSV string
  const generateCSV = () => {
    if (!transactions.length) return "";
    const header = ["Date", "Description", "Amount", "Type"];
    const rows = transactions.map((t) => [
      t.date,
      t.description,
      t.amount,
      t.type,
    ]);
    return [header, ...rows].map((r) => r.join(",")).join("\n");
  };

  // Download CSV
  const downloadCSV = () => {
    const csv = generateCSV();
    if (!csv) return;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${connectedBank}_transactions.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <h1 className="md:text-2xl text-md font-bold text-white mb-2">
        Connect Your Bank
      </h1>
      <p className="text-slate-400 mb-6">
        Securely link your Nigerian bank account to auto-generate your
        transactions CSV.
      </p>

      {/* Bank Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {banks.map((bank) => (
          <div
            key={bank}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center gap-4"
          >
            <h2 className="text-white font-semibold">{bank}</h2>
            <button
              className={`px-4 py-2 rounded text-white ${
                connectedBank === bank
                  ? "bg-green-500 cursor-default"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={() => connectedBank !== bank && connectBank(bank)}
              disabled={connectedBank === bank || loading}
            >
              {connectedBank === bank
                ? "Connected"
                : loading
                  ? "Connecting..."
                  : "Connect"}
            </button>
          </div>
        ))}
      </div>

      {/* Connected Bank & CSV Download */}
      {connectedBank && (
        <div className="mt-10">
          <h3 className="text-xl font-bold text-white mb-4">
            Connected Bank: {connectedBank}
          </h3>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-300">
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Type</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-slate-800 hover:bg-slate-800/30"
                  >
                    <td className="px-4 py-2 text-white">{t.date}</td>
                    <td className="px-4 py-2 text-white">{t.description}</td>
                    <td className="px-4 py-2 text-blue-400">
                      {t.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-slate-400">{t.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
            onClick={downloadCSV}
          >
            <Download size={16} />
            Download CSV
          </button>
        </div>
      )}
    </div>
  );
}
