import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { fileData, fileName, fileType, fileSize, demoType, sessionId } = await req.json();

    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from('ai_demo_sessions')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', clientIp)
      .gte('created_at', oneHourAgo);

    if (count && count >= 10) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const startTime = Date.now();

    const mockData = getMockData(demoType);

    const processingTime = Date.now() - startTime;

    await supabase.from('ai_demo_sessions').insert({
      session_id: sessionId,
      demo_type: demoType,
      file_size: fileSize,
      processing_time_ms: processingTime,
      success: true,
      ip_address: clientIp,
      user_agent: userAgent,
    });

    return new Response(
      JSON.stringify({
        data: mockData,
        isMock: true,
        processingTime,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error processing demo:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process document' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});

function getMockData(demoType: string) {
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
        {
          id: 4,
          type: 'receivable',
          client: 'Tech Solutions LLC',
          amount: 25000.00,
          dueDate: '2024-02-10',
          status: 'pending',
          category: 'Professional Services',
          daysUntilDue: 5,
        },
        {
          id: 5,
          type: 'payable',
          vendor: 'Internet Provider',
          amount: 450.00,
          dueDate: '2024-02-25',
          status: 'pending',
          category: 'Utilities',
          daysUntilDue: 20,
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
