import React from 'react';

interface SupplyChainAlert {
  id: number;
  type: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  impact: number;
}

interface SupplyChainAlertsProps {
  alerts: SupplyChainAlert[];
  formatCurrency: (amount: number) => string;
}

const SupplyChainAlerts: React.FC<SupplyChainAlertsProps> = ({
  alerts,
  formatCurrency,
}) => {
  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4">Supply Chain Alerts</h3>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className={`p-4 rounded-lg border ${
              alert.severity === 'critical' 
                ? 'bg-red-500/10 border-red-500/30' 
                : alert.severity === 'high'
                ? 'bg-orange-500/10 border-orange-500/30'
                : 'bg-yellow-500/10 border-yellow-500/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className={`font-medium ${
                  alert.severity === 'critical' 
                    ? 'text-red-400' 
                    : alert.severity === 'high'
                    ? 'text-orange-400'
                    : 'text-yellow-400'
                }`}>
                  {alert.title}
                </h4>
                <p className="text-sm text-slate-400 mt-1">
                  Potential impact: {formatCurrency(alert.impact)}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                alert.severity === 'critical' 
                  ? 'bg-red-500/20 text-red-400' 
                  : alert.severity === 'high'
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {alert.severity.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplyChainAlerts;