import { useState, useEffect } from 'react';
import { Upload, FileText, Shield, AlertTriangle, CheckCircle, XCircle, Info, Download, Filter } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface Issue {
  field: string;
  severity: 'critical' | 'warning' | 'suggestion';
  description: string;
  recommendation: string;
  irs_reference?: string;
}

interface CheckResults {
  issues?: Issue[];
  summary?: string;
  fields_checked?: number;
  critical_count?: number;
  warning_count?: number;
  suggestion_count?: number;
}

interface ComplianceCheck {
  id: string;
  document_url: string;
  original_filename: string;
  document_type: string;
  upload_date: string;
  check_results: CheckResults;
  compliance_score: number;
  review_status: 'pending' | 'processing' | 'completed' | 'failed';
}

const DOCUMENT_TYPES = [
  { value: 'form-1040', label: 'Form 1040 - Individual Income Tax Return' },
  { value: 'schedule-c', label: 'Schedule C - Business Income' },
  { value: 'schedule-e', label: 'Schedule E - Rental Income' },
  { value: 'w-2', label: 'W-2 - Wage and Tax Statement' },
  { value: '1099-misc', label: '1099-MISC - Miscellaneous Income' },
  { value: '1099-nec', label: '1099-NEC - Nonemployee Compensation' },
  { value: 'form-1120', label: 'Form 1120 - Corporation Income Tax' },
  { value: 'form-1065', label: 'Form 1065 - Partnership Return' },
  { value: 'form-1120s', label: 'Form 1120-S - S Corporation Return' },
  { value: 'schedule-k1', label: 'Schedule K-1 - Partner\'s Share of Income' }
];

