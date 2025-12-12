/*
  # Populate Historical Tips Data

  1. Purpose
    - Backfill tips for the past 10 weeks
    - 5 tips per week covering all 6 categories
    - Vary likes_count based on tip age (older tips have more engagement)

  2. Data Distribution
    - Week 1-10: All 6 categories represented
    - Rotate through categories systematically
    - Older tips have higher like counts (100-300 range)
    - Recent tips have lower like counts (50-150 range)

  3. Week Start Dates
    - Calculate Monday of each past week
    - Published dates match the week start
*/

DO $$
DECLARE
  v_week_offset int;
  v_week_start_date date;
  v_published_at timestamptz;
  v_likes_base int;
  v_category text;
  v_gradient text;
  v_tip_index int;
  v_categories text[] := ARRAY['Revenue', 'Growth', 'Finance', 'Marketing', 'Operations', 'Technology'];
  v_gradients text[] := ARRAY[
    'from-green-500 to-emerald-600',
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-orange-500 to-red-600',
    'from-cyan-500 to-blue-600',
    'from-indigo-500 to-purple-600'
  ];
  
  v_revenue_tips jsonb := '[
    {"title": "Maximize Off-Season Revenue Streams", "content": "Diversify your income by offering year-round services beyond tax preparation. Bookkeeping, payroll, and business consulting can generate consistent revenue during slower months. Top franchises earn 40% of annual revenue from non-tax services.", "keyPoints": ["Add bookkeeping services for monthly recurring revenue", "Launch business consulting packages", "Offer quarterly tax planning sessions", "Create virtual CFO services for small businesses"]},
    {"title": "Price Optimization for Higher Profits", "content": "Review your pricing structure quarterly to ensure it reflects your value and market position. Strategic price increases of 10-15% on premium services rarely result in client loss when positioned correctly.", "keyPoints": ["Analyze competitor pricing in your market", "Increase prices for complex returns by 10-15%", "Add premium tiers with white-glove service", "Communicate value clearly to justify pricing"]},
    {"title": "Upselling Strategies That Work", "content": "Bundle complementary services to increase average transaction value. Clients who purchase packages spend 50% more than those who buy single services.", "keyPoints": ["Create 3-tier service packages (Basic, Standard, Premium)", "Offer year-round tax planning bundles", "Bundle tax prep with bookkeeping at discount", "Design audit protection packages"]},
    {"title": "Package Your Services for More Value", "content": "Implement value-based pricing for complex returns and business services. Stop competing on price and start competing on expertise and results.", "keyPoints": ["Calculate time and expertise for each service type", "Price based on client outcomes and value", "Create transparent pricing guides", "Train staff on value-based selling"]}
  ]'::jsonb;
  
  v_growth_tips jsonb := '[
    {"title": "Build a Referral Engine That Scales", "content": "Implement a structured referral program with clear incentives. Top performers see 30-40% of new business from referrals by offering $25-50 credits for both parties and following up within 24 hours.", "keyPoints": ["Offer $25-50 credit for successful referrals", "Create physical referral cards to hand out", "Follow up with referrals within 24 hours", "Thank referrers with personal calls or notes"]},
    {"title": "Local SEO for More Walk-In Clients", "content": "Optimize your Google Business Profile and local listings to dominate local search. 76% of people who search for something nearby visit a business within 24 hours.", "keyPoints": ["Complete and optimize Google Business Profile", "Collect and respond to client reviews weekly", "Post updates and offers on Google twice weekly", "Target local keywords in website content"]},
    {"title": "Email Marketing That Converts", "content": "Build an email list and send weekly value-packed content during tax season. Offices with email marketing see 25% higher retention rates.", "keyPoints": ["Offer lead magnet for email signup (tax guide)", "Send weekly tips during tax season", "Create abandoned appointment email sequence", "Segment lists by client type for targeted content"]},
    {"title": "Strategic Partnership Development", "content": "Partner with complementary businesses like accountants, financial advisors, and real estate agents for mutual referrals. Strategic partnerships can add 50+ quality leads per year.", "keyPoints": ["Identify 10 complementary local businesses", "Propose mutual referral arrangements", "Host joint educational seminars", "Share office space or cross-promote services"]}
  ]'::jsonb;
  
  v_finance_tips jsonb := '[
    {"title": "Master Your Cash Flow Forecast", "content": "Create a 13-week rolling cash flow forecast to anticipate seasonal dips and peaks. This simple practice helps you make smarter decisions about hiring, marketing spend, and major purchases.", "keyPoints": ["Track weekly cash position religiously", "Project 13 weeks forward every Monday", "Identify seasonal patterns and plan accordingly", "Adjust spending based on cash position"]},
    {"title": "Build Your Off-Season Reserve Fund", "content": "Set aside 25-30% of peak season revenue in a dedicated savings account for off-season expenses. Having 3-6 months of operating expenses in reserve eliminates financial stress.", "keyPoints": ["Calculate 3-6 months of operating expenses", "Auto-transfer 25% of deposits during peak season", "Keep reserve in high-yield savings account", "Only tap reserve for genuine emergencies"]},
    {"title": "Smart Reinvestment Strategies", "content": "Reinvest 15-20% of profits back into growth initiatives like marketing, training, and technology. Strategic reinvestment compounds year-over-year growth.", "keyPoints": ["Allocate 15-20% of net profit to growth", "Invest in staff training and development", "Upgrade technology and automation tools", "Increase marketing during growth periods"]},
    {"title": "Reduce Operating Expenses Without Pain", "content": "Audit expenses quarterly to identify savings opportunities. Most franchises can reduce costs by 10-15% without impacting service quality by renegotiating contracts and eliminating waste.", "keyPoints": ["Review all recurring expenses quarterly", "Renegotiate vendor contracts annually", "Eliminate unused software subscriptions", "Implement energy-saving measures"]}
  ]'::jsonb;
  
  v_marketing_tips jsonb := '[
    {"title": "Social Media Content That Drives Business", "content": "Post 3-5 times per week mixing educational content, client stories, and team highlights. Consistent social presence increases brand awareness and drives 30% more referrals.", "keyPoints": ["Create content calendar for the month", "Post tax tips and deadline reminders", "Share client success stories (with permission)", "Show behind-the-scenes team moments"]},
    {"title": "Google Ads Strategy for Tax Season", "content": "Run targeted Google Ads campaigns 60 days before tax season focusing on local keywords. Well-optimized campaigns generate 100+ qualified leads at $15-25 per lead.", "keyPoints": ["Set up geo-targeted campaigns in your service area", "Focus on tax preparation near me keywords", "Create compelling ad copy with clear CTAs", "Monitor and optimize daily during tax season"]},
    {"title": "Community Event Marketing", "content": "Host free tax planning workshops and community events. These position you as the local expert and typically convert 40% of attendees into clients.", "keyPoints": ["Partner with library or community center", "Advertise free workshop 3 weeks in advance", "Provide valuable content (not just sales pitch)", "Collect contact info for follow-up"]},
    {"title": "Video Marketing for Tax Professionals", "content": "Create short educational videos answering common tax questions. Video content gets 10x more engagement than text and builds trust rapidly.", "keyPoints": ["Record 2-minute videos answering FAQs", "Post on social media and website", "Use smartphone for authentic feel", "Include clear call-to-action at end"]}
  ]'::jsonb;
  
  v_operations_tips jsonb := '[
    {"title": "Daily Huddles for Team Alignment", "content": "Hold 15-minute daily team huddles to align priorities and address challenges. This simple practice increases productivity by 25% and reduces errors by catching issues early.", "keyPoints": ["Schedule huddles at same time daily", "Keep meetings to 15 minutes maximum", "Focus only on todays priorities", "End with motivational message or win"]},
    {"title": "Standard Operating Procedures That Work", "content": "Document your processes in simple SOPs so any team member can step in. Offices with clear SOPs onboard new staff 50% faster and maintain consistent quality.", "keyPoints": ["Document your 10 most common processes", "Use simple step-by-step format with screenshots", "Review and update SOPs quarterly", "Train all staff on documented procedures"]},
    {"title": "Client Experience Workflow", "content": "Map your entire client journey from first contact to completed return. Identify and eliminate friction points to improve satisfaction and reduce support time.", "keyPoints": ["Map every touchpoint from inquiry to completion", "Survey clients about pain points", "Streamline appointment scheduling", "Create follow-up automation sequences"]},
    {"title": "Technology Stack Optimization", "content": "Audit your technology stack quarterly. Eliminate redundant tools, integrate systems where possible, and ensure your team actually uses what youre paying for.", "keyPoints": ["List all software and monthly costs", "Identify redundant or unused tools", "Research integration opportunities", "Train staff on underutilized features"]}
  ]'::jsonb;
  
  v_technology_tips jsonb := '[
    {"title": "Appointment Automation That Saves Hours", "content": "Implement automated appointment reminders via SMS and email to reduce no-shows by 70%. Use scheduling software that syncs with your calendar and sends automatic confirmations.", "keyPoints": ["Choose online scheduling tool with SMS capability", "Set up automatic 24-hour reminders", "Send day-of confirmation texts", "Enable clients to reschedule easily"]},
    {"title": "CRM Setup for Tax Professionals", "content": "Set up a simple CRM to track all client interactions, preferences, and history. Organized client data increases retention by 30% and enables personalized service.", "keyPoints": ["Select CRM designed for service businesses", "Import all client contact information", "Log all interactions and notes", "Set up automated follow-up sequences"]},
    {"title": "E-Signature and Document Management", "content": "Use e-signature tools and cloud document management to eliminate paper and speed up processes. Digital workflows cut document processing time by 60%.", "keyPoints": ["Implement DocuSign or similar e-signature tool", "Store all documents in cloud service", "Create folder structure for easy retrieval", "Set up automatic backup systems"]},
    {"title": "Client Portal Best Practices", "content": "Deploy a client portal where clients can securely upload documents, check status, and access completed returns. Portals reduce support calls by 40%.", "keyPoints": ["Choose secure portal with bank-level encryption", "Train clients on portal usage", "Enable document upload directly to portal", "Integrate portal with your practice management software"]}
  ]'::jsonb;
  
  v_all_tips jsonb;
  v_tip jsonb;
  v_category_index int;
  
