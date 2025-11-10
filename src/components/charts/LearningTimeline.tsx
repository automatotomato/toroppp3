import { Target, TrendingUp, Zap, Users, Award, CheckCircle2 } from 'lucide-react';

export default function LearningTimeline() {
  const milestones = [
    {
      month: 'Month 1-2',
      title: 'Foundation',
      icon: Target,
      courses: ['Cashflow & Profitability', 'Financial Literacy'],
      color: 'bg-red-500',
      achieved: ['Master financial basics', 'Setup tracking systems'],
    },
    {
      month: 'Month 3-5',
      title: 'Growth',
      icon: TrendingUp,
      courses: ['Sales Systems', 'Marketing Strategies', 'Digital Marketing'],
      color: 'bg-orange-500',
      achieved: ['Launch marketing campaigns', 'Implement sales processes'],
    },
    {
      month: 'Month 6-8',
      title: 'Optimization',
      icon: Zap,
      courses: ['Customer Experience', 'Operational Excellence'],
      color: 'bg-amber-500',
      achieved: ['Optimize operations', 'Improve retention'],
    },
    {
      month: 'Month 9-10',
      title: 'Leadership',
      icon: Users,
      courses: ['Team Building', 'Tax Season Prep', 'Off-Season Development'],
      color: 'bg-purple-500',
      achieved: ['Build strong teams', 'Year-round planning'],
    },
    {
      month: 'Month 11-12',
      title: 'Mastery',
      icon: Award,
      courses: ['Leadership Skills', 'Employee Engagement'],
      color: 'bg-blue-500',
      achieved: ['Full system mastery', 'Scale with confidence'],
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
      <h3 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-6 sm:mb-8">
        12-Month Learning Path
      </h3>

      <div className="space-y-4 sm:space-y-6">
        {milestones.map((milestone, index) => {
          const Icon = milestone.icon;
          return (
            <div key={index} className="relative">
              <div className="flex gap-3 sm:gap-4 md:gap-6">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={`${milestone.color} w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white shadow-lg`}>
                    <Icon size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 sm:w-1 h-full bg-gradient-to-b from-slate-300 to-slate-200 mt-2" style={{ minHeight: '60px' }} />
                  )}
                </div>

                <div className="flex-1 pb-4 sm:pb-6 md:pb-8">
                  <div className="bg-slate-50 rounded-xl p-4 sm:p-5 md:p-6 border-2 border-slate-200 hover:border-slate-300 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3">
                      <div>
                        <div className="text-xs sm:text-sm text-slate-600 font-semibold">{milestone.month}</div>
                        <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">{milestone.title}</h4>
                      </div>
                      <div className={`${milestone.color} text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold self-start sm:self-auto`}>
                        Phase {index + 1}
                      </div>
                    </div>

                    <div className="mb-3 sm:mb-4">
                      <div className="text-xs sm:text-sm font-semibold text-slate-700 mb-2">Courses:</div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {milestone.courses.map((course, i) => (
                          <span
                            key={i}
                            className="bg-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium text-slate-700 border border-slate-300"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-700 mb-2">Outcomes:</div>
                      <div className="space-y-1">
                        {milestone.achieved.map((achievement, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 size={14} className="text-green-600 flex-shrink-0 mt-0.5 sm:w-4 sm:h-4" />
                            <span className="text-xs sm:text-sm text-slate-600">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 sm:mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 sm:p-6 text-white text-center">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Complete Transformation</div>
        <div className="text-sm sm:text-base md:text-lg">From struggling seasonal business to year-round success</div>
      </div>
    </div>
  );
}