export default function ComplianceChecker() {
  const { user } = useAuth();
  const [checks, setChecks] = useState<ComplianceCheck[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [selectedCheckId, setSelectedCheckId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');

  useEffect(() => {
    if (user) {
      loadChecks();
    }
  }, [user]);

  const loadChecks = async () => {
    try {
      const { data, error } = await supabase
        .from('compliance_checks')
        .select('*')
        .eq('user_id', user?.id)
        .order('upload_date', { ascending: false });

      if (error) throw error;
      setChecks(data || []);
    } catch (error) {
      console.error('Error loading checks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedType) {
      alert('Please select a document type first');
      return;
    }

    if (file.type !== 'application/pdf') {
      alert('Only PDF files are supported');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert('File too large. Maximum size is 50MB');
      return;
    }

    setUploading(true);

    try {
      const fileExt = 'pdf';
      const fileName = `${user?.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('tax-documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: checkData, error: insertError } = await supabase
        .from('compliance_checks')
        .insert({
          user_id: user?.id,
          document_url: fileName,
          original_filename: file.name,
          document_type: selectedType,
          review_status: 'processing'
        })
        .select()
        .single();

      if (insertError) throw insertError;

      simulateComplianceCheck(checkData.id, selectedType);
      setSelectedType('');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const simulateComplianceCheck = async (checkId: string, docType: string) => {
    setTimeout(async () => {
      const mockResults: CheckResults = {
        issues: [
          {
            field: 'Taxpayer Signature',
            severity: 'critical',
            description: 'Signature is missing or not dated',
            recommendation: 'Ensure the taxpayer signs and dates the return. Unsigned returns will be rejected by the IRS.',
            irs_reference: 'Publication 17, Chapter 1'
          },
          {
            field: 'Social Security Number',
            severity: 'critical',
            description: 'SSN format appears incorrect or incomplete',
            recommendation: 'Verify the SSN matches Social Security card exactly. Contact taxpayer to confirm.',
            irs_reference: 'Form 1040 Instructions, Line 1'
          },
          {
            field: 'Dependent Information',
            severity: 'warning',
            description: 'Dependent SSN on Schedule 8812 does not match dependent listed on Form 1040',
            recommendation: 'Cross-reference all dependent information across forms for consistency.',
            irs_reference: 'Schedule 8812 Instructions'
          },
          {
            field: 'Standard Deduction',
            severity: 'warning',
            description: 'Standard deduction amount does not match IRS tables for filing status',
            recommendation: 'Verify filing status and apply correct standard deduction amount for tax year.',
            irs_reference: 'Form 1040 Instructions, Standard Deduction Worksheet'
          },
          {
            field: 'Math Calculation - Line 15',
            severity: 'critical',
            description: 'Calculated total income does not match sum of line items',
            recommendation: 'Recalculate total income. Math errors are a common cause of IRS notices.',
            irs_reference: 'Form 1040, Line 15'
          },
          {
            field: 'Direct Deposit Information',
            severity: 'suggestion',
            description: 'Bank routing number format should be verified',
            recommendation: 'Confirm 9-digit routing number with taxpayer to ensure refund is deposited correctly.',
            irs_reference: 'Form 1040 Instructions, Refund Section'
          },
          {
            field: 'Prior Year AGI',
            severity: 'warning',
            description: 'Prior year AGI used for e-filing authentication should be verified',
            recommendation: 'Confirm prior year AGI with taxpayer or retrieve from prior return to prevent e-file rejection.',
            irs_reference: 'E-file Requirements'
          },
          {
            field: 'Schedule C - Business Code',
            severity: 'suggestion',
            description: 'Business activity code could be more specific',
            recommendation: 'Use the most specific 6-digit NAICS code that describes the business activity.',
            irs_reference: 'Schedule C Instructions, Part I'
          },
          {
            field: 'Estimated Tax Payments',
            severity: 'suggestion',
            description: 'Consider quarterly estimated tax payments for next year',
            recommendation: 'If tax liability exceeds $1,000, taxpayer may need to make estimated payments to avoid penalty.',
            irs_reference: 'Form 1040-ES'
          }
        ],
        fields_checked: 47,
        critical_count: 3,
        warning_count: 3,
        suggestion_count: 3,
        summary: 'Document reviewed. Found 3 critical issues that must be resolved before filing, 3 warnings that should be addressed, and 3 suggestions for best practices.'
      };

      const score = Math.max(0, 100 - (mockResults.critical_count! * 20) - (mockResults.warning_count! * 10) - (mockResults.suggestion_count! * 3));

      await supabase
        .from('compliance_checks')
        .update({
          check_results: mockResults,
          compliance_score: score,
          review_status: 'completed'
        })
        .eq('id', checkId);

      await loadChecks();
    }, 3000);
  };

  const deleteCheck = async (checkId: string, documentUrl: string) => {
    if (!confirm('Are you sure you want to delete this compliance check?')) return;

    try {
      await supabase.storage.from('tax-documents').remove([documentUrl]);
      await supabase.from('compliance_checks').delete().eq('id', checkId);
      await loadChecks();
    } catch (error) {
      console.error('Error deleting check:', error);
    }
  };

  const getFilteredChecks = () => {
    return checks.filter(check => {
      if (filterType !== 'all' && check.document_type !== filterType) {
        return false;
      }

      if (filterSeverity !== 'all' && check.check_results?.issues) {
        const hasSeverity = check.check_results.issues.some(
          issue => issue.severity === filterSeverity
        );
        if (!hasSeverity) return false;
      }

      return true;
    });
  };

  const calculateStats = () => {
    const completed = checks.filter(c => c.review_status === 'completed');
    const avgScore = completed.length > 0
      ? completed.reduce((sum, c) => sum + c.compliance_score, 0) / completed.length
      : 0;

    const totalIssues = completed.reduce((sum, c) =>
      sum + (c.check_results?.issues?.length || 0), 0
    );

    const criticalPrevented = completed.reduce((sum, c) =>
      sum + (c.check_results?.critical_count || 0), 0
    );

    return {
      totalChecks: checks.length,
      avgScore: Math.round(avgScore),
      totalIssues,
      criticalPrevented
    };
  };

  const selectedCheck = selectedCheckId ? checks.find(c => c.id === selectedCheckId) : null;
  const stats = calculateStats();
  const filteredChecks = getFilteredChecks();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading compliance checks...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Document Compliance Checker</h2>
        <p className="text-gray-400 mt-1">Upload tax documents to identify issues before filing and prevent costly errors</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Documents Checked</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.totalChecks}</p>
            </div>
            <FileText className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg Compliance Score</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.avgScore}%</p>
            </div>
            <Shield className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Issues Identified</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.totalIssues}</p>
            </div>
            <AlertTriangle className="text-yellow-500" size={32} />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Critical Errors Prevented</p>
              <p className="text-2xl font-bold text-red-500 mt-1">{stats.criticalPrevented}</p>
            </div>
            <XCircle className="text-red-500" size={32} />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-white font-semibold mb-4">Upload Document for Review</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-white mb-2 text-sm font-medium">Document Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
            >
              <option value="">Select document type...</option>
              {DOCUMENT_TYPES.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="document-upload"
              className={`flex items-center justify-center gap-2 px-6 py-4 border-2 border-dashed rounded-lg transition-colors cursor-pointer ${
                selectedType
                  ? 'border-blue-500 bg-blue-500/10 hover:bg-blue-500/20'
                  : 'border-gray-600 bg-gray-900 cursor-not-allowed'
              }`}
            >
              <Upload size={24} className={selectedType ? 'text-blue-500' : 'text-gray-500'} />
              <span className={selectedType ? 'text-white' : 'text-gray-500'}>
                {uploading ? 'Uploading...' : 'Click to upload PDF document (Max 50MB)'}
              </span>
            </label>
            <input
              type="file"
              id="document-upload"
              accept="application/pdf"
              onChange={handleFileUpload}
              disabled={!selectedType || uploading}
              className="hidden"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2"
          >
            <option value="all">All Document Types</option>
            {DOCUMENT_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
          className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2"
        >
          <option value="all">All Severities</option>
          <option value="critical">Critical Only</option>
          <option value="warning">Warnings Only</option>
          <option value="suggestion">Suggestions Only</option>
        </select>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Compliance Check History</h3>
        </div>
        <div className="divide-y divide-gray-700">
          {filteredChecks.map((check) => (
            <div
              key={check.id}
              className="p-6 hover:bg-gray-700/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-white font-semibold">{check.original_filename}</h4>
                    {check.review_status === 'processing' && (
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded">
                        Processing
                      </span>
                    )}
                    {check.review_status === 'completed' && (
                      <span className={`px-3 py-1 text-sm rounded font-semibold ${
                        check.compliance_score >= 90
                          ? 'bg-green-500/20 text-green-500'
                          : check.compliance_score >= 70
                          ? 'bg-yellow-500/20 text-yellow-500'
                          : 'bg-red-500/20 text-red-500'
                      }`}>
                        Score: {check.compliance_score}%
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{DOCUMENT_TYPES.find(t => t.value === check.document_type)?.label || check.document_type}</span>
                    <span>{new Date(check.upload_date).toLocaleDateString()}</span>
                  </div>
                  {check.review_status === 'completed' && check.check_results && (
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      {check.check_results.critical_count! > 0 && (
                        <span className="flex items-center gap-1 text-red-500">
                          <XCircle size={14} />
                          {check.check_results.critical_count} Critical
                        </span>
                      )}
                      {check.check_results.warning_count! > 0 && (
                        <span className="flex items-center gap-1 text-yellow-500">
                          <AlertTriangle size={14} />
                          {check.check_results.warning_count} Warnings
                        </span>
                      )}
                      {check.check_results.suggestion_count! > 0 && (
                        <span className="flex items-center gap-1 text-blue-500">
                          <Info size={14} />
                          {check.check_results.suggestion_count} Suggestions
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCheckId(selectedCheckId === check.id ? null : check.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    {selectedCheckId === check.id ? 'Hide Details' : 'View Details'}
                  </button>
                  <button
                    onClick={() => deleteCheck(check.id, check.document_url)}
                    className="text-red-500 hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {selectedCheckId === check.id && check.review_status === 'completed' && check.check_results && (
                <div className="mt-6 pt-6 border-t border-gray-700 space-y-6">
                  {check.check_results.summary && (
                    <div className="bg-gray-900 rounded-lg p-4">
                      <p className="text-gray-300">{check.check_results.summary}</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Checked {check.check_results.fields_checked} fields
                      </p>
                    </div>
                  )}

                  <div>
                    <h5 className="text-white font-semibold mb-4">Issues Found</h5>
                    <div className="space-y-3">
                      {check.check_results.issues?.filter(i => i.severity === 'critical').map((issue, idx) => (
                        <div key={idx} className="bg-red-500/10 border-l-4 border-red-500 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <XCircle className="text-red-500 flex-shrink-0 mt-1" size={20} />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h6 className="text-white font-semibold">{issue.field}</h6>
                                <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded">CRITICAL</span>
                              </div>
                              <p className="text-gray-300 text-sm mb-2">{issue.description}</p>
                              <p className="text-red-400 text-sm font-medium mb-1">→ {issue.recommendation}</p>
                              {issue.irs_reference && (
                                <p className="text-xs text-gray-400">Reference: {issue.irs_reference}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {check.check_results.issues?.filter(i => i.severity === 'warning').map((issue, idx) => (
                        <div key={idx} className="bg-yellow-500/10 border-l-4 border-yellow-500 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="text-yellow-500 flex-shrink-0 mt-1" size={20} />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h6 className="text-white font-semibold">{issue.field}</h6>
                                <span className="px-2 py-0.5 bg-yellow-500 text-black text-xs rounded">WARNING</span>
                              </div>
                              <p className="text-gray-300 text-sm mb-2">{issue.description}</p>
                              <p className="text-yellow-400 text-sm font-medium mb-1">→ {issue.recommendation}</p>
                              {issue.irs_reference && (
                                <p className="text-xs text-gray-400">Reference: {issue.irs_reference}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {check.check_results.issues?.filter(i => i.severity === 'suggestion').map((issue, idx) => (
                        <div key={idx} className="bg-blue-500/10 border-l-4 border-blue-500 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <Info className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h6 className="text-white font-semibold">{issue.field}</h6>
                                <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded">SUGGESTION</span>
                              </div>
                              <p className="text-gray-300 text-sm mb-2">{issue.description}</p>
                              <p className="text-blue-400 text-sm font-medium mb-1">→ {issue.recommendation}</p>
                              {issue.irs_reference && (
                                <p className="text-xs text-gray-400">Reference: {issue.irs_reference}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filteredChecks.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No compliance checks found. Upload a document to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}