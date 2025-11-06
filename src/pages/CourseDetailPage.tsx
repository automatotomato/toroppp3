import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { ArrowLeft, Play, Download, CheckCircle2 } from 'lucide-react';

const courseDetails: Record<string, any> = {
  '1': {
    title: 'Mastering Cashflow & Profitability for Tax Offices',
    description: 'Learn how to stabilize and grow your business by mastering cash flow management. This session teaches how to anticipate seasonal fluctuations, allocate resources, and improve profit margins.',
    objectives: [
      'Identify key cash flow drivers',
      'Set up simple forecasting tools',
      'Develop a profitability plan for consistent growth',
    ],
    outcomes: 'Franchise owners will gain financial clarity and control, ensuring each tax season strengthens—not strains—the business.',
    resources: [
      { name: 'Cash Flow Template', type: 'Excel' },
      { name: 'Profitability Calculator', type: 'PDF' },
      { name: 'Seasonal Planning Guide', type: 'PDF' },
    ],
  },
  '2': {
    title: 'Financial Literacy for Franchise Owners',
    description: 'Understand your financial statements, break-even points, and key ratios to make data-informed business decisions.',
    objectives: [
      'Build confidence reading P&L statements and balance sheets',
      'Learn how to assess financial performance at a glance',
      'Make smarter investment, staffing, and marketing decisions',
    ],
    outcomes: 'Owners will make smarter investment, staffing, and marketing decisions rooted in solid financial understanding.',
    resources: [
      { name: 'Financial Statement Guide', type: 'PDF' },
      { name: 'Key Ratios Cheat Sheet', type: 'PDF' },
    ],
  },
};

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const course = courseDetails[courseId || '1'] || courseDetails['1'];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link
          to="/dashboard/courses"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-red-600 font-semibold transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Courses
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white text-red-600 rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl">
              {courseId}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <div className="flex items-center gap-4 text-red-100">
                <span>90 minutes</span>
                <span>•</span>
                <span>12 lessons</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="aspect-video bg-slate-900 rounded-xl mb-8 flex items-center justify-center">
            <button className="bg-red-600 hover:bg-red-700 text-white rounded-full w-20 h-20 flex items-center justify-center transition-all transform hover:scale-110">
              <Play size={32} fill="white" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Course Description</h2>
                <p className="text-slate-700 leading-relaxed">{course.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Learning Objectives</h2>
                <ul className="space-y-3">
                  {course.objectives.map((objective: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="text-red-600 flex-shrink-0 mt-1" size={20} />
                      <span className="text-slate-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Expected Outcomes</h2>
                <p className="text-slate-700 leading-relaxed">{course.outcomes}</p>
              </div>
            </div>

            <div>
              <div className="bg-slate-50 rounded-xl p-6 sticky top-24">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Course Resources</h3>
                <div className="space-y-3">
                  {course.resources.map((resource: any, index: number) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between gap-3 bg-white p-4 rounded-lg hover:shadow-md transition-all border border-slate-200 hover:border-red-600"
                    >
                      <div className="text-left">
                        <p className="font-semibold text-slate-900 text-sm">{resource.name}</p>
                        <p className="text-xs text-slate-500">{resource.type}</p>
                      </div>
                      <Download className="text-red-600 flex-shrink-0" size={20} />
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <CheckCircle2 size={20} />
                    Mark as Complete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
