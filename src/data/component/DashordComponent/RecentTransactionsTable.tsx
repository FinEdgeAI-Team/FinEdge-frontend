import React, { useState } from 'react';
import { Edit2, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample transaction data matching the PRD categories
const generateTransactions = () => {
  const categories = [
    "Sales Revenue",
    "COGS / Inventory",
    "Logistics / Transport",
    "Rent / Utilities",
    "Payroll / Wages",
    "Marketing / Promotions",
    "Taxes / Fees",
    "Other Operating"
  ];
  
  const descriptions = {
    "Sales Revenue": ["Moniepoint POS Sale", "M-Pesa Payment", "Cash Sale - Store", "Online Transfer"],
    "COGS / Inventory": ["Supplier Payment - ABC Ltd", "Inventory Restock", "Wholesale Purchase"],
    "Logistics / Transport": ["DHL Delivery", "Uber Freight", "Fuel - Dispatch Van", "Courier Service"],
    "Rent / Utilities": ["Office Rent Nov", "PHCN Bill", "Water Bill", "Internet - Spectranet"],
    "Payroll / Wages": ["Salary - Staff", "Overtime Payment", "Sales Commissions"],
    "Marketing / Promotions": ["Facebook Ads", "Flyer Printing", "Promo Materials"],
    "Taxes / Fees": ["Bank Charges", "VAT Payment", "Transaction Fee"],
    "Other Operating": ["Office Supplies", "Maintenance", "Miscellaneous"]
  };
  
  const transactions = [];
  const today = new Date('2025-11-23');
  
  for (let i = 0; i < 45; i++) {
    const daysAgo = Math.floor(i / 3);
    const txDate = new Date(today);
    txDate.setDate(txDate.getDate() - daysAgo);
    
    const category = categories[Math.floor(Math.random() * categories.length)];
    const descOptions = descriptions[category];
    const description = descOptions[Math.floor(Math.random() * descOptions.length)];
    
    const isInflow = category === "Sales Revenue";
    const baseAmount = isInflow ? 
      Math.floor(Math.random() * 500000) + 50000 :
      Math.floor(Math.random() * 300000) + 20000;
    
    transactions.push({
      id: `txn_${String(i + 1).padStart(4, '0')}`,
      date: txDate.toISOString().split('T')[0],
      description,
      category,
      amount: isInflow ? baseAmount : -baseAmount,
      status: Math.random() > 0.05 ? 'completed' : 'pending',
      currency: 'NGN'
    });
  }
  
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const RecentTransactionsTable = () => {
  const [transactions, setTransactions] = useState(generateTransactions());
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editCategory, setEditCategory] = useState('');
  
  const itemsPerPage = 15;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);
  
  const categories = [
    "Sales Revenue",
    "COGS / Inventory",
    "Logistics / Transport",
    "Rent / Utilities",
    "Payroll / Wages",
    "Marketing / Promotions",
    "Taxes / Fees",
    "Debt Repayment / Interest",
    "Credit / Loan Disbursement",
    "Owner Contribution",
    "Other Operating"
  ];
  
  const formatAmount = (amount, currency) => {
    const absAmount = Math.abs(amount);
    const formatted = (absAmount / 100).toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return `${currency} ${formatted}`;
  };
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };
  
  const handleEditClick = (transaction) => {
    setEditingId(transaction.id);
    setEditCategory(transaction.category);
  };
  
  const handleSaveCategory = (id) => {
    setTransactions(transactions.map(tx => 
      tx.id === id ? { ...tx, category: editCategory } : tx
    ));
    setEditingId(null);
  };
  
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditCategory('');
  };
  
  return (
    <div className="rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All →
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Description</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Category</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction) => (
              <tr 
                key={transaction.id} 
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 text-sm text-gray-700">
                  {formatDate(transaction.date)}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                  {transaction.description}
                </td>
                <td className="py-3 px-4 text-sm">
                  {editingId === transaction.id ? (
                    <div className="flex gap-2">
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSaveCategory(transaction.id)}
                        className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-xs bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      transaction.category === 'Sales Revenue' ? 'bg-green-100 text-green-800' :
                      transaction.category.includes('COGS') ? 'bg-purple-100 text-purple-800' :
                      transaction.category.includes('Logistics') ? 'bg-orange-100 text-orange-800' :
                      transaction.category.includes('Payroll') ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {transaction.category}
                    </span>
                  )}
                </td>
                <td className={`py-3 px-4 text-sm text-right font-semibold ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}
                  {formatAmount(transaction.amount, transaction.currency)}
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    transaction.status === 'completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {transaction.status === 'completed' ? '✓ Completed' : '⏳ Pending'}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  {editingId !== transaction.id && (
                    <button
                      onClick={() => handleEditClick(transaction)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Edit category"
                    >
                      <Edit2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, transactions.length)} of {transactions.length} transactions
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              if (
                pageNum === 1 || 
                pageNum === totalPages || 
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 text-sm rounded ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (
                pageNum === currentPage - 2 || 
                pageNum === currentPage + 2
              ) {
                return <span key={pageNum} className="px-2">...</span>;
              }
              return null;
            })}
          </div>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactionsTable;