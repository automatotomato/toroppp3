import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface TipCategory {
  name: string;
  gradient: string;
}

const categories: TipCategory[] = [
  { name: "Revenue", gradient: "from-green-500 to-emerald-600" },
  { name: "Growth", gradient: "from-blue-500 to-blue-600" },
  { name: "Finance", gradient: "from-purple-500 to-purple-600" },
  { name: "Marketing", gradient: "from-orange-500 to-red-600" },
  { name: "Operations", gradient: "from-cyan-500 to-blue-600" },
  { name: "Technology", gradient: "from-indigo-500 to-purple-600" },
];

const tipPrompts = [
  {
    category: "Revenue",
    prompt: "Generate a practical tip for tax franchise owners to maximize revenue. Include specific strategies they can implement this week. Format: {title, content (2-3 sentences), keyPoints (4 actionable items)}"
  },
  {
    category: "Growth",
    prompt: "Generate a practical tip for tax franchise owners to grow their client base. Include specific marketing or referral strategies. Format: {title, content (2-3 sentences), keyPoints (4 actionable items)}"
  },
  {
    category: "Finance",
    prompt: "Generate a practical tip for tax franchise owners about financial management, cash flow, or budgeting. Format: {title, content (2-3 sentences), keyPoints (4 actionable items)}"
  },
  {
    category: "Marketing",
    prompt: "Generate a practical tip for tax franchise owners about marketing, social media, or client engagement. Format: {title, content (2-3 sentences), keyPoints (4 actionable items)}"
  },
  {
    category: "Operations",
    prompt: "Generate a practical tip for tax franchise owners about operational efficiency, team management, or productivity. Format: {title, content (2-3 sentences), keyPoints (4 actionable items)}"
  },
  {
    category: "Technology",
    prompt: "Generate a practical tip for tax franchise owners about using technology, automation, or software to improve their business. Format: {title, content (2-3 sentences), keyPoints (4 actionable items)}"
  }
];