BEGIN
  -- Combine all tips by category
  v_all_tips := jsonb_build_object(
    'Revenue', v_revenue_tips,
    'Growth', v_growth_tips,
    'Finance', v_finance_tips,
    'Marketing', v_marketing_tips,
    'Operations', v_operations_tips,
    'Technology', v_technology_tips
  );

  -- Loop through past 10 weeks
  FOR v_week_offset IN 0..9 LOOP
    -- Calculate week start date (Monday)
    v_week_start_date := (CURRENT_DATE - (CURRENT_DATE - DATE_TRUNC('week', CURRENT_DATE)::date) - (v_week_offset * 7));
    v_published_at := v_week_start_date::timestamptz;
    
    -- Calculate base likes (older = more likes)
    v_likes_base := 250 - (v_week_offset * 15);
    
    -- Generate 5 tips for this week (use first 5 categories, rotate)
    FOR v_tip_index IN 0..4 LOOP
      v_category_index := (v_week_offset + v_tip_index) % 6 + 1;
      v_category := v_categories[v_category_index];
      v_gradient := v_gradients[v_category_index];
      
      -- Get a tip from the category (rotate through available tips)
      v_tip := (v_all_tips->v_category)->(v_week_offset % 4);
      
      -- Insert the tip
      INSERT INTO tips_of_week (
        title,
        content,
        category,
        key_points,
        gradient,
        week_start_date,
        published_at,
        is_active,
        likes_count
      ) VALUES (
        v_tip->>'title',
        v_tip->>'content',
        v_category,
        v_tip->'keyPoints',
        v_gradient,
        v_week_start_date,
        v_published_at,
        true,
        v_likes_base + floor(random() * 30)::int
      );
    END LOOP;
  END LOOP;
  
  RAISE NOTICE 'Successfully populated 50 historical tips across 10 weeks';
END $$;