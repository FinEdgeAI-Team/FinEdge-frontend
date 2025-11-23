import React from 'react';
import { AlertTriangle} from 'lucide-react';

interface CashCrisisAlertProps {
  title: string;
  days_until: number;
  amount: number;
  confidence: number;
  formatCurrency: (amount: number) => string;
}

const CashCrisisAlert: React.FC<CashCrisisAlertProps> = ({
  title,
  days_until,
  amount,
  confidence,
  formatCurrency,
}) => {
  return (
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
      <div className="flex items-start gap-3">
        <div className="bg-amber-500/20 rounded-full p-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-amber-400 mb-2">{title}</h3>
          <p className="text-slate-300 text-sm mb-3">
            Predicted shortfall of <span className="font-bold">{formatCurrency(amount)}</span> in {days_until} days
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Confidence: {confidence}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashCrisisAlert;