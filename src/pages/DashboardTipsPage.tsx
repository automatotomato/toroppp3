import DashboardLayout from '../components/DashboardLayout';
import LockedContentOverlay from '../components/LockedContentOverlay';
import { isContentLocked } from '../utils/contentLock';
import { Lightbulb, TrendingUp, Calendar, Bookmark, Share2, ThumbsUp } from 'lucide-react';

export default function DashboardTipsPage() {
  const contentLocked = isContentLocked();
  const tips = [
    {
      id: 1,
      week: 'Week of Nov 11, 2025',
      title: 'Maximize Your Tax Season Revenue',
      category: 'Revenue',
      content: 'Start planning your tax season strategy now. Create a timeline for client outreach, staff training, and marketing campaigns. Early preparation leads to 40% higher revenue according to top performers.',
      keyPoints: [
        'Begin client outreach 60 days before tax season',
        'Schedule staff training sessions monthly',
        'Launch marketing campaigns in December',
        'Review and update pricing strategy'
      ],
      likes: 245,
      bookmarked: true,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 2,
      week: 'Week of Nov 4, 2025',
      title: 'Build a Referral Machine',
      category: 'Growth',
      content: 'Implement a structured referral program that rewards both the referrer and the new client. Top offices see 35% of new business from referrals with the right incentive structure.',
      keyPoints: [
        'Offer $25-50 credit for successful referrals',
        'Create referral cards for clients to share',
        'Follow up within 24 hours of referral',
        'Thank referrers personally'
      ],
      likes: 312,
      bookmarked: false,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 3,
      week: 'Week of Oct 28, 2025',
      title: 'Master Your Cash Flow',
      category: 'Finance',
      content: 'Create a 13-week cash flow forecast to anticipate seasonal fluctuations. This simple practice helps you make better decisions about hiring, marketing spend, and inventory.',
      keyPoints: [
        'Track weekly cash position religiously',
        'Build a 3-month operating reserve',
        'Negotiate payment terms with vendors',
        'Consider offering payment plans to clients'
      ],
      likes: 189,
      bookmarked: true,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      week: 'Week of Oct 21, 2025',
      title: 'Social Media Strategy for Q4',
      category: 'Marketing',
      content: 'Post consistently 3-5 times per week with a mix of educational content, client testimonials, and behind-the-scenes glimpses. Engagement increases 60% with this approach.',
      keyPoints: [
        'Create a content calendar for Q4',
        'Use video content for higher engagement',
        'Respond to comments within 2 hours',
        'Share client success stories (with permission)'
      ],
      likes: 278,
      bookmarked: false,
      gradient: 'from-orange-500 to-red-600'
    },
    {
      id: 5,
      week: 'Week of Oct 14, 2025',
      title: 'Improve Team Productivity',
      category: 'Operations',
      content: 'Hold 15-minute daily huddles to align priorities, celebrate wins, and address challenges. This simple practice increases team productivity by 25% on average.',
      keyPoints: [
        'Meet at the same time daily',
        'Keep meetings to 15 minutes max',
        'Focus on today\'s priorities only',
        'End with a motivational message'
      ],
      likes: 201,
      bookmarked: true,
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 6,
      week: 'Week of Oct 7, 2025',
      title: 'Technology Quick Wins',
      category: 'Technology',
      content: 'Automate appointment reminders and follow-ups to reduce no-shows by 70%. Use SMS and email automation tools to stay connected without manual effort.',
      keyPoints: [
        'Set up automated appointment reminders',
        'Create email sequences for follow-ups',
        'Use CRM to track client interactions',
        'Implement online scheduling'
      ],
      likes: 156,
      bookmarked: false,
      gradient: 'from-indigo-500 to-purple-600'
    },
  ];

  const categoryColors = {
    Revenue: 'bg-green-100 text-green-700 border-green-300',
    Growth: 'bg-blue-100 text-blue-700 border-blue-300',
    Finance: 'bg-purple-100 text-purple-700 border-purple-300',
    Marketing: 'bg-orange-100 text-orange-700 border-orange-300',
    Operations: 'bg-cyan-100 text-cyan-700 border-cyan-300',
    Technology: 'bg-indigo-100 text-indigo-700 border-indigo-300'
  };

  return (
    <DashboardLayout>
      <LockedContentOverlay isLocked={contentLocked}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-main mb-2">Tips of the Week</h1>
        <p className="text-slate-600">
          Weekly insights and best practices to elevate your franchise performance
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-6 text-white">
          <Lightbulb size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">52</h3>
          <p className="text-orange-100">Tips Published</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <TrendingUp size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">8.2K</h3>
          <p className="text-blue-100">Total Engagements</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
          <Bookmark size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">3</h3>
          <p className="text-green-100">Bookmarked Tips</p>
        </div>
      </div>

      <div className="space-y-6">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
          >
            <div className={`h-2 bg-gradient-to-r ${tip.gradient}`} />
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="text-slate-400" size={18} />
                    <span className="text-sm text-slate-500 font-medium">{tip.week}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[tip.category as keyof typeof categoryColors]}`}>
                      {tip.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-brand-main mb-3">{tip.title}</h3>
                  <p className="text-slate-600 text-lg leading-relaxed mb-6">{tip.content}</p>
                </div>
                <button className={`p-2 rounded-lg transition-all ${tip.bookmarked ? 'bg-brand-accent text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>
                  <Bookmark size={20} fill={tip.bookmarked ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <h4 className="font-bold text-brand-main mb-4 flex items-center gap-2">
                  <Lightbulb size={18} className="text-amber-500" />
                  Key Action Items
                </h4>
                <ul className="space-y-3">
                  {tip.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-700">
                      <div className="bg-brand-accent text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-slate-600 hover:text-brand-accent transition-colors font-semibold">
                    <ThumbsUp size={20} />
                    <span>{tip.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-600 hover:text-brand-accent transition-colors font-semibold">
                    <Share2 size={20} />
                    <span>Share</span>
                  </button>
                </div>
                <button className="bg-brand-main hover:bg-slate-800 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  Implement This
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-brand-accent to-red-900 rounded-2xl p-8 text-white text-center">
        <Lightbulb size={48} className="mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-3">Get Weekly Tips Delivered</h2>
        <p className="text-red-100 mb-6 max-w-2xl mx-auto">
          Never miss a tip! New insights are published every Monday to help you stay ahead.
        </p>
        <button className="bg-white text-brand-accent px-8 py-3 rounded-full font-bold hover:bg-red-50 transition-colors">
          Enable Email Notifications
        </button>
      </div>
      </LockedContentOverlay>
    </DashboardLayout>
  );
}
