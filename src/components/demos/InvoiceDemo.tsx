import { useState } from 'react';
import { Upload, FileText, CheckCircle2, Loader2, Download } from 'lucide-react';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { processDocument, generateSessionId } from '../../utils/fileProcessor';

interface InvoiceData {
  invoiceNumber: string;
  vendor: {
    name: string;
    address: string;
    taxId: string;
  };
  client: {
    name: string;
    address: string;
  };
  invoiceDate: string;
  dueDate: string;
  paymentTerms: string;
  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  confidence: {
    invoiceNumber: number;
    vendor: number;
    client: number;
    dates: number;
    lineItems: number;
    totals: number;
  };
}

export function InvoiceDemo() {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<InvoiceData | null>(null);
  const [processingTime, setProcessingTime] = useState<number>(0);
  const [isMock, setIsMock] = useState(false);
  const {
    isDragging,
    file,
    previewUrl,
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
      const processResult = await processDocument(file, 'invoice', sessionId);

      setResult(processResult.data);
      setProcessingTime(processResult.processingTime);
      setIsMock(processResult.isMock);
    } catch (err) {
      console.error('Processing error:', err);
    } finally {
      setProcessing(false);
    }
  };

  const handleTryAnother = () => {
    resetFile();
    setResult(null);
    setProcessingTime(0);
    setIsMock(false);
  };

  const loadSample = async () => {
    const response = await fetch('/samples/sample-invoice.pdf');
    const blob = await response.blob();
    const file = new File([blob], 'sample-invoice.pdf', { type: 'application/pdf' });

    const event = {
      target: { files: [file] }
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    handleFileSelect(event);
  };

  const exportData = () => {
    if (!result) return;

    const dataStr = JSON.stringify(result, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-${result.invoiceNumber}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
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
                  Drop invoice here
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  or click to browse
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
              {previewUrl && previewUrl !== 'pdf' ? (
                <img
                  src={previewUrl}
                  alt="Invoice preview"
                  className="max-h-96 mx-auto rounded"
                />
              ) : (
                <div className="flex items-center justify-center h-96">
                  <FileText className="h-24 w-24 text-gray-400" />
                </div>
              )}
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
              Try Sample Invoice
            </button>
          )}
          {file && !result && (
            <button
              onClick={handleProcess}
              disabled={processing}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                'Process Invoice'
              )}
            </button>
          )}
          {result && (
            <>
              <button
                onClick={handleTryAnother}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Try Another Invoice
              </button>
              <button
                onClick={exportData}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export JSON
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 max-h-[600px] overflow-y-auto">
        {!result && !processing && (
          <div className="text-center text-gray-500 py-12">
            <p>Upload an invoice to see extracted data</p>
          </div>
        )}

        {processing && (
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        )}

        {result && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 text-green-600 font-medium mb-4">
              <CheckCircle2 className="h-5 w-5" />
              <span>Invoice Processed Successfully</span>
              {isMock && (
                <span className="ml-auto text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  Demo Data
                </span>
              )}
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Invoice Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Invoice Number:</span>
                  <span className="font-medium">{result.invoiceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Invoice Date:</span>
                  <span className="font-medium">{result.invoiceDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Due Date:</span>
                  <span className="font-medium">{result.dueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Terms:</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                    {result.paymentTerms}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Vendor</h4>
              <div className="space-y-1 text-sm">
                <p className="font-medium">{result.vendor.name}</p>
                <p className="text-gray-600">{result.vendor.address}</p>
                <p className="text-gray-600">{result.vendor.taxId}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Bill To</h4>
              <div className="space-y-1 text-sm">
                <p className="font-medium">{result.client.name}</p>
                <p className="text-gray-600">{result.client.address}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Line Items</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2">Description</th>
                      <th className="text-center py-2">Qty</th>
                      <th className="text-right py-2">Unit Price</th>
                      <th className="text-right py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.lineItems.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2">{item.description}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-right">${item.unitPrice.toFixed(2)}</td>
                        <td className="text-right font-medium">
                          ${item.total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>${result.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span>${result.tax.toFixed(2)}</span>
                </div>
                {result.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-${result.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>Total:</span>
                  <span>${result.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-300 text-sm text-gray-600">
              Processed in {(processingTime / 1000).toFixed(2)}s
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
