import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Receipt, PhoneCall, Shield, Sparkles, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import ReceiptScanner from '../components/ai-tools/ReceiptScanner';
import SalesCallAnalyzer from '../components/ai-tools/SalesCallAnalyzer';
import ComplianceChecker from '../components/ai-tools/ComplianceChecker';

type ToolType = 'receipt_scanner' | 'call_analyzer' | 'compliance_checker' | null;

interface ToolStats {
  receiptsScanned: number;
  totalExpenses: number;
  callsAnalyzed: number;
  avgCallScore: number;
  documentsChecked: number;
  issuesPrevented: number;
}

export default function DashboardAIToolsPage() {
  const { user } = useAuth();
  const [activeTool, setActiveTool] = useState<ToolType>(null);
  const [stats, setStats] = useState<ToolStats>({
    receiptsScanned: 0,
    totalExpenses: 0,
    callsAnalyzed: 0,
    avgCallScore: 0,
    documentsChecked: 0,
    issuesPrevented: 0
  });

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user, activeTool]);

  const fetchStats = async () => {
    try {
      const [receiptsData, callsData, checksData] = await Promise.all([
        supabase.from('receipts').select('extracted_data, manual_corrections').eq('user_id', user?.id),
        supabase.from('sales_calls').select('overall_score, processing_status').eq('user_id', user?.id),
        supabase.from('compliance_checks').select('check_results, review_status').eq('user_id', user?.id)
      ]);

      const receipts = receiptsData.data || [];
      const calls = callsData.data || [];
      const checks = checksData.data || [];

      const totalExpenses = receipts.reduce((sum, r) => {
        const data = { ...r.extracted_data, ...r.manual_corrections };
        return sum + (data.amount || 0);
      }, 0);

      const completedCalls = calls.filter(c => c.processing_status === 'completed');
      const avgScore = completedCalls.length > 0
        ? completedCalls.reduce((sum, c) => sum + c.overall_score, 0) / completedCalls.length
        : 0;

      const issuesPrevented = checks
        .filter(c => c.review_status === 'completed')
        .reduce((sum, c) => sum + (c.check_results?.critical_count || 0), 0);

      setStats({
        receiptsScanned: receipts.length,
        totalExpenses,
        callsAnalyzed: calls.length,
        avgCallScore: Math.round(avgScore),
        documentsChecked: checks.length,
        issuesPrevented
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const tools = [
    {
      id: 'receipt_scanner' as ToolType,
      title: 'Receipt & Expense Scanner',
      description: 'Automatically extract data from receipts and organize expenses for easy accounting',
      icon: Receipt,
      color: 'from-blue-600 to-blue-700',
      metrics: [
        { label: 'Receipts Scanned', value: stats.receiptsScanned, icon: Receipt },
        { label: 'Total Tracked', value: `$${stats.totalExpenses.toFixed(0)}`, icon: DollarSign }
      ],
      benefits: [
        'Save 15+ hours per month on expense tracking',
        'Automatic data extraction from images',
        'Export to CSV for accounting software',
        'Track tax-deductible expenses'
      ],
      roi: 'Eliminate manual data entry and never miss a deduction'
    },
    {
      id: 'call_analyzer' as ToolType,
      title: 'Sales Call Analyzer',
      description: 'Analyze sales conversations to identify opportunities and improve closing rates',
      icon: PhoneCall,
      color: 'from-purple-600 to-purple-700',
      metrics: [
        { label: 'Calls Analyzed', value: stats.callsAnalyzed, icon: PhoneCall },
        { label: 'Avg Score', value: stats.avgCallScore || 'N/A', icon: TrendingUp }
      ],
      benefits: [
        'Identify upsell opportunities you missed',
        'Get specific improvement suggestions',
        'Track performance improvement over time',
        'Improve talk-time ratio and engagement'
      ],
      roi: 'Increase conversion rates by 20-30% with data-driven coaching'
    },
    {
      id: 'compliance_checker' as ToolType,
      title: 'Document Compliance Checker',
      description: 'Verify tax documents for errors and compliance issues before filing',
      icon: Shield,
      color: 'from-green-600 to-green-700',
      metrics: [
        { label: 'Documents Checked', value: stats.documentsChecked, icon: Shield },
        { label: 'Errors Prevented', value: stats.issuesPrevented, icon: Clock }
      ],
      benefits: [
        'Prevent costly filing errors and amendments',
        'IRS reference for every issue found',
        'Severity ratings: Critical, Warning, Suggestion',
        'Comprehensive checklist for quality control'
      ],
      roi: 'Avoid $1,500+ in penalties and amendment costs per error'
    }
  ];

  if (activeTool === 'receipt_scanner') {
    return (
      <DashboardLayout>
        <div className="mb-6">
          <button
            onClick={() => setActiveTool(null)}
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
          >
            ← Back to AI Tools
          </button>
        </div>
        <ReceiptScanner />
      </DashboardLayout>
    );
  }

  if (activeTool === 'call_analyzer') {
    return (
      <DashboardLayout>
        <div className="mb-6">
          <button
            onClick={() => setActiveTool(null)}
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
          >
            ← Back to AI Tools
          </button>
        </div>
        <SalesCallAnalyzer />
      </DashboardLayout>
    );
  }

  if (activeTool === 'compliance_checker') {
    return (
      <DashboardLayout>
        <div className="mb-6">
          <button
            onClick={() => setActiveTool(null)}
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
          >
            ← Back to AI Tools
          </button>
        </div>
        <ComplianceChecker />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-main flex items-center gap-3 mb-2">
          <Sparkles className="text-amber-500" size={32} />
          Business Automation Suite
        </h1>
        <p className="text-slate-600 text-lg">
          AI-powered tools that save time, increase revenue, and prevent costly mistakes
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <Receipt size={40} className="mb-4" />
          <h3 className="text-3xl font-bold mb-2">{stats.receiptsScanned}</h3>
          <p className="text-blue-100">Receipts Processed</p>
          <p className="text-xs text-blue-200 mt-2">~{Math.ceil(stats.receiptsScanned * 0.25)} hours saved</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <PhoneCall size={40} className="mb-4" />
          <h3 className="text-3xl font-bold mb-2">{stats.callsAnalyzed}</h3>
          <p className="text-purple-100">Sales Calls Analyzed</p>
          <p className="text-xs text-purple-200 mt-2">Avg Score: {stats.avgCallScore || 'N/A'}</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
          <Shield size={40} className="mb-4" />
          <h3 className="text-3xl font-bold mb-2">{stats.issuesPrevented}</h3>
          <p className="text-green-100">Critical Errors Prevented</p>
          <p className="text-xs text-green-200 mt-2">Potential savings: ${stats.issuesPrevented * 1500}</p>
        </div>
      </div>

      <div className="space-y-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="grid md:grid-cols-[300px_1fr] gap-0">
                <div className={`bg-gradient-to-br ${tool.color} p-8 text-white flex flex-col justify-between`}>
                  <div>
                    <Icon size={56} className="mb-4" />
                    <h3 className="text-2xl font-bold mb-3">{tool.title}</h3>
                    <p className="text-white/90 text-sm leading-relaxed">{tool.description}</p>
                  </div>
                  <button
                    onClick={() => setActiveTool(tool.id)}
                    className="mt-6 w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <Sparkles size={18} />
                    Open Tool
                  </button>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {tool.metrics.map((metric, idx) => {
                      const MetricIcon = metric.icon;
                      return (
                        <div key={idx} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <MetricIcon size={16} className="text-gray-600" />
                            <span className="text-xs text-gray-600 font-medium">{metric.label}</span>
                          </div>
                          <p className="text-2xl font-bold text-brand-main">{metric.value}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <TrendingUp size={18} className="text-brand-accent" />
                      Key Benefits
                    </h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {tool.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-brand-accent rounded-full mt-2 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                    <p className="text-sm font-semibold text-green-900 flex items-center gap-2">
                      <DollarSign size={16} />
                      ROI Impact
                    </p>
                    <p className="text-sm text-green-800 mt-1">{tool.roi}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-gradient-to-r from-brand-accent to-red-900 rounded-2xl p-8 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Built for Tax & Accounting Professionals</h2>
          <p className="text-red-100 text-lg mb-8">
            These aren't generic AI tools. Each one is designed specifically to solve the real pain points
            tax professionals face every day: manual data entry, missed sales opportunities, and filing errors.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Clock size={32} className="mb-3 mx-auto" />
              <h4 className="font-bold text-xl mb-2">Save Time</h4>
              <p className="text-red-100 text-sm">
                Automate repetitive tasks and focus on high-value client work
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <TrendingUp size={32} className="mb-3 mx-auto" />
              <h4 className="font-bold text-xl mb-2">Increase Revenue</h4>
              <p className="text-red-100 text-sm">
                Identify upsell opportunities and improve conversion rates
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Shield size={32} className="mb-3 mx-auto" />
              <h4 className="font-bold text-xl mb-2">Reduce Risk</h4>
              <p className="text-red-100 text-sm">
                Catch errors before filing and avoid penalties
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}