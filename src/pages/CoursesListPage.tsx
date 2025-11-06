import { Link } from 'react-router-dom';
import { BookOpen, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const coursesData = [
  {
    number: 1,
    title: 'Mastering Cashflow & Profitability',
    shortDesc: 'Turn seasonal income into predictable profits by mastering cash flow, forecasting, and budgeting strategies designed for tax offices.',
    fullDesc: 'Learn how to stabilize and grow your business by mastering cash flow management. This session teaches how to anticipate seasonal fluctuations, allocate resources, and improve profit margins.',
    objectives: 'Identify key cash flow drivers, set up simple forecasting tools, and develop a profitability plan for consistent growth.',
    outcomes: 'Franchise owners will gain financial clarity and control, ensuring each tax season strengthens—not strains—the business.',
  },
  {
    number: 2,
    title: 'Financial Literacy for Franchise Owners',
    shortDesc: 'Understand your numbers like a CFO—learn how to read financial statements and make data-driven business decisions.',
    fullDesc: 'Understand your financial statements, break-even points, and key ratios to make data-informed business decisions.',
    objectives: 'Build confidence reading P&L statements and balance sheets, and learn how to assess financial performance at a glance.',
    outcomes: 'Owners will make smarter investment, staffing, and marketing decisions rooted in solid financial understanding.',
  },
  {
    number: 3,
    title: 'Local Marketing That Works',
    shortDesc: 'Build your community presence through local partnerships, referral systems, and digital campaigns that attract loyal clients.',
    fullDesc: 'Discover proven local marketing strategies that turn your community into your client base.',
    objectives: 'Learn how to use grassroots tactics, local partnerships, and digital tools to attract and retain clients.',
    outcomes: 'Increased local visibility, stronger referral pipelines, and improved client acquisition during and beyond tax season.',
  },
  {
    number: 4,
    title: 'Sales Systems for Consistent Growth',
    shortDesc: 'Develop proven sales processes that increase conversions and create repeat clients beyond tax season.',
    fullDesc: 'Build a predictable, repeatable sales process that turns leads into loyal clients.',
    objectives: 'Develop scripts, follow-up systems, and customer relationship workflows tailored to tax services.',
    outcomes: 'Franchise owners will drive consistent client growth and improve close rates through structured sales systems.',
  },
  {
    number: 5,
    title: 'Operational Excellence',
    shortDesc: 'Optimize people, processes, and performance. Build accountability systems that elevate daily operations.',
    fullDesc: 'Learn how to lead your office efficiently and maximize team productivity without recreating SOPs.',
    objectives: 'Implement accountability systems, daily performance metrics, and clear communication routines.',
    outcomes: 'Franchisees will gain tools to manage operations smoothly and improve employee performance across all locations.',
  },
  {
    number: 6,
    title: 'Technology & Automation',
    shortDesc: 'Leverage automation tools, CRM platforms, and AI workflows to reduce admin time and boost productivity.',
    fullDesc: 'Explore the latest tech tools that save time and eliminate bottlenecks in daily operations.',
    objectives: 'Learn how to automate scheduling, marketing, and client management with the right CRM and workflow systems.',
    outcomes: 'More streamlined operations, reduced errors, and increased client satisfaction through efficient tech use.',
  },
  {
    number: 7,
    title: 'Strategic Planning for Franchise Owners',
    shortDesc: 'Design a quarterly roadmap that aligns your goals with franchise growth objectives for measurable success.',
    fullDesc: 'Build a roadmap for your business that aligns with corporate objectives and your local market realities.',
    objectives: 'Define annual priorities, set measurable quarterly goals, and create actionable plans for growth.',
    outcomes: 'Owners leave with a clear strategic plan that keeps teams focused, accountable, and aligned.',
  },
  {
    number: 8,
    title: 'Data-Driven Decision Making',
    shortDesc: 'Track KPIs, interpret dashboards, and use analytics to make confident, profitable decisions.',
    fullDesc: 'Use analytics to make smart, timely business decisions.',
    objectives: 'Learn how to interpret data dashboards, measure ROI, and identify performance trends.',
    outcomes: 'Franchisees will confidently use data to adjust strategy, improve marketing ROI, and enhance profitability.',
  },
  {
    number: 9,
    title: 'Client Retention & Lifetime Value',
    shortDesc: 'Turn seasonal clients into lifelong customers with loyalty programs, upsell strategies, and consistent engagement.',
    fullDesc: 'Move beyond one-and-done transactions to create lifelong client relationships.',
    objectives: 'Build retention programs, implement follow-up systems, and train teams on cross-selling additional services.',
    outcomes: 'Franchise owners will increase repeat business, improve customer loyalty, and grow client lifetime value.',
  },
  {
    number: 10,
    title: 'Innovation & Growth Beyond Tax Season',
    shortDesc: 'Discover new revenue streams—bookkeeping, business filings, consulting—to stay profitable year-round.',
    fullDesc: 'Learn how to extend your business beyond tax season by adding value-driven services.',
    objectives: 'Identify new revenue opportunities and develop rollout plans.',
    outcomes: 'Franchisees will create sustainable, year-round income streams that stabilize cash flow and strengthen their market position.',
  },
  {
    number: 11,
    title: 'Leadership Skills for Franchise Owners',
    shortDesc: 'Inspire, motivate, and lead teams effectively through growth cycles and high-pressure seasons.',
    fullDesc: 'Strengthen your leadership presence and learn how to motivate, delegate, and coach your team effectively.',
    objectives: 'Develop leadership self-awareness, communication effectiveness, and decision-making confidence.',
    outcomes: 'Franchisees will lead with influence, drive performance, and cultivate stronger team alignment.',
  },
  {
    number: 12,
    title: 'Employee Engagement & Retention',
    shortDesc: 'Build a culture of performance and purpose through better communication, recognition, and accountability systems.',
    fullDesc: 'Discover how to build a workplace culture that attracts and retains top talent.',
    objectives: 'Learn engagement techniques, recognition systems, and career development tools that inspire loyalty.',
    outcomes: 'Improved morale, lower turnover, and stronger team commitment throughout the tax season and beyond.',
  },
];

export default function CoursesListPage() {
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-slate-900 py-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="text-white hover:text-red-400 font-semibold transition-colors">
            ← Back to Home
          </Link>
          <Link
            to="/register"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Enroll Now
          </Link>
        </div>
      </header>

      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="text-red-600 mx-auto mb-6" size={64} />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Course Catalog</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Explore all 12 workshops in detail. Click on any course to learn more about objectives and outcomes.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {coursesData.map((course) => (
              <div
                key={course.number}
                className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden hover:border-red-600 transition-all"
              >
                <button
                  onClick={() => setExpandedCourse(expandedCourse === course.number ? null : course.number)}
                  className="w-full p-6 flex items-start gap-4 text-left"
                >
                  <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {course.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
                    <p className="text-slate-600">{course.shortDesc}</p>
                  </div>
                  <ChevronDown
                    className={`text-red-600 flex-shrink-0 transition-transform ${
                      expandedCourse === course.number ? 'rotate-180' : ''
                    }`}
                    size={24}
                  />
                </button>

                {expandedCourse === course.number && (
                  <div className="px-6 pb-6 border-t border-slate-200 pt-6 space-y-4">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">Description</h4>
                      <p className="text-slate-700">{course.fullDesc}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">Objectives</h4>
                      <p className="text-slate-700">{course.objectives}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">Outcomes</h4>
                      <p className="text-slate-700">{course.outcomes}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/register"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl transition-all transform hover:scale-105"
            >
              Enroll in All 12 Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
