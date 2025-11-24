import React from "react";
import { Calendar, AlertCircle, CheckCircle, Clock } from "lucide-react";

interface TaxObligation {
  name: string;
  amount: number;
  due: string;
  days: number;
}

interface TaxObligationsWidgetProps {
  obligations?: TaxObligation[];
  title?: string;
  showTitle?: boolean;
  currency?: string;
}

const TaxObligationItem: React.FC<{
  obligation: TaxObligation;
  currency: string;
}> = ({ obligation, currency }) => {
  // Determine urgency level
  const getUrgencyLevel = (days: number) => {
    if (days <= 7) return "critical";
    if (days <= 14) return "warning";
    return "normal";
  };

  const urgency = getUrgencyLevel(obligation.days);

  const urgencyStyles = {
    critical: {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      text: "text-red-400",
      icon: "text-red-400",
      badge: "bg-red-500/20 text-red-400",
    },
    warning: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-400",
      icon: "text-amber-400",
      badge: "bg-amber-500/20 text-amber-400",
    },
    normal: {
      bg: "bg-slate-700/50",
      border: "border-slate-600",
      text: "text-slate-300",
      icon: "text-slate-400",
      badge: "bg-slate-600 text-slate-300",
    },
  };

  const styles = urgencyStyles[urgency];

  const formatCurrency = (amount: number) => {
    return `${currency}${(amount / 1000000).toFixed(2)}M`;
  };

  return (
    <div
      className={`${styles.bg} border ${styles.border} rounded-lg p-4 transition-all hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className={`w-4 h-4 ${styles.icon}`} />
            <h4 className={`font-semibold ${styles.text} text-sm`}>
              {obligation.name}
            </h4>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Amount Due:</span>
              <span className="text-white font-bold text-sm">
                {formatCurrency(obligation.amount)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Due Date:</span>
              <span className="text-slate-300 font-medium text-xs">
                {obligation.due}
              </span>
            </div>
          </div>
        </div>

        {/* Days Remaining Badge */}
        <div className="flex flex-col items-end gap-2">
          <span
            className={`${styles.badge} px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap`}
          >
            {obligation.days} days
          </span>
          {urgency === "critical" && (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )}
          {urgency === "warning" && (
            <Clock className="w-4 h-4 text-amber-400" />
          )}
          {urgency === "normal" && (
            <CheckCircle className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </div>
    </div>
  );
};

const TaxObligationsWidget: React.FC<TaxObligationsWidgetProps> = ({
  obligations = [
    { name: "PAYE Nov 2025", amount: 1200000, due: "Dec 10", days: 22 },
    { name: "VAT Nov 2025", amount: 850000, due: "Dec 21", days: 33 },
    { name: "WHT Q4 2025", amount: 320000, due: "Dec 31", days: 43 },
  ],
  title = "Tax Obligations",
  showTitle = true,
  currency = "₦",
}) => {
  // Calculate total obligations
  const totalAmount = obligations.reduce((sum, item) => sum + item.amount, 0);
  const urgentCount = obligations.filter((item) => item.days <= 7).length;
  const warningCount = obligations.filter(
    (item) => item.days > 7 && item.days <= 14
  ).length;

  const formatCurrency = (amount: number) => {
    return `${currency}${(amount / 1000000).toFixed(2)}M`;
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      {showTitle && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="md:text-lg text-md font-semibold text-white">
              {title}
            </h3>
            {(urgentCount > 0 || warningCount > 0) && (
              <div className="flex items-center gap-2">
                {urgentCount > 0 && (
                  <span className="bg-red-500/20 text-red-400 px-2.5 py-1 rounded-full text-xs font-semibold">
                    {urgentCount} Urgent
                  </span>
                )}
                {warningCount > 0 && (
                  <span className="bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-full text-xs font-semibold">
                    {warningCount} Due Soon
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Total Amount Summary */}
          <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 md:text-sm text-xs">
                Total Tax Obligations
              </span>
              <span className="text-white font-bold text-lg">
                {formatCurrency(totalAmount)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tax Obligations List */}
      <div className="space-y-3">
        {obligations.length > 0 ? (
          obligations
            .sort((a, b) => a.days - b.days)
            .map((obligation, index) => (
              <TaxObligationItem
                key={index}
                obligation={obligation}
                currency={currency}
              />
            ))
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-slate-400 text-xs md:text-sm">
              No upcoming tax obligations
            </p>
            <p className="text-slate-500 text-xs mt-1">You're all caught up!</p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {obligations.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-700">
          <button className="w-full md:text-sm text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors text-center">
            View All Tax Deadlines →
          </button>
        </div>
      )}
    </div>
  );
};

export default TaxObligationsWidget;