function generateTip(category: string): {
  title: string;
  content: string;
  keyPoints: string[];
} {
  const templates = {
    Revenue: {
      titles: [
        "Maximize Off-Season Revenue Streams",
        "Price Optimization for Higher Profits",
        "Upselling Strategies That Work",
        "Package Your Services for More Value"
      ],
      contents: [
        "Diversify your income by offering year-round services beyond tax preparation. Bookkeeping, payroll, and business consulting can generate consistent revenue during slower months. Top franchises earn 40% of annual revenue from non-tax services.",
        "Review your pricing structure quarterly to ensure it reflects your value and market position. Strategic price increases of 10-15% on premium services rarely result in client loss when positioned correctly.",
        "Bundle complementary services to increase average transaction value. Clients who purchase packages spend 50% more than those who buy single services.",
        "Implement value-based pricing for complex returns and business services. Stop competing on price and start competing on expertise and results."
      ],
      keyPoints: [
        ["Add bookkeeping services for monthly recurring revenue", "Launch business consulting packages", "Offer quarterly tax planning sessions", "Create virtual CFO services for small businesses"],
        ["Analyze competitor pricing in your market", "Increase prices for complex returns by 10-15%", "Add premium tiers with white-glove service", "Communicate value clearly to justify pricing"],
        ["Create 3-tier service packages (Basic, Standard, Premium)", "Offer year-round tax planning bundles", "Bundle tax prep with bookkeeping at discount", "Design audit protection packages"],
        ["Calculate time and expertise for each service type", "Price based on client outcomes and value", "Create transparent pricing guides", "Train staff on value-based selling"]
      ]
    },
    Growth: {
      titles: [
        "Build a Referral Engine That Scales",
        "Local SEO for More Walk-In Clients",
        "Email Marketing That Converts",
        "Strategic Partnership Development"
      ],
      contents: [
        "Implement a structured referral program with clear incentives. Top performers see 30-40% of new business from referrals by offering $25-50 credits for both parties and following up within 24 hours.",
        "Optimize your Google Business Profile and local listings to dominate local search. 76% of people who search for something nearby visit a business within 24 hours.",
        "Build an email list and send weekly value-packed content during tax season. Offices with email marketing see 25% higher retention rates.",
        "Partner with complementary businesses like accountants, financial advisors, and real estate agents for mutual referrals. Strategic partnerships can add 50+ quality leads per year."
      ],
      keyPoints: [
        ["Offer $25-50 credit for successful referrals", "Create physical referral cards to hand out", "Follow up with referrals within 24 hours", "Thank referrers with personal calls or notes"],
        ["Complete and optimize Google Business Profile", "Collect and respond to client reviews weekly", "Post updates and offers on Google twice weekly", "Target local keywords in website content"],
        ["Offer lead magnet for email signup (tax guide)", "Send weekly tips during tax season", "Create abandoned appointment email sequence", "Segment lists by client type for targeted content"],
        ["Identify 10 complementary local businesses", "Propose mutual referral arrangements", "Host joint educational seminars", "Share office space or cross-promote services"]
      ]
    },
    Finance: {
      titles: [
        "Master Your Cash Flow Forecast",
        "Build Your Off-Season Reserve Fund",
        "Smart Reinvestment Strategies",
        "Reduce Operating Expenses Without Pain"
      ],
      contents: [
        "Create a 13-week rolling cash flow forecast to anticipate seasonal dips and peaks. This simple practice helps you make smarter decisions about hiring, marketing spend, and major purchases.",
        "Set aside 25-30% of peak season revenue in a dedicated savings account for off-season expenses. Having 3-6 months of operating expenses in reserve eliminates financial stress.",
        "Reinvest 15-20% of profits back into growth initiatives like marketing, training, and technology. Strategic reinvestment compounds year-over-year growth.",
        "Audit expenses quarterly to identify savings opportunities. Most franchises can reduce costs by 10-15% without impacting service quality by renegotiating contracts and eliminating waste."
      ],
      keyPoints: [
        ["Track weekly cash position religiously", "Project 13 weeks forward every Monday", "Identify seasonal patterns and plan accordingly", "Adjust spending based on cash position"],
        ["Calculate 3-6 months of operating expenses", "Auto-transfer 25% of deposits during peak season", "Keep reserve in high-yield savings account", "Only tap reserve for genuine emergencies"],
        ["Allocate 15-20% of net profit to growth", "Invest in staff training and development", "Upgrade technology and automation tools", "Increase marketing during growth periods"],
        ["Review all recurring expenses quarterly", "Renegotiate vendor contracts annually", "Eliminate unused software subscriptions", "Implement energy-saving measures"]
      ]
    },
    Marketing: {
      titles: [
        "Social Media Content That Drives Business",
        "Google Ads Strategy for Tax Season",
        "Community Event Marketing",
        "Video Marketing for Tax Professionals"
      ],
      contents: [
        "Post 3-5 times per week mixing educational content, client stories, and team highlights. Consistent social presence increases brand awareness and drives 30% more referrals.",
        "Run targeted Google Ads campaigns 60 days before tax season focusing on local keywords. Well-optimized campaigns generate 100+ qualified leads at $15-25 per lead.",
        "Host free tax planning workshops and community events. These position you as the local expert and typically convert 40% of attendees into clients.",
        "Create short educational videos answering common tax questions. Video content gets 10x more engagement than text and builds trust rapidly."
      ],
      keyPoints: [
        ["Create content calendar for the month", "Post tax tips and deadline reminders", "Share client success stories (with permission)", "Show behind-the-scenes team moments"],
        ["Set up geo-targeted campaigns in your service area", "Focus on 'tax preparation near me' keywords", "Create compelling ad copy with clear CTAs", "Monitor and optimize daily during tax season"],
        ["Partner with library or community center", "Advertise free workshop 3 weeks in advance", "Provide valuable content (not just sales pitch)", "Collect contact info for follow-up"],
        ["Record 2-minute videos answering FAQs", "Post on social media and website", "Use smartphone for authentic feel", "Include clear call-to-action at end"]
      ]
    },
    Operations: {
      titles: [
        "Daily Huddles for Team Alignment",
        "Standard Operating Procedures That Work",
        "Client Experience Workflow",
        "Technology Stack Optimization"
      ],
      contents: [
        "Hold 15-minute daily team huddles to align priorities and address challenges. This simple practice increases productivity by 25% and reduces errors by catching issues early.",
        "Document your processes in simple SOPs so any team member can step in. Offices with clear SOPs onboard new staff 50% faster and maintain consistent quality.",
        "Map your entire client journey from first contact to completed return. Identify and eliminate friction points to improve satisfaction and reduce support time.",
        "Audit your technology stack quarterly. Eliminate redundant tools, integrate systems where possible, and ensure your team actually uses what you're paying for."
      ],
      keyPoints: [
        ["Schedule huddles at same time daily", "Keep meetings to 15 minutes maximum", "Focus only on today's priorities", "End with motivational message or win"],
        ["Document your 10 most common processes", "Use simple step-by-step format with screenshots", "Review and update SOPs quarterly", "Train all staff on documented procedures"],
        ["Map every touchpoint from inquiry to completion", "Survey clients about pain points", "Streamline appointment scheduling", "Create follow-up automation sequences"],
        ["List all software and monthly costs", "Identify redundant or unused tools", "Research integration opportunities", "Train staff on underutilized features"]
      ]
    },
    Technology: {
      titles: [
        "Appointment Automation That Saves Hours",
        "CRM Setup for Tax Professionals",
        "E-Signature and Document Management",
        "Client Portal Best Practices"
      ],
      contents: [
        "Implement automated appointment reminders via SMS and email to reduce no-shows by 70%. Use scheduling software that syncs with your calendar and sends automatic confirmations.",
        "Set up a simple CRM to track all client interactions, preferences, and history. Organized client data increases retention by 30% and enables personalized service.",
        "Use e-signature tools and cloud document management to eliminate paper and speed up processes. Digital workflows cut document processing time by 60%.",
        "Deploy a client portal where clients can securely upload documents, check status, and access completed returns. Portals reduce support calls by 40%."
      ],
      keyPoints: [
        ["Choose online scheduling tool with SMS capability", "Set up automatic 24-hour reminders", "Send day-of confirmation texts", "Enable clients to reschedule easily"],
        ["Select CRM designed for service businesses", "Import all client contact information", "Log all interactions and notes", "Set up automated follow-up sequences"],
        ["Implement DocuSign or similar e-signature tool", "Store all documents in cloud service", "Create folder structure for easy retrieval", "Set up automatic backup systems"],
        ["Choose secure portal with bank-level encryption", "Train clients on portal usage", "Enable document upload directly to portal", "Integrate portal with your practice management software"]
      ]
    }
  };

  const categoryData = templates[category as keyof typeof templates];
  if (!categoryData) {
    throw new Error(`Unknown category: ${category}`);
  }

  const randomIndex = Math.floor(Math.random() * categoryData.titles.length);

  return {
    title: categoryData.titles[randomIndex],
    content: categoryData.contents[randomIndex],
    keyPoints: categoryData.keyPoints[randomIndex]
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { count = 1 } = await req.json().catch(() => ({ count: 1 }));

    const generatedTips = [];
    const selectedCategories = categories.sort(() => 0.5 - Math.random()).slice(0, count);

    for (const categoryInfo of selectedCategories) {
      const tip = generateTip(categoryInfo.name);

      const weekStartDate = new Date();
      weekStartDate.setDate(weekStartDate.getDate() - weekStartDate.getDay());

      const { data, error } = await supabase
        .from("tips_of_week")
        .insert({
          title: tip.title,
          content: tip.content,
          category: categoryInfo.name,
          key_points: tip.keyPoints,
          gradient: categoryInfo.gradient,
          week_start_date: weekStartDate.toISOString().split('T')[0],
          published_at: new Date().toISOString(),
          is_active: true,
          likes_count: Math.floor(Math.random() * 200) + 100
        })
        .select()
        .single();

      if (error) throw error;
      generatedTips.push(data);
    }

    return new Response(
      JSON.stringify({
        success: true,
        tips: generatedTips,
        tipsCreated: generatedTips.length,
        message: `Successfully generated ${generatedTips.length} new tip(s)`
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error generating tips:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
