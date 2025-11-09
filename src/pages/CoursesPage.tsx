import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { Play, Clock, CheckCircle2 } from 'lucide-react';
import VoiceAssistant from '../components/VoiceAssistant';

const courses = [
  {
    id: 1,
    title: 'Mastering Cashflow & Profitability',
    description: 'Turn seasonal income into predictable profits by mastering cash flow, forecasting, and budgeting strategies designed for tax offices.',
    duration: 90,
    completed: false,
  },
  {
    id: 2,
    title: 'Financial Literacy for Franchise Owners',
    description: 'Understand your numbers like a CFO—learn how to read financial statements and make data-driven business decisions.',
    duration: 85,
    completed: false,
  },
  {
    id: 3,
    title: 'Local Marketing That Works',
    description: 'Build your community presence through local partnerships, referral systems, and digital campaigns that attract loyal clients.',
    duration: 95,
    completed: false,
  },
  {
    id: 4,
    title: 'Sales Systems for Consistent Growth',
    description: 'Develop proven sales processes that increase conversions and create repeat clients beyond tax season.',
    duration: 80,
    completed: false,
  },
  {
    id: 5,
    title: 'Operational Excellence',
    description: 'Optimize people, processes, and performance. Build accountability systems that elevate daily operations.',
    duration: 100,
    completed: false,
  },
  {
    id: 6,
    title: 'Technology & Automation',
    description: 'Leverage automation tools, CRM platforms, and AI workflows to reduce admin time and boost productivity.',
    duration: 75,
    completed: false,
  },
  {
    id: 7,
    title: 'Strategic Planning for Franchise Owners',
    description: 'Design a quarterly roadmap that aligns your goals with franchise growth objectives for measurable success.',
    duration: 85,
    completed: false,
  },
  {
    id: 8,
    title: 'Data-Driven Decision Making',
    description: 'Track KPIs, interpret dashboards, and use analytics to make confident, profitable decisions.',
    duration: 70,
    completed: false,
  },
  {
    id: 9,
    title: 'Client Retention & Lifetime Value',
    description: 'Turn seasonal clients into lifelong customers with loyalty programs, upsell strategies, and consistent engagement.',
    duration: 80,
    completed: false,
  },
  {
    id: 10,
    title: 'Innovation & Growth Beyond Tax Season',
    description: 'Discover new revenue streams—bookkeeping, business filings, consulting—to stay profitable year-round.',
    duration: 90,
    completed: false,
  },
  {
    id: 11,
    title: 'Leadership Skills for Franchise Owners',
    description: 'Inspire, motivate, and lead teams effectively through growth cycles and high-pressure seasons.',
    duration: 95,
    completed: false,
  },
  {
    id: 12,
    title: 'Employee Engagement & Retention',
    description: 'Build a culture of performance and purpose through better communication, recognition, and accountability systems.',
    duration: 85,
    completed: false,
  },
];

export default function CoursesPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-main mb-2">Workshop Courses</h1>
        <p className="text-slate-600 mb-6">12 comprehensive workshops to transform your business</p>
        <div className="flex justify-center md:justify-start">
          <VoiceAssistant />
        </div>
      </div>

      <div className="grid gap-6">
        {courses.map((course) => (
          <Link
            key={course.id}
            to={`/dashboard/courses/${course.id}`}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-brand-accent"
          >
            <div className="flex items-start gap-6">
              <div className="bg-brand-accent text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl flex-shrink-0">
                {course.id}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-brand-main group-hover:text-brand-accent">
                    {course.title}
                  </h3>
                  {course.completed && (
                    <CheckCircle2 className="text-green-600 flex-shrink-0" size={24} />
                  )}
                </div>

                <p className="text-slate-600 mb-4 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock size={16} />
                    <span>{course.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-brand-accent font-semibold">
                    <Play size={16} />
                    <span>{course.completed ? 'Watch Again' : 'Start Course'}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}
