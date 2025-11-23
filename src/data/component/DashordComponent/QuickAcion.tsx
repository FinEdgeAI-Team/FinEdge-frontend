import React from 'react';
import { 
  Upload, 
  Download, 
  FileText, 
  List,
  ChevronRight
} from 'lucide-react';

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ 
  icon, 
  label, 
  description,
  onClick,
  variant = 'secondary'
}) => {
  const isPrimary = variant === 'primary';
  
  return (
    <button
      onClick={onClick}
      className={`
        group w-full flex items-center justify-between p-3.5 rounded-lg border transition-all
        ${isPrimary 
          ? 'bg-blue-600 hover:bg-blue-700 border-blue-500 text-white shadow-lg hover:shadow-xl' 
          : 'bg-slate-700 hover:bg-slate-600 border-slate-600 text-white hover:border-slate-500'
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div className={`
          rounded-lg p-2 transition-colors shrink-0
          ${isPrimary 
            ? 'bg-blue-700 group-hover:bg-blue-800' 
            : 'bg-slate-600 group-hover:bg-slate-500'
          }
        `}>
          {icon}
        </div>
        <div className="text-left">
          <div className="font-medium text-sm">{label}</div>
          {description && (
            <div className={`text-xs mt-0.5 ${isPrimary ? 'text-blue-100' : 'text-slate-400'}`}>
              {description}
            </div>
          )}
        </div>
      </div>
      <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0 ${
        isPrimary ? 'text-blue-200' : 'text-slate-500'
      }`} />
    </button>
  );
};

interface QuickActionsProps {
  onUploadCSV?: () => void;
  onDownloadSample?: () => void;
  onExportReport?: () => void;
  onViewTransactions?: () => void;
  title?: string;
  showTitle?: boolean;
  layout?: 'vertical' | 'horizontal';
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onUploadCSV = () => console.log('Upload CSV'),
  onDownloadSample = () => console.log('Download Sample'),
  onExportReport = () => console.log('Export Report'),
  onViewTransactions = () => console.log('View Transactions'),
  title = "Quick Actions",
  showTitle = true,
  layout = 'vertical'
}) => {
  const isVertical = layout === 'vertical';
  
  return (
    <div className="bg-slate-800 rounded-lg p-6 border w-full border-slate-700 h-full">
      {showTitle && (
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      )}
      
      <div className={`
        ${isVertical 
          ? 'space-y-3' 
          : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'
        }
      `}>
        <QuickActionButton
          icon={<Upload className="w-5 h-5" />}
          label="Upload CSV"
          description="Import transaction data"
          onClick={onUploadCSV}
          variant="primary"
        />
        
        <QuickActionButton
          icon={<Download className="w-5 h-5" />}
          label="Download Sample"
          description="Get template CSV"
          onClick={onDownloadSample}
        />
        
        <QuickActionButton
          icon={<FileText className="w-5 h-5" />}
          label="Export Report"
          description="Generate financial report"
          onClick={onExportReport}
        />
        
        <QuickActionButton
          icon={<List className="w-5 h-5" />}
          label="View Transactions"
          description="See full transaction list"
          onClick={onViewTransactions}
        />
      </div>
    </div>
  );
};

export default QuickActions;