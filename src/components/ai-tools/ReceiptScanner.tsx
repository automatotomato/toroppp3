import { useState, useEffect } from 'react';
import { Upload, Image, DollarSign, Calendar, Building2, Tag, FileText, Download, TrendingUp, Filter, Check, X, Edit2, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface ExtractedData {
  amount?: number;
  date?: string;
  vendor?: string;
  category?: string;
  tax_amount?: number;
  payment_method?: string;
}

interface Receipt {
  id: string;
  image_url: string;
  original_filename: string;
  upload_date: string;
  extracted_data: ExtractedData;
  manual_corrections: ExtractedData;
  verification_status: 'pending' | 'processing' | 'completed' | 'failed';
  notes: string;
}

const EXPENSE_CATEGORIES = [
  'Meals & Entertainment',
  'Office Supplies',
  'Travel',
  'Utilities',
  'Professional Services',
  'Equipment',
  'Marketing',
  'Insurance',
  'Rent',
  'Software & Subscriptions',
  'Vehicle Expenses',
  'Training & Education',
  'Repairs & Maintenance',
  'Other'
];

export default function ReceiptScanner() {
  const { user } = useAuth();
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<ExtractedData>({});
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterMonth, setFilterMonth] = useState<string>('all');
  const [showStats, setShowStats] = useState(true);

  useEffect(() => {
    if (user) {
      loadReceipts();
    }
  }, [user]);

  const loadReceipts = async () => {
    try {
      const { data, error } = await supabase
        .from('receipts')
        .select('*')
        .eq('user_id', user?.id)
        .order('upload_date', { ascending: false });

      if (error) throw error;
      setReceipts(data || []);
    } catch (error) {
      console.error('Error loading receipts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    await processFiles(files);
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      await processFiles(files);
    }
  };

  const processFiles = async (files: File[]) => {
    if (files.length > 20) {
      alert('Maximum 20 files can be uploaded at once');
      return;
    }

    setUploading(true);

    for (const file of files) {
      if (!['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'].includes(file.type)) {
        console.error(`Skipping unsupported file type: ${file.type}`);
        continue;
      }

      if (file.size > 10 * 1024 * 1024) {
        console.error(`File too large: ${file.name}`);
        continue;
      }

      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user?.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('receipt-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: receiptData, error: insertError } = await supabase
          .from('receipts')
          .insert({
            user_id: user?.id,
            image_url: fileName,
            original_filename: file.name,
            verification_status: 'processing'
          })
          .select()
          .single();

        if (insertError) throw insertError;

        simulateAIProcessing(receiptData.id);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    setUploading(false);
    await loadReceipts();
  };

  const simulateAIProcessing = async (receiptId: string) => {
    setTimeout(async () => {
      const mockExtractedData = {
        amount: Math.floor(Math.random() * 500) + 10,
        date: new Date().toISOString().split('T')[0],
        vendor: ['Office Depot', 'Staples', 'Amazon', 'Target', 'Walmart'][Math.floor(Math.random() * 5)],
        category: EXPENSE_CATEGORIES[Math.floor(Math.random() * EXPENSE_CATEGORIES.length)],
        tax_amount: Math.floor(Math.random() * 50),
        payment_method: ['Credit Card', 'Debit Card', 'Cash'][Math.floor(Math.random() * 3)]
      };

      await supabase
        .from('receipts')
        .update({
          extracted_data: mockExtractedData,
          verification_status: 'completed'
        })
        .eq('id', receiptId);

      await loadReceipts();
    }, 2000 + Math.random() * 3000);
  };

  const startEdit = (receipt: Receipt) => {
    setEditingId(receipt.id);
    setEditData({
      ...receipt.extracted_data,
      ...receipt.manual_corrections
    });
  };

  const saveEdit = async (receiptId: string) => {
    try {
      await supabase
        .from('receipts')
        .update({ manual_corrections: editData })
        .eq('id', receiptId);

      setEditingId(null);
      await loadReceipts();
    } catch (error) {
      console.error('Error saving edits:', error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const deleteReceipt = async (receiptId: string, imageUrl: string) => {
    if (!confirm('Are you sure you want to delete this receipt?')) return;

    try {
      await supabase.storage.from('receipt-images').remove([imageUrl]);
      await supabase.from('receipts').delete().eq('id', receiptId);
      await loadReceipts();
    } catch (error) {
      console.error('Error deleting receipt:', error);
    }
  };

  const exportToCSV = () => {
    const filtered = getFilteredReceipts();
    const csvContent = [
      ['Date', 'Vendor', 'Amount', 'Tax', 'Category', 'Payment Method', 'Notes'],
      ...filtered.map(r => {
        const data = { ...r.extracted_data, ...r.manual_corrections };
        return [
          data.date || '',
          data.vendor || '',
          data.amount || 0,
          data.tax_amount || 0,
          data.category || '',
          data.payment_method || '',
          r.notes || ''
        ];
      })
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getFilteredReceipts = () => {
    return receipts.filter(receipt => {
      const data = { ...receipt.extracted_data, ...receipt.manual_corrections };

      if (filterCategory !== 'all' && data.category !== filterCategory) {
        return false;
      }

      if (filterMonth !== 'all') {
        const receiptDate = new Date(data.date || receipt.upload_date);
        const receiptMonth = receiptDate.toISOString().slice(0, 7);
        if (receiptMonth !== filterMonth) {
          return false;
        }
      }

      return true;
    });
  };

  const calculateStats = () => {
    const filtered = getFilteredReceipts();
    const total = filtered.reduce((sum, r) => {
      const data = { ...r.extracted_data, ...r.manual_corrections };
      return sum + (data.amount || 0);
    }, 0);

    const taxDeductible = filtered.reduce((sum, r) => {
      const data = { ...r.extracted_data, ...r.manual_corrections };
      const category = data.category || '';
      const isDeductible = !['Personal', 'Non-deductible'].includes(category);
      return sum + (isDeductible ? (data.amount || 0) : 0);
    }, 0);

    const byCategory = filtered.reduce((acc, r) => {
      const data = { ...r.extracted_data, ...r.manual_corrections };
      const cat = data.category || 'Uncategorized';
      acc[cat] = (acc[cat] || 0) + (data.amount || 0);
      return acc;
    }, {} as Record<string, number>);

    return { total, taxDeductible, byCategory, count: filtered.length };
  };

  const stats = calculateStats();
  const filteredReceipts = getFilteredReceipts();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading receipts...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Receipt & Expense Scanner</h2>
          <p className="text-gray-400 mt-1">Upload receipts to automatically extract and organize expense data</p>
        </div>
        <button
          onClick={() => setShowStats(!showStats)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showStats ? 'Hide' : 'Show'} Stats
        </button>
      </div>

      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Expenses</p>
                <p className="text-2xl font-bold text-white mt-1">${stats.total.toFixed(2)}</p>
              </div>
              <DollarSign className="text-blue-500" size={32} />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Tax Deductible</p>
                <p className="text-2xl font-bold text-green-500 mt-1">${stats.taxDeductible.toFixed(2)}</p>
              </div>
              <TrendingUp className="text-green-500" size={32} />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Receipts Scanned</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.count}</p>
              </div>
              <FileText className="text-purple-500" size={32} />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Hours Saved</p>
                <p className="text-2xl font-bold text-white mt-1">{Math.ceil(stats.count * 0.25)}</p>
              </div>
              <Calendar className="text-orange-500" size={32} />
            </div>
          </div>
        </div>
      )}

      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto text-gray-400 mb-4" size={48} />
        <p className="text-white text-lg mb-2">
          {uploading ? 'Uploading...' : 'Drag and drop receipts here'}
        </p>
        <p className="text-gray-400 text-sm mb-4">
          or click to browse (PNG, JPG, PDF - Max 10MB per file, up to 20 files)
        </p>
        <input
          type="file"
          multiple
          accept="image/png,image/jpeg,image/jpg,application/pdf"
          onChange={handleFileInput}
          className="hidden"
          id="receipt-upload"
          disabled={uploading}
        />
        <label
          htmlFor="receipt-upload"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Select Files
        </label>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-400" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2"
          >
            <option value="all">All Categories</option>
            {EXPENSE_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <select
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2"
        >
          <option value="all">All Months</option>
          {Array.from(new Set(receipts.map(r => {
            const data = { ...r.extracted_data, ...r.manual_corrections };
            return new Date(data.date || r.upload_date).toISOString().slice(0, 7);
          }))).sort().reverse().map(month => (
            <option key={month} value={month}>
              {new Date(month + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
            </option>
          ))}
        </select>
        <button
          onClick={exportToCSV}
          className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Download size={20} />
          Export to CSV
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Tax</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredReceipts.map((receipt) => {
                const data = { ...receipt.extracted_data, ...receipt.manual_corrections };
                const isEditing = editingId === receipt.id;

                return (
                  <tr key={receipt.id} className="hover:bg-gray-700/50">
                    <td className="px-6 py-4">
                      {receipt.verification_status === 'processing' && (
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded">Processing</span>
                      )}
                      {receipt.verification_status === 'completed' && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded">Completed</span>
                      )}
                      {receipt.verification_status === 'failed' && (
                        <span className="px-2 py-1 bg-red-500/20 text-red-500 text-xs rounded">Failed</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-white">
                      {isEditing ? (
                        <input
                          type="date"
                          value={editData.date || ''}
                          onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                          className="bg-gray-900 border border-gray-600 rounded px-2 py-1 text-sm"
                        />
                      ) : (
                        data.date || '-'
                      )}
                    </td>
                    <td className="px-6 py-4 text-white">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.vendor || ''}
                          onChange={(e) => setEditData({ ...editData, vendor: e.target.value })}
                          className="bg-gray-900 border border-gray-600 rounded px-2 py-1 text-sm w-full"
                        />
                      ) : (
                        data.vendor || '-'
                      )}
                    </td>
                    <td className="px-6 py-4 text-white font-semibold">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.01"
                          value={editData.amount || ''}
                          onChange={(e) => setEditData({ ...editData, amount: parseFloat(e.target.value) })}
                          className="bg-gray-900 border border-gray-600 rounded px-2 py-1 text-sm w-24"
                        />
                      ) : (
                        `$${(data.amount || 0).toFixed(2)}`
                      )}
                    </td>
                    <td className="px-6 py-4 text-white">
                      {isEditing ? (
                        <select
                          value={editData.category || ''}
                          onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                          className="bg-gray-900 border border-gray-600 rounded px-2 py-1 text-sm"
                        >
                          <option value="">Select...</option>
                          {EXPENSE_CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                          {data.category || 'Uncategorized'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.01"
                          value={editData.tax_amount || ''}
                          onChange={(e) => setEditData({ ...editData, tax_amount: parseFloat(e.target.value) })}
                          className="bg-gray-900 border border-gray-600 rounded px-2 py-1 text-sm w-20"
                        />
                      ) : (
                        `$${(data.tax_amount || 0).toFixed(2)}`
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {data.payment_method || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => saveEdit(receipt.id)}
                              className="text-green-500 hover:text-green-400"
                            >
                              <Save size={18} />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="text-red-500 hover:text-red-400"
                            >
                              <X size={18} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(receipt)}
                              className="text-blue-500 hover:text-blue-400"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => deleteReceipt(receipt.id, receipt.image_url)}
                              className="text-red-500 hover:text-red-400"
                            >
                              <X size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredReceipts.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No receipts found. Upload some to get started!
            </div>
          )}
        </div>
      </div>

      {showStats && Object.keys(stats.byCategory).length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Expenses by Category</h3>
          <div className="space-y-3">
            {Object.entries(stats.byCategory)
              .sort(([, a], [, b]) => b - a)
              .map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <Tag size={16} className="text-gray-400" />
                    <span className="text-white">{category}</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2 max-w-md">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(amount / stats.total) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-white font-semibold">${amount.toFixed(2)}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}