import { createFileRoute } from "@tanstack/react-router";
import CashFlowPage from "../../data/component/cashFlowComponent/cashflow";

export const Route = createFileRoute("/cashflow/")({
  component: Cashflow,
});

function Cashflow() {
  return (
    <div>
      <CashFlowPage />
    </div>
  );
}
