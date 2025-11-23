import React from 'react';
import { TrendingUp } from 'lucide-react';

interface AiCoachRecommendationProps {
  recommendation: string;
  onViewDetails?: () => void;
}

const AiCoachRecommendation: React.FC<AiCoachRecommendationProps> = ({
  recommendation,
  onViewDetails,
}) => {
  return (
    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
      <div className="flex items-start gap-3">
        <div className="bg-blue-500/20 rounded-full p-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-blue-400 mb-2">AI Coach Insight</h3>
          <p className="text-slate-300 text-sm mb-3">
            {recommendation}
          </p>
          <button 
            onClick={onViewDetails}
            className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiCoachRecommendation;