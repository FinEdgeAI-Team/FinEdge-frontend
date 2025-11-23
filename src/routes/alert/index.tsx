import { createFileRoute } from "@tanstack/react-router";
import AlertCenterDemo from "../../data/component/DashordComponent/Alert";

export const Route = createFileRoute("/alert/")({
  component: Alert,
});

function Alert() {
  return (
    <div>
      <AlertCenterDemo />
    </div>
  );
}
