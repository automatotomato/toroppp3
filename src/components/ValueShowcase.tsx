import { BookOpen, Users, Mic, TrendingUp, Lightbulb, HeadphonesIcon, Award, MessageCircle, Calendar, Video, Podcast, FileText } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: '12 Workshop Courses',
    subtitle: '24 Hours - LIFETIME ACCESS',
    benefit: 'Master cash flow, sales, marketing & leadership',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: Calendar,
    title: '12 Town Hall Sessions',
    subtitle: 'Monthly Live Events',
    benefit: 'Get real-time answers from industry experts',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    icon: Video,
    title: 'Complete Video Library',
    subtitle: 'On-Demand Training',
    benefit: 'Learn at your own pace, anytime, anywhere',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    icon: Podcast,
    title: 'Full Podcast Library',
    subtitle: 'English & Spanish',
    benefit: 'Stay informed while commuting or multitasking',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    icon: Lightbulb,
    title: 'Weekly Tips & Resources',
    subtitle: 'Fresh Insights Every Week',
    benefit: 'Stay ahead with actionable strategies',
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
  },
  {
    icon: TrendingUp,
    title: 'Business Analysis',
    subtitle: '$9,995 Value Included',
    benefit: 'Identify opportunities to 3X your revenue',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600',
  },
  {
    icon: HeadphonesIcon,
    title: 'Priority Support & Coaching',
    subtitle: 'Direct Expert Access',
    benefit: 'Get personalized guidance when you need it',
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    icon: MessageCircle,
    title: 'Private Community Access',
    subtitle: 'Exclusive Network',
    benefit: 'Connect with successful franchise owners',
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-600',
  },
];

export default function ValueShowcase() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Your Complete Success System
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Everything you need to transform your tax business into a year-round profit machine
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-slate-100 hover:border-slate-200"
            >
              <div className={`${feature.bgColor} rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={feature.iconColor} size={32} />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {feature.title}
              </h3>

              <p className="text-sm font-semibold text-slate-600 mb-3">
                {feature.subtitle}
              </p>

              <div className="border-t-2 border-slate-100 pt-3">
                <p className="text-sm text-slate-700 leading-relaxed">
                  <span className="font-semibold text-emerald-600">✓</span> {feature.benefit}
                </p>
              </div>

              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-300`}></div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-3xl p-8 border-2 border-amber-200">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-3">
              <Award className="text-amber-600" size={32} />
            </div>
            <h4 className="text-2xl font-bold text-slate-900 mb-1">$16,000+</h4>
            <p className="text-slate-600 font-medium">Total Value</p>
          </div>

          <div>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-3">
              <TrendingUp className="text-green-600" size={32} />
            </div>
            <h4 className="text-2xl font-bold text-slate-900 mb-1">3X ROI</h4>
            <p className="text-slate-600 font-medium">Average Revenue Increase</p>
          </div>

          <div>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-3">
              <Users className="text-blue-600" size={32} />
            </div>
            <h4 className="text-2xl font-bold text-slate-900 mb-1">200+</h4>
            <p className="text-slate-600 font-medium">Successful Franchise Owners</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Pay Once, Access Forever</h3>
        <p className="text-slate-300 text-lg mb-4">
          Your investment today unlocks lifetime access to all course materials, ensuring you can revisit and refresh your knowledge anytime you need it.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <span className="text-green-400">✓</span>
            <span>No Content Expiration</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <span className="text-green-400">✓</span>
            <span>All Future Updates Included</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <span className="text-green-400">✓</span>
            <span>Price Locked Forever</span>
          </div>
        </div>
      </div>
    </div>
  );
}
