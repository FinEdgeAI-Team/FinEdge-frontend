import { useMemo, useState } from "react";
import { AlertBellIcon } from "./AlertBellIcon";
import { AlertPanel, generateSmartAlerts } from "./Alert";

export default function AlertCenter() {
  const [isOpen, setIsOpen] = useState(false);

  // real or mock data — replace with backend later
  const mockExpenseBreakdown = [
    { category: "COGS / Inventory", amount: 3200000, percentage: 32 },
    { category: "Payroll / Wages", amount: 2400000, percentage: 24 },
    { category: "Logistics / Transport", amount: 1800000, percentage: 18 },
    { category: "Rent / Utilities", amount: 700000, percentage: 7 },
    { category: "Marketing", amount: 400000, percentage: 4 },
  ];

  const mockCashFlowTrend = [
    { date: "Week 1", net_flow: 2100000 },
    { date: "Week 2", net_flow: 1850000 },
    { date: "Week 3", net_flow: 1600000 },
    { date: "Week 4", net_flow: 1400000 },
  ];

  const alerts = useMemo(
    () =>
      generateSmartAlerts({
        stabilityScore: 55,
        netCashFlow: 3500000,
        expenseBreakdown: mockExpenseBreakdown,
        cashFlowTrend: mockCashFlowTrend,
      }),
    []
  );

  return (
    <>
      <AlertBellIcon
        count={alerts.length}
        onClick={() => setIsOpen(true)}
        isOpen={isOpen}
      />

      <AlertPanel
        alerts={alerts}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
