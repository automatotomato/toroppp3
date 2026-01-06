export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      resolve(base64.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function generateSessionId(): string {
  return crypto.randomUUID();
}

export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith('image/')) {
    return file;
  }

  const MAX_SIZE = 2 * 1024 * 1024;
  if (file.size <= MAX_SIZE) {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        const ratio = Math.sqrt(MAX_SIZE / file.size);
        width = Math.floor(width * ratio);
        height = Math.floor(height * ratio);

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        }, file.type, 0.8);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export interface ProcessingResult {
  data: any;
  processingTime: number;
  isMock: boolean;
  sessionId: string;
}

export async function processDocument(
  file: File,
  demoType: 'receipt' | 'invoice' | 'apar',
  sessionId: string
): Promise<ProcessingResult> {
  const startTime = Date.now();

  try {
    const compressedFile = await compressImage(file);
    const base64Data = await fileToBase64(compressedFile);

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/process-demo-document`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          fileData: base64Data,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          demoType,
          sessionId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Processing failed');
    }

    const result = await response.json();
    const processingTime = Date.now() - startTime;

    return {
      data: result.data,
      processingTime,
      isMock: result.isMock || false,
      sessionId,
    };
  } catch (error) {
    const processingTime = Date.now() - startTime;
    const mockData = getMockData(demoType);

    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
      data: mockData,
      processingTime: 2100,
      isMock: true,
      sessionId,
    };
  }
}

function getMockData(demoType: 'receipt' | 'invoice' | 'apar') {
  if (demoType === 'receipt') {
    return {
      vendorName: 'Starbucks Coffee',
      date: '2024-01-15',
      total: 12.50,
      tax: 1.13,
      category: 'Food & Beverage',
      paymentMethod: 'Credit Card ****4242',
      lineItems: [
        { item: 'Grande Latte', quantity: 1, price: 5.25 },
        { item: 'Croissant', quantity: 2, price: 3.50 },
      ],
      confidence: {
        vendorName: 98,
        date: 99,
        total: 100,
        tax: 97,
        category: 95,
        paymentMethod: 92,
      },
    };
  } else if (demoType === 'invoice') {
    return {
      invoiceNumber: 'INV-2024-001234',
      vendor: {
        name: 'TechSupply Solutions Inc.',
        address: '123 Business Park, Suite 400, San Francisco, CA 94105',
        taxId: 'EIN: 12-3456789',
      },
      client: {
        name: 'Acme Corporation',
        address: '456 Corporate Blvd, New York, NY 10001',
      },
      invoiceDate: '2024-01-20',
      dueDate: '2024-02-20',
      paymentTerms: 'NET 30',
      lineItems: [
        { description: 'Dell OptiPlex 7090 Desktop', quantity: 5, unitPrice: 899.00, total: 4495.00 },
        { description: 'HP LaserJet Pro Printer', quantity: 2, unitPrice: 349.99, total: 699.98 },
        { description: 'Microsoft Office 365 Licenses', quantity: 10, unitPrice: 12.50, total: 125.00 },
      ],
      subtotal: 5319.98,
      tax: 478.80,
      discount: 0,
      total: 5798.78,
      confidence: {
        invoiceNumber: 100,
        vendor: 98,
        client: 97,
        dates: 99,
        lineItems: 96,
        totals: 100,
      },
    };
  } else {
    return {
      summary: {
        totalAP: 45320.50,
        totalAR: 68450.25,
        netPosition: 23129.75,
        overdueAmount: 12450.00,
      },
      documents: [
        {
          id: 1,
          type: 'payable',
          vendor: 'Office Supplies Co.',
          amount: 3450.00,
          dueDate: '2024-02-15',
          status: 'pending',
          category: 'Office Supplies',
          daysUntilDue: 10,
        },
        {
          id: 2,
          type: 'receivable',
          client: 'Acme Corp',
          amount: 15600.00,
          dueDate: '2024-01-25',
          status: 'overdue',
          category: 'Consulting Services',
          daysOverdue: 11,
        },
        {
          id: 3,
          type: 'payable',
          vendor: 'Electric Company',
          amount: 1250.50,
          dueDate: '2024-02-28',
          status: 'pending',
          category: 'Utilities',
          daysUntilDue: 23,
        },
      ],
      insights: [
        {
          type: 'warning',
          message: 'You have $12,450 in overdue receivables. Consider sending payment reminders.',
          priority: 'high',
        },
        {
          type: 'info',
          message: 'Cash flow projection shows positive balance for next 30 days.',
          priority: 'medium',
        },
        {
          type: 'tip',
          message: 'Early payment to Office Supplies Co. could save 2% ($69.00).',
          priority: 'low',
        },
      ],
      agingReport: {
        current: 25000,
        days30: 15000,
        days60: 8000,
        days90: 5000,
        over90: 2320.50,
      },
    };
  }
}
