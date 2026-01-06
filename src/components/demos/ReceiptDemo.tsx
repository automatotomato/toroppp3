import { useState } from 'react';
import { Upload, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { processDocument, generateSessionId } from '../../utils/fileProcessor';

interface ReceiptData {
  vendorName: string;
  date: string;
  total: number;
  tax: number;
  category: string;
  paymentMethod: string;
  lineItems: Array<{ item: string; quantity: number; price: number }>;
  confidence: {
    vendorName: number;
    date: number;
    total: number;
    tax: number;
    category: number;
    paymentMethod: number;
  };
}

export function ReceiptDemo() {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<ReceiptData | null>(null);
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
      const processResult = await processDocument(file, 'receipt', sessionId);

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
    const response = await fetch('/samples/sample-receipt.jpg');
    const blob = await response.blob();
    const file = new File([blob], 'sample-receipt.jpg', { type: 'image/jpeg' });

    const event = {
      target: { files: [file] }
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    handleFileSelect(event);
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
                  Drop receipt here
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
                  alt="Receipt preview"
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
              Try Sample Receipt
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
                'Process Receipt'
              )}
            </button>
          )}
          {result && (
            <button
              onClick={handleTryAnother}
              className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Try Another Receipt
            </button>
          )}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        {!result && !processing && (
          <div className="text-center text-gray-500 py-12">
            <p>Upload a receipt to see extracted data</p>
          </div>
        )}

        {processing && (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
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
              <span>Receipt Processed Successfully</span>
              {isMock && (
                <span className="ml-auto text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  Demo Data
                </span>
              )}
            </div>

            <DataField
              label="Vendor Name"
              value={result.vendorName}
              confidence={result.confidence.vendorName}
            />
            <DataField
              label="Date"
              value={result.date}
              confidence={result.confidence.date}
            />
            <DataField
              label="Total Amount"
              value={`$${result.total.toFixed(2)}`}
              confidence={result.confidence.total}
            />
            <DataField
              label="Tax Amount"
              value={`$${result.tax.toFixed(2)}`}
              confidence={result.confidence.tax}
            />
            <DataField
              label="Category"
              value={result.category}
              confidence={result.confidence.category}
            />
            <DataField
              label="Payment Method"
              value={result.paymentMethod}
              confidence={result.confidence.paymentMethod}
            />

            {result.lineItems && result.lineItems.length > 0 && (
              <div className="pt-4 border-t border-gray-300">
                <h4 className="font-medium text-gray-900 mb-3">Line Items</h4>
                <div className="space-y-2">
                  {result.lineItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm bg-white p-2 rounded"
                    >
                      <span>
                        {item.quantity}x {item.item}
                      </span>
                      <span className="font-medium">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-300 text-sm text-gray-600">
              Processed in {(processingTime / 1000).toFixed(2)}s
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DataField({
  label,
  value,
  confidence,
}: {
  label: string;
  value: string;
  confidence: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
          {confidence}% confident
        </span>
      </div>
      <div className="text-lg font-medium text-gray-900 bg-white p-2 rounded">
        {value}
      </div>
    </div>
  );
}
