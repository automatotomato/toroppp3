import { useState } from 'react';
import { Upload, AlertCircle, Info, Lightbulb, TrendingUp, Loader2, DollarSign } from 'lucide-react';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { processDocument, generateSessionId } from '../../utils/fileProcessor';

interface APARData {
  summary: {
    totalAP: number;
    totalAR: number;
    netPosition: number;
    overdueAmount: number;
  };
  documents: Array<{
    id: number;
    type: 'payable' | 'receivable';
    vendor?: string;
    client?: string;
    amount: number;
    dueDate: string;
    status: 'pending' | 'overdue' | 'paid';
    category: string;
    daysUntilDue?: number;
    daysOverdue?: number;
  }>;
  insights: Array<{
    type: 'warning' | 'info' | 'tip';
    message: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  agingReport: {
    current: number;
    days30: number;
    days60: number;
    days90: number;
    over90: number;
  };
}

export function APARDemo() {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<APARData | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null);
  const [processingTime, setProcessingTime] = useState<number>(0);
  const [isMock, setIsMock] = useState(false);
  const {
    isDragging,
    file,
    error,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileSelect,
    resetFile,
  } = useDragAndDrop();

  const handleProcess = async () => {
    if (!file) return;

    setProcessing(true);
    setResult(null);

    try {
      const sessionId = generateSessionId();
      const processResult = await processDocument(file, 'apar', sessionId);

      setResult(processResult.data);
      setProcessingTime(processResult.processingTime);
      setIsMock(processResult.isMock);
      if (processResult.data.documents.length > 0) {
        setSelectedDoc(processResult.data.documents[0].id);
      }
    } catch (err) {
      console.error('Processing error:', err);
    } finally {
      setProcessing(false);
    }
  };

  const handleTryAnother = () => {
    resetFile();
    setResult(null);
    setSelectedDoc(null);
    setProcessingTime(0);
    setIsMock(false);
  };

  const loadSample = async () => {
    const response = await fetch('/samples/sample-receipt.jpg');
    const blob = await response.blob();
    const file = new File([blob], 'sample-documents.jpg', { type: 'image/jpeg' });

    const event = {
      target: { files: [file] }
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    handleFileSelect(event);
  };

  const selectedDocument = result?.documents.find(doc => doc.id === selectedDoc);

  return (
    <div className="space-y-6">
      {!result && (
        <div className="space-y-4">
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            } ${file ? 'bg-gray-50' : 'bg-white'}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {!file ? (
              <div className="space-y-4">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Drop documents here
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Upload multiple invoices and bills for analysis
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,application/pdf"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-lg font-medium text-gray-900">
                  Document ready for processing
                </p>
                <p className="text-sm text-gray-600">{file.name}</p>
              </div>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            {!file && (
              <button
                onClick={loadSample}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Load Sample Data
              </button>
            )}
            {file && (
              <button
                onClick={handleProcess}
                disabled={processing}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing Documents...
                  </>
                ) : (
                  'Analyze AP/AR'
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {processing && (
        <div className="grid md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      )}

      {result && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <DollarSign className="h-5 w-5" />
              <span>AP/AR Analysis Complete</span>
            </div>
            <div className="flex items-center gap-3">
              {isMock && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  Demo Data
                </span>
              )}
              <button
                onClick={handleTryAnother}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                Analyze More Documents
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Total Payables</div>
              <div className="text-2xl font-bold text-red-600">
                ${result.summary.totalAP.toLocaleString()}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Total Receivables</div>
              <div className="text-2xl font-bold text-green-600">
                ${result.summary.totalAR.toLocaleString()}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Net Position</div>
              <div className="text-2xl font-bold text-blue-600">
                ${result.summary.netPosition.toLocaleString()}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Overdue Amount</div>
              <div className="text-2xl font-bold text-orange-600">
                ${result.summary.overdueAmount.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Documents</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {result.documents.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedDoc === doc.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm">
                        {doc.vendor || doc.client}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          doc.status === 'overdue'
                            ? 'bg-red-100 text-red-700'
                            : doc.status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {doc.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">${doc.amount.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 mt-1">{doc.category}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Selected Document</h3>
              {selectedDocument ? (
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600">
                      {selectedDocument.type === 'payable' ? 'Vendor' : 'Client'}
                    </div>
                    <div className="font-medium">
                      {selectedDocument.vendor || selectedDocument.client}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Amount</div>
                    <div className="text-2xl font-bold">
                      ${selectedDocument.amount.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Due Date</div>
                    <div className="font-medium">{selectedDocument.dueDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Category</div>
                    <div className="font-medium">{selectedDocument.category}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Status</div>
                    <div
                      className={`inline-block px-3 py-1 rounded text-sm font-medium ${
                        selectedDocument.status === 'overdue'
                          ? 'bg-red-100 text-red-700'
                          : selectedDocument.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {selectedDocument.status}
                      {selectedDocument.daysOverdue && ` (${selectedDocument.daysOverdue} days overdue)`}
                      {selectedDocument.daysUntilDue && ` (due in ${selectedDocument.daysUntilDue} days)`}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Select a document to view details</p>
              )}
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">AI Insights</h3>
              <div className="space-y-3">
                {result.insights.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      insight.type === 'warning'
                        ? 'bg-orange-50 border border-orange-200'
                        : insight.type === 'info'
                        ? 'bg-blue-50 border border-blue-200'
                        : 'bg-green-50 border border-green-200'
                    }`}
                  >
                    <div className="flex gap-2">
                      {insight.type === 'warning' && (
                        <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                      )}
                      {insight.type === 'info' && (
                        <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      )}
                      {insight.type === 'tip' && (
                        <Lightbulb className="h-5 w-5 text-green-600 flex-shrink-0" />
                      )}
                      <p className="text-sm">{insight.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Aging Report
            </h3>
            <div className="space-y-3">
              <AgingBar label="Current" amount={result.agingReport.current} total={result.summary.totalAR} />
              <AgingBar label="1-30 Days" amount={result.agingReport.days30} total={result.summary.totalAR} />
              <AgingBar label="31-60 Days" amount={result.agingReport.days60} total={result.summary.totalAR} />
              <AgingBar label="61-90 Days" amount={result.agingReport.days90} total={result.summary.totalAR} />
              <AgingBar label="90+ Days" amount={result.agingReport.over90} total={result.summary.totalAR} />
            </div>
          </div>

          <div className="text-sm text-gray-600 text-center">
            Processed in {(processingTime / 1000).toFixed(2)}s
          </div>
        </div>
      )}
    </div>
  );
}

function AgingBar({ label, amount, total }: { label: string; amount: number; total: number }) {
  const percentage = (amount / total) * 100;

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">${amount.toLocaleString()}</span>
      </div>
      <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
