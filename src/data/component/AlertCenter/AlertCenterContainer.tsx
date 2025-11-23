import { useState, useMemo } from "react";
import { AlertPanel, generateSmartAlerts } from "../DashordComponent/Alert";
import { AlertBellIcon } from "../DashordComponent/AlertBellIcon";


export default function AlertCenterContainer() {
  const [isAlertPanelOpen, setIsAlertPanelOpen] = useState(false);

  const alerts = useMemo(() =>
    generateSmartAlerts({
      stabilityScore: 55,
      netCashFlow: 3500000,
      expenseBreakdown: [
        { category: "COGS / Inventory", amount: 3200000, percentage: 32 },
        { category: "Payroll / Wages", amount: 2400000, percentage: 24 },
        { category: "Logistics / Transport", amount: 1800000, percentage: 18 },
        { category: "Rent / Utilities", amount: 700000, percentage: 7 },
        { category: "Marketing", amount: 400000, percentage: 4 },
      ],
      cashFlowTrend: [
        { date: "Week 1", net_flow: 2100000 },
        { date: "Week 2", net_flow: 1850000 },
        { date: "Week 3", net_flow: 1600000 },
        { date: "Week 4", net_flow: 1400000 },
      ],
    }),
  []);

  return (
    <>
      {/* This makes the panel globally available */}
      <AlertPanel
        alerts={alerts}
        isOpen={isAlertPanelOpen}
        onClose={() => setIsAlertPanelOpen(false)}
      />

      {/* Expose click handler + count */}
      <AlertBellIcon
        count={alerts.length}
        onClick={() => setIsAlertPanelOpen(true)}
        isOpen={isAlertPanelOpen}
      />
    </>
  );
}
