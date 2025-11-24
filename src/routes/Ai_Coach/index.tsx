import { createFileRoute } from "@tanstack/react-router";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Calculator,
  BookOpen,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/Ai_Coach/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AI />;
}

// Message and Insight Types
interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  insights?: Insight[];
  recommendations?: Recommendation[];
  actions?: Action[];
}

interface Insight {
  type: "metric" | "trend" | "alert";
  label: string;
  value: string;
  benchmark?: string;
}

interface Recommendation {
  id: string;
  priority: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  estimatedSavings?: number;
  effort: "low" | "medium" | "high";
  category: string;
}

interface Action {
  label: string;
  type: "primary" | "secondary";
  onClick: () => void;
}

interface ProactiveInsight {
  id: string;
  type: "critical" | "opportunity" | "best-practice";
  title: string;
  description: string;
  metric?: string;
  action: string;
}

interface FinancialData {
  cashBalance: number;
  monthlyRevenue: number;
  cashFlowStability: number;
  topExpenseCategory: string;
  topExpenseAmount: number;
  topExpensePercentage: number;
  daysToTaxDeadline: number;
  industryBenchmark: number;
  cashRunway: number;
  monthlyProfit: number;
}

// Mock Financial Data
const mockFinancialData: FinancialData = {
  cashBalance: 2800000,
  monthlyRevenue: 8000000,
  cashFlowStability: 68.3,
  topExpenseCategory: "Logistics",
  topExpenseAmount: 4000000,
  topExpensePercentage: 23.4,
  daysToTaxDeadline: 22,
  industryBenchmark: 16,
  cashRunway: 1.8,
  monthlyProfit: 1500000,
};

