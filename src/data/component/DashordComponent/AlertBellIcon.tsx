import { Bell } from "lucide-react";
import type { AlertBellIconProps } from "../../../types";

export const AlertBellIcon: React.FC<AlertBellIconProps> = ({
  count,
  onClick,
  isOpen,
}) => (
  <button
    onClick={onClick}
    className={`relative p-3 rounded-xl cursor-pointer transition-all duration-200 ${
      isOpen
        ? " text-white"
        : " text-slate-300 hover:bg-slate-700 hover:text-white"
    }`}
  >
    <Bell className="text-lg " />
    {count > 0 && (
      <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1.5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center ">
        {count}
      </span>
    )}
  </button>
);
