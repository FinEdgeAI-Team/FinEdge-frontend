import React, { useState } from "react";
import { Upload, Download, FileText, List, ChevronRight } from "lucide-react";

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  onClick: () => void;
  isActive?: boolean;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon,
  label,
  description,
  onClick,
  isActive = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        group w-full flex items-center justify-between p-3.5 rounded-lg border transition-all
        ${
          isActive
            ? "bg-blue-600 hover:bg-blue-700 border-blue-500 text-white shadow-lg hover:shadow-xl"
            : "bg-slate-700 hover:bg-slate-600 border-slate-600 text-white hover:border-slate-500"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div
          className={`
            rounded-lg p-2 transition-colors shrink-0
            ${isActive ? "bg-blue-700 group-hover:bg-blue-800" : "bg-slate-600 group-hover:bg-slate-500"}
          `}
        >
          {icon}
        </div>
        <div className="text-left">
          <div className="font-medium md:text-sm text-xs">{label}</div>
          {description && (
            <div
              className={`text-xs mt-0.5 ${isActive ? "text-blue-100" : "text-slate-400"}`}
            >
              {description}
            </div>
          )}
        </div>
      </div>
      <ChevronRight
        className={`w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0 ${
          isActive ? "text-blue-200" : "text-slate-500"
        }`}
      />
    </button>
  );
};

const QuickActions: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const actions = [
    {
      icon: <Upload className="w-5 h-5" />,
      label: "Upload CSV",
      desc: "Import transaction data",
    },
    {
      icon: <Download className="w-5 h-5" />,
      label: "Download Sample",
      desc: "Get template CSV",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: "Export Report",
      desc: "Generate financial report",
    },
    {
      icon: <List className="w-5 h-5" />,
      label: "View Transactions",
      desc: "See full transaction list",
    },
  ];

  return (
    <div className="bg-slate-800 rounded-lg p-6 border w-full border-slate-700 h-full">
      <h3 className="md:text-lg text-md font-semibold text-white mb-4">
        Quick Actions
      </h3>

      <div className="space-y-3">
        {actions.map((action, index) => (
          <QuickActionButton
            key={index}
            icon={action.icon}
            label={action.label}
            description={action.desc}
            isActive={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