// Message Bubble Component
const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.type === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`flex gap-2 max-w-[85%] ${isUser ? "flex-row-reverse" : "flex-row"}`}
      >
        {/* Avatar */}
        <div
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser
              ? "bg-blue-500"
              : "bg-linear-to-br from-purple-500 to-blue-500"
          }`}
        >
          {isUser ? (
            <span className="text-white text-sm font-semibold">A</span>
          ) : (
            <Sparkles className="w-4 h-4 text-white" />
          )}
        </div>

        {/* Message Content */}
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>

          {/* Insights */}
          {message.insights && message.insights.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.insights.map((insight, idx) => (
                <div
                  key={idx}
                  className="bg-white bg-opacity-20 rounded-lg p-2 text-xs"
                >
                  <div className="font-semibold">{insight.label}</div>
                  <div className="mt-1">{insight.value}</div>
                  {insight.benchmark && (
                    <div className="mt-1 text-opacity-80">
                      Benchmark: {insight.benchmark}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Recommendations */}
          {message.recommendations && message.recommendations.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-white bg-opacity-20 rounded-lg p-3 text-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="font-semibold">{rec.title}</div>
                      <div className="mt-1 text-opacity-90">
                        {rec.description}
                      </div>
                      {rec.estimatedSavings && (
                        <div className="mt-2 font-semibold">
                          Potential savings: ₦
                          {(rec.estimatedSavings / 1000).toFixed(0)}K/month
                        </div>
                      )}
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        rec.priority === "critical"
                          ? "bg-red-500"
                          : rec.priority === "high"
                            ? "bg-orange-500"
                            : rec.priority === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                      } text-white`}
                    >
                      {rec.effort} effort
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          {message.actions && message.actions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {message.actions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={action.onClick}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    action.type === "primary"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white bg-opacity-30 hover:bg-opacity-40"
                  }`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}

          <div className="mt-2 text-xs opacity-60">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Insights Widget Component
const InsightsWidget: React.FC<{
  onInsightClick: (insight: ProactiveInsight) => void;
}> = ({ onInsightClick }) => {
  const insights: ProactiveInsight[] = [
    {
      id: "1",
      type: "critical",
      title: "Cash Shortfall in 18 Days",
      description: "Projected shortfall based on current spending pattern",
      metric: "₦1.2M needed",
      action: "View Plan",
    },
    {
      id: "2",
      type: "opportunity",
      title: "Early Payment Discount Available",
      description: "Your supplier offers 5% discount for early payment",
      metric: "Save ₦45K",
      action: "Learn More",
    },
    {
      id: "3",
      type: "best-practice",
      title: "Strong Cash Flow This Month",
      description: "Revenue up 12%. Consider building emergency fund",
      metric: "+12% vs last month",
      action: "Set Goal",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-white" />
        <h3 className="text-white text-xs md:text-md font-semibold">
          AI Coach Insights
        </h3>
      </div>

      <div className="divide-y divide-gray-100">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  insight.type === "critical"
                    ? "bg-red-100"
                    : insight.type === "opportunity"
                      ? "bg-yellow-100"
                      : "bg-green-100"
                }`}
              >
                {insight.type === "critical" ? (
                  <AlertTriangle className={`w-5 h-5 text-red-600`} />
                ) : insight.type === "opportunity" ? (
                  <TrendingUp className={`w-5 h-5 text-yellow-600`} />
                ) : (
                  <CheckCircle className={`w-5 h-5 text-green-600`} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-medium uppercase ${
                          insight.type === "critical"
                            ? "text-red-600"
                            : insight.type === "opportunity"
                              ? "text-yellow-600"
                              : "text-green-600"
                        }`}
                      >
                        {insight.type === "critical"
                          ? " Critical"
                          : insight.type === "opportunity"
                            ? " Opportunity"
                            : " Best Practice"}
                      </span>
                    </div>
                    <h4 className="font-semibold md:text-md text-sm text-gray-900 mt-1">
                      {insight.title}
                    </h4>
                    <p className="md:text-sm text-xs text-gray-600 mt-1">
                      {insight.description}
                    </p>
                    {insight.metric && (
                      <p className="md:text-sm text-xs font-semibold text-gray-900 mt-2">
                        {insight.metric}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => onInsightClick(insight)}
                    className="md:px-3 md:py-1.5 md:text-sm py-1 px-2  bg-blue-500 text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors"
                  >
                    {insight.action}
                  </button>
                  <button className="md:px-3 md:py-1.5 md:text-sm py-1 px-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Quick Actions Component
const QuickActions: React.FC<{ onActionClick: (action: string) => void }> = ({
  onActionClick,
}) => {
  const actions = [
    { id: "cashflow", label: "Cash Flow", icon: TrendingUp },
    { id: "expenses", label: "Expenses", icon: BarChart3 },
    { id: "planning", label: "Planning", icon: Calculator },
    { id: "learning", label: "Learn", icon: BookOpen },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.id}
            onClick={() => onActionClick(action.id)}
            className="flex items-center md:gap-2 gap-1 px-3 py-1 md:px-4 md:py-2 bg-gray-100 rounded-full text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors whitespace-nowrap"
          >
            <Icon className="md:w-4 md:h-4 w-3 h-3" />
            {action.label}
          </button>
        );
      })}
    </div>
  );
};

// Financial Health Score Component
const FinancialHealthScore: React.FC<{ score: number }> = ({ score }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return "from-green-500 to-green-600";
    if (score >= 60) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Financial Health Score
      </h3>

      <div className="flex items-center gap-6">
        <div className="relative w-32 h-32">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - score / 100)}`}
              className={`${getScoreGradient(score)} transition-all duration-1000`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
                {score}
              </div>
              <div className="text-xs text-gray-500">/ 100</div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Cash Flow Stability</span>
              <span className="font-semibold">40%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-blue-500 to-blue-600"
                style={{ width: "75%" }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Payment History</span>
              <span className="font-semibold">30%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-green-500 to-green-600"
                style={{ width: "90%" }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Expense Management</span>
              <span className="font-semibold">30%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-yellow-500 to-yellow-600"
                style={{ width: "60%" }}
              />
            </div>
          </div>
        </div>
      </div>

      <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
        How to Improve
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

// Rule-based Response Generator
const generateRuleBasedResponse = (
  query: string,
  financialData: FinancialData
): Message => {
  const lowerQuery = query.toLowerCase();
  const timestamp = new Date();

  // Cash flow inquiry
  if (
    lowerQuery.includes("cash flow") ||
    lowerQuery.includes("running out") ||
    lowerQuery.includes("cash")
  ) {
    return {
      id: Date.now().toString(),
      type: "ai",
      content: `Let me check your cash flow pattern, Aisha.\n\nI see the issue. Your big expenses all hit around the same time:\n• Rent: ₦800K on the 5th\n• Supplier payment: ₦3.5M on the 7th\n• Payroll: ₦2.4M on the 10th\n\nThat's ₦6.7M in 5 days! But your sales come in gradually throughout the month.\n\nQuick fix: Ask your supplier to split payment into 2 parts—half on the 7th, half on the 22nd.\n\nThis would smooth your cash flow and avoid shortfalls.`,
      timestamp,
      insights: [
        {
          type: "metric",
          label: "Current Cash Balance",
          value: `₦${(financialData.cashBalance / 1000000).toFixed(1)}M`,
          benchmark: "Target: ₦3M+ for safety",
        },
        {
          type: "metric",
          label: "Cash Runway",
          value: `${financialData.cashRunway} months`,
          benchmark: "Target: 3+ months",
        },
      ],
      actions: [
        { label: "Create Payment Plan", type: "primary", onClick: () => {} },
        { label: "See Cash Flow Chart", type: "secondary", onClick: () => {} },
      ],
    };
  }

  // Logistics/expense inquiry
  if (
    lowerQuery.includes("logistics") ||
    lowerQuery.includes("expense") ||
    lowerQuery.includes("cost") ||
    lowerQuery.includes("spending")
  ) {
    return {
      id: Date.now().toString(),
      type: "ai",
      content: `Your logistics costs are ₦${(financialData.topExpenseAmount / 1000000).toFixed(1)}M (${financialData.topExpensePercentage}% of revenue).\n\nIndustry average: ${financialData.industryBenchmark}%\n\nYou're spending about 45% more than similar businesses. Let me show you some ways to save:`,
      timestamp,
      insights: [
        {
          type: "metric",
          label: "Current Logistics Cost",
          value: `₦${(financialData.topExpenseAmount / 1000000).toFixed(1)}M (${financialData.topExpensePercentage}%)`,
          benchmark: `${financialData.industryBenchmark}% (industry average)`,
        },
      ],
      recommendations: [
        {
          id: "rec_001",
          priority: "high",
          title: "Consolidate shipments",
          description:
            "Combine weekly deliveries to reduce number of trips from 12 to 6 per month",
          estimatedSavings: 600000,
          effort: "low",
          category: "logistics",
        },
        {
          id: "rec_002",
          priority: "high",
          title: "Negotiate bulk rates",
          description:
            "Your volume qualifies for 15-20% bulk discount with major couriers",
          estimatedSavings: 400000,
          effort: "low",
          category: "logistics",
        },
        {
          id: "rec_003",
          priority: "medium",
          title: "Compare courier services",
          description:
            "GIG Logistics and Kwik offer 20% lower rates for your routes",
          estimatedSavings: 800000,
          effort: "medium",
          category: "logistics",
        },
      ],
      actions: [
        { label: "See Full Analysis", type: "primary", onClick: () => {} },
        { label: "Find Couriers", type: "secondary", onClick: () => {} },
      ],
    };
  }

  // Hiring inquiry
  if (
    lowerQuery.includes("hire") ||
    lowerQuery.includes("assistant") ||
    lowerQuery.includes("staff") ||
    lowerQuery.includes("employee")
  ) {
    return {
      id: Date.now().toString(),
      type: "ai",
      content: `Great question! Let me check if your business is ready.\n\nCurrent situation:\n💰 Monthly profit: ₦${(financialData.monthlyProfit / 1000000).toFixed(1)}M\n📊 Cash runway: ${financialData.cashRunway} months\n📈 Revenue trend: Stable (+3% last 3 months)\n\nAssistant cost: ₦150K/month\n\nMy recommendation: Not quite yet.\n\nHere's why: Your runway would drop to 1.2 months, which is risky.\n\nWhat I'd suggest instead:\n1. Wait until revenue grows 10% more (about 2-3 months)\n2. OR build cash runway to 3 months first\n3. Start with part-time help (₦75K/month)`,
      timestamp,
      insights: [
        {
          type: "metric",
          label: "Current Cash Runway",
          value: `${financialData.cashRunway} months`,
          benchmark: "Minimum: 2 months for hiring",
        },
        {
          type: "metric",
          label: "After Hiring",
          value: "1.2 months",
          benchmark: "⚠️ Below safe threshold",
        },
      ],
      actions: [
        { label: "Remind Me in 2 Months", type: "primary", onClick: () => {} },
        { label: "Part-Time Options", type: "secondary", onClick: () => {} },
      ],
    };
  }

  // Tax inquiry
  if (
    lowerQuery.includes("tax") ||
    lowerQuery.includes("paye") ||
    lowerQuery.includes("vat")
  ) {
    return {
      id: Date.now().toString(),
      type: "ai",
      content: `Your next tax deadline is in ${financialData.daysToTaxDeadline} days (PAYE for October).\n\nEstimated payment: ₦280K\n\nHere's your tax action plan:\n\n1. Set aside ₦40K per week starting now (avoids cash crunch)\n2. Gather employee records and payslips\n3. File online at FIRS portal 3 days before deadline\n\nWant me to set up weekly reminders to set aside the tax money?`,
      timestamp,
      insights: [
        {
          type: "alert",
          label: "Days Until PAYE Deadline",
          value: `${financialData.daysToTaxDeadline} days`,
          benchmark: "Due: December 15, 2025",
        },
        {
          type: "metric",
          label: "Estimated Tax Due",
          value: "₦280K",
          benchmark: "Weekly savings: ₦40K",
        },
      ],
      actions: [
        { label: "Set Up Reminders", type: "primary", onClick: () => {} },
        { label: "View Tax Calendar", type: "secondary", onClick: () => {} },
      ],
    };
  }

  // Default greeting
  if (
    lowerQuery.includes("hello") ||
    lowerQuery.includes("hi") ||
    lowerQuery.includes("hey")
  ) {
    return {
      id: Date.now().toString(),
      type: "ai",
      content: `Hi Aisha!  Your cash flow improved 12% this month \n\nTop priority today:\n• Review ₦800K outstanding invoice from TrendyMart\n\nWhat would you like help with?\n\n💡 Try asking:\n• "Why is my cash flow negative?"\n• "Can I afford to hire?"\n• "How can I reduce costs?"\n• "When is my next tax deadline?"`,
      timestamp,
      actions: [
        { label: "View Dashboard", type: "primary", onClick: () => {} },
        { label: "See All Insights", type: "secondary", onClick: () => {} },
      ],
    };
  }

  // Default response
  return {
    id: Date.now().toString(),
    type: "ai",
    content: `I understand you're asking about "${query}".\n\nI'm here to help with:\n• Cash flow management\n• Expense optimization\n• Growth planning\n• Tax and compliance\n• Business insights\n\nCould you rephrase your question or try one of the quick actions below?`,
    timestamp,
    actions: [
      { label: "Cash Flow Analysis", type: "primary", onClick: () => {} },
      { label: "Expense Breakdown", type: "secondary", onClick: () => {} },
    ],
  };
};

// Main AI Component
const AI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showInsights, setShowInsights] = useState(true);
  const [showHealthScore, setShowHealthScore] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initial greeting
    const greeting: Message = {
      id: "0",
      type: "ai",
      content: `Hi Aisha! Welcome to your AI Financial Coach.\n\nYour cash flow improved 12% this month \n\nI'm here to help you:\n• Understand your finances\n• Plan for growth\n• Reduce costs\n• Stay compliant\n\nWhat would you like to know today?`,
      timestamp: new Date(),
      actions: [
        {
          label: "Show Insights",
          type: "primary",
          onClick: () => setShowInsights(true),
        },
        {
          label: "Health Score",
          type: "secondary",
          onClick: () => setShowHealthScore(true),
        },
      ],
    };
    setMessages([greeting]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse = generateRuleBasedResponse(
        inputValue,
        mockFinancialData
      );
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    const actionQueries: Record<string, string> = {
      cashflow: "Why is my cash flow negative this month?",
      expenses: "Show me my biggest expenses and how to reduce them",
      planning: "Can I afford to hire an assistant?",
      learning: "Teach me about cash flow management",
    };

    setInputValue(actionQueries[action] || "");
    inputRef.current?.focus();
  };

  const handleInsightClick = (insight: ProactiveInsight) => {
    const insightQueries: Record<string, string> = {
      "1": "I heard about the cash shortfall. What should I do?",
      "2": "Tell me more about the early payment discount",
      "3": "How should I build an emergency fund?",
    };

    setInputValue(insightQueries[insight.id] || "");
    handleSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-slate-200">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-sm border border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="md:text-xl text-md font-bold text-gray-900">
                  FinEdge AI Coach
                </h1>
                <p className="md:text-sm text-xs text-gray-500">
                  Your personal CFO, available 24/7
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowInsights(!showInsights)}
              className="md:px-4 md:py-2 py-1 px-3 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {showInsights ? "Hide" : "Show"} Insights
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          {/* Sidebar */}
          {showInsights && (
            <div className="lg:col-span-1 space-y-4">
              <InsightsWidget onInsightClick={handleInsightClick} />
              {showHealthScore && (
                <FinancialHealthScore
                  score={mockFinancialData.cashFlowStability}
                />
              )}
            </div>
          )}

          {/* Chat Area */}
          <div
            className={`${showInsights ? "lg:col-span-2" : "lg:col-span-3"}`}
          >
            <div
              className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col"
              style={{ height: "calc(100vh - 200px)" }}
            >
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}

                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div className="border-t border-gray-200 px-6 py-3">
                <QuickActions onActionClick={handleQuickAction} />
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your finances..."
                    className="flex-1 md:px-4 md:py-3 px-2 py-2
                     bg-gray-50 border border-gray-200 
                     rounded-xl focus:outline-none focus:ring-2
                      focus:ring-blue-500 focus:border-transparent text-xs md:text-sm"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="px-6 py-3 bg-slate-800 text-white rounded-xl font-medium hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="md:w-4 md:h-3 h-3 w-3" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Powered by AI • For informational purposes only
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI;
