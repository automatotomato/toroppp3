import DashboardLayout from '../components/DashboardLayout';
import LockedContentOverlay from '../components/LockedContentOverlay';
import { isContentLocked } from '../utils/contentLock';
import { Video, Calendar, Clock, Users, Play, Eye } from 'lucide-react';

export default function DashboardTownHallsPage() {
  const contentLocked = isContentLocked();
  const townHalls = [
    {
      id: 1,
      title: 'Q4 2025 Strategy & Planning Session',
      description: 'Join us for an in-depth discussion about Q4 strategies, tax season preparation, and business planning for the upcoming year.',
      date: 'November 15, 2025',
      duration: '1 hr 45 min',
      attendees: 156,
      views: 892,
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'Upcoming',
      topics: ['Tax Season Prep', 'Q4 Strategy', 'Planning']
    },
    {
      id: 2,
      title: 'Advanced Marketing Tactics for 2026',
      description: 'Discover cutting-edge marketing strategies to attract and retain clients in the competitive tax services market.',
      date: 'October 28, 2025',
      duration: '2 hrs',
      attendees: 243,
      views: 1547,
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'Recent',
      topics: ['Marketing', 'Client Acquisition', 'Digital Strategy']
    },
    {
      id: 3,
      title: 'Financial Management Best Practices',
      description: 'Learn from top-performing franchise owners about cash flow management, profitability, and financial planning.',
      date: 'October 14, 2025',
      duration: '1 hr 30 min',
      attendees: 198,
      views: 2103,
      thumbnail: 'https://images.pexels.com/photos/6772076/pexels-photo-6772076.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'Recent',
      topics: ['Finance', 'Cash Flow', 'Profitability']
    },
    {
      id: 4,
      title: 'Team Building & Leadership Excellence',
      description: 'Master the art of building high-performing teams and developing leadership skills that inspire greatness.',
      date: 'September 30, 2025',
      duration: '1 hr 50 min',
      attendees: 187,
      views: 1876,
      thumbnail: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'Archive',
      topics: ['Leadership', 'Team Building', 'Culture']
    },
    {
      id: 5,
      title: 'Technology & Automation Workshop',
      description: 'Explore the latest tools and technologies to streamline operations and enhance productivity in your practice.',
      date: 'September 16, 2025',
      duration: '2 hrs 15 min',
      attendees: 215,
      views: 2456,
      thumbnail: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'Archive',
      topics: ['Technology', 'Automation', 'Efficiency']
    },
    {
      id: 6,
      title: 'Client Retention Strategies That Work',
      description: 'Transform one-time clients into lifelong customers with proven retention strategies and loyalty programs.',
      date: 'September 2, 2025',
      duration: '1 hr 40 min',
      attendees: 201,
      views: 1923,
      thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'Archive',
      topics: ['Retention', 'Loyalty', 'Customer Success']
    },
  ];

  const typeColors = {
    Upcoming: 'bg-green-100 text-green-700 border-green-300',
    Recent: 'bg-blue-100 text-blue-700 border-blue-300',
    Archive: 'bg-slate-100 text-slate-700 border-slate-300'
  };

  return (
    <DashboardLayout>
      <LockedContentOverlay isLocked={contentLocked}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-main mb-2">Town Hall Recordings</h1>
        <p className="text-slate-600">
          Watch live sessions, Q&A recordings, and expert discussions from franchise leadership
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <Video size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">24</h3>
          <p className="text-blue-100">Total Recordings</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
          <Users size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">1,200+</h3>
          <p className="text-green-100">Total Attendees</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <Clock size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">42 hrs</h3>
          <p className="text-purple-100">Content Available</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {townHalls.map((townHall) => (
          <div
            key={townHall.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={townHall.thumbnail}
                alt={townHall.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white rounded-full p-4 shadow-2xl">
                  <Play className="text-brand-accent" size={32} />
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${typeColors[townHall.type as keyof typeof typeColors]}`}>
                  {townHall.type}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-brand-main mb-2 line-clamp-2 group-hover:text-brand-accent transition-colors">
                {townHall.title}
              </h3>
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">{townHall.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {townHall.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {new Date(townHall.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {townHall.duration}
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <Eye size={16} />
                  {townHall.views.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-3">Never Miss a Town Hall</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Town halls are held monthly. Join live to ask questions and engage with leadership and fellow franchise owners.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors">
          View Upcoming Schedule
        </button>
      </div>
      </LockedContentOverlay>
    </DashboardLayout>
  );
}
