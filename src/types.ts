import {
  AlertTriangle,
  Clock,
  BarChart3,
  Lightbulb,
  ClipboardList,
} from "lucide-react";

export const AlertTypes = {
  cash_crunch: { icon: AlertTriangle, label: "Cash Alert" },
  payment_delay: { icon: Clock, label: "Payment" },
  expense_spike: { icon: BarChart3, label: "Expense" },
  opportunity: { icon: Lightbulb, label: "Opportunity" },
  tax_deadline: { icon: ClipboardList, label: "Tax" },
} as const;

export interface ExpenseItem {
  category: string;
  amount: number;
  percentage: number;
}

export interface CashFlowTrendItem {
  date: string;
  net_flow: number;
}

export interface GenerateSmartAlertParams {
  stabilityScore: number;
  netCashFlow: number;
  expenseBreakdown: ExpenseItem[];
  cashFlowTrend: CashFlowTrendItem[];
}

export interface SmartAlert {
  id: string;
  type: "cash_crunch" | "expense_spike" | "opportunity" | "tax_deadline";
  urgency: number;
  title: string;
  description: string;
  recommended_action: string;
  impact_if_ignored: string;
  potential_savings?: number;
  created_at: string;
}

// ---- ALERT BELL ICON PROPS ----
export interface AlertBellIconProps {
  count: number;
  onClick: () => void;
  isOpen: boolean;
}
