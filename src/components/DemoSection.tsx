import { useState } from 'react';
import { FileText, Receipt, BarChart3 } from 'lucide-react';
import { ReceiptDemo } from './demos/ReceiptDemo';
import { InvoiceDemo } from './demos/InvoiceDemo';
import { APARDemo } from './demos/APARDemo';

type DemoType = 'receipt' | 'invoice' | 'apar';

export default function DemoSection() {
  const [activeDemo, setActiveDemo] = useState<DemoType>('receipt');

  const demos = [
    {
      id: 'receipt' as DemoType,
      name: 'Receipt Processing',
      icon: Receipt,
      description: 'Extract vendor, date, totals, and line items from receipts',
    },
    {
      id: 'invoice' as DemoType,
      name: 'Invoice Processing',
      icon: FileText,
      description: 'Parse invoices with vendor details, line items, and payment terms',
    },
    {
      id: 'apar' as DemoType,
      name: 'AP/AR Agent',
      icon: BarChart3,
      description: 'Analyze accounts payable/receivable with AI-powered insights',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Experience Our AI Automation Agents Live
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Try our AI-powered document processing agents instantly. Upload your documents and see the magic happen in seconds.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {demos.map((demo) => {
                const Icon = demo.icon;
                return (
                  <button
                    key={demo.id}
                    onClick={() => setActiveDemo(demo.id)}
                    className={`p-6 text-left transition-all ${
                      activeDemo === demo.id
                        ? 'bg-blue-50 border-b-4 border-blue-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-3 rounded-lg ${
                          activeDemo === demo.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          {demo.name}
                        </h3>
                        <p className="text-sm text-gray-600">{demo.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-8">
            {activeDemo === 'receipt' && <ReceiptDemo />}
            {activeDemo === 'invoice' && <InvoiceDemo />}
            {activeDemo === 'apar' && <APARDemo />}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 bg-gray-50 border border-gray-200 rounded-full px-8 py-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">2.1s</div>
              <div className="text-sm text-gray-600">Avg Processing</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">98%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">50hrs</div>
              <div className="text-sm text-gray-600">Saved/Month</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
