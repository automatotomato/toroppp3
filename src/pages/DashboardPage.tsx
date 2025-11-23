import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { BookOpen, Video, Radio, Lightbulb, FileText, TrendingUp, Clock, Play, CheckCircle } from 'lucide-react';

export default function DashboardPage() {
  const { profile } = useAuth();

  const displayName = profile?.full_name || 'Guest';
  const displayOffice = profile?.office_name || 'Welcome to the Academy';

  const recentCourses = [
    { id: 1, title: 'Building a 6-Figure Tax Business', progress: 35, duration: '8 hrs' },
    { id: 2, title: 'Marketing Strategies That Work', progress: 60, duration: '6 hrs' },
    { id: 3, title: 'Financial Management Basics', progress: 15, duration: '7 hrs' },
  ];

  const upcomingEvents = [
    { title: 'Live Town Hall Q&A', date: 'Nov 15, 2025', time: '2:00 PM PST' },
    { title: 'Advanced Sales Workshop', date: 'Nov 22, 2025', time: '3:00 PM PST' },
  ];

  const recentResources = [
    { title: 'Client Retention Checklist', type: 'PDF', downloads: 245 },
    { title: 'Tax Season Calendar 2026', type: 'Template', downloads: 389 },
    { title: 'Social Media Graphics Pack', type: 'ZIP', downloads: 156 },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-brand-main mb-2">
          Welcome back, {displayName}!
        </h1>
        <p className="text-sm md:text-base text-slate-600">{displayOffice}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
        <div className="bg-gradient-to-br from-brand-accent to-red-900 rounded-xl p-5 md:p-6 text-white">
          <BookOpen size={32} className="mb-3 md:mb-4" />
          <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">12</h3>
          <p className="text-sm md:text-base text-red-100">Courses Available</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-5 md:p-6 text-white">
          <TrendingUp size={32} className="mb-3 md:mb-4" />
          <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">37%</h3>
          <p className="text-sm md:text-base text-blue-100">Completion Rate</p>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-5 md:p-6 text-white sm:col-span-2 lg:col-span-1">
          <FileText size={32} className="mb-3 md:mb-4" />
          <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">50+</h3>
          <p className="text-sm md:text-base text-green-100">Resources Available</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-brand-main mb-3 md:mb-4 flex items-center gap-2">
            <Play size={20} className="text-brand-accent" />
            Continue Learning
          </h2>
          <div className="space-y-3 md:space-y-4">
            {recentCourses.map((course) => (
              <div key={course.id} className="border border-slate-200 rounded-lg p-3 md:p-4 hover:border-brand-accent transition-colors cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-1">
                  <h3 className="font-semibold text-sm md:text-base text-brand-main">{course.title}</h3>
                  <span className="text-xs text-slate-500 flex items-center gap-1 flex-shrink-0">
                    <Clock size={12} />
                    {course.duration}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-brand-accent to-red-600 h-full rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-600">{course.progress}%</span>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/dashboard/courses"
            className="mt-4 block text-center bg-brand-main hover:bg-slate-800 text-white py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-colors"
          >
            View All Courses
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-brand-main mb-3 md:mb-4 flex items-center gap-2">
            <Video size={20} className="text-blue-600" />
            Upcoming Events
          </h2>
          <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="border-l-4 border-blue-600 bg-blue-50 rounded-r-lg p-3 md:p-4">
                <h3 className="font-semibold text-sm md:text-base text-brand-main mb-2">{event.title}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs md:text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {event.date}
                  </span>
                  <span>{event.time}</span>
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-lg md:text-xl font-bold text-brand-main mb-3 md:mb-4 mt-6 md:mt-8 flex items-center gap-2">
            <FileText size={20} className="text-green-600" />
            Latest Resources
          </h2>
          <div className="space-y-2 md:space-y-3">
            {recentResources.map((resource, index) => (
              <div key={index} className="flex items-center justify-between gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-brand-main text-sm truncate">{resource.title}</h3>
                  <p className="text-xs text-slate-500">{resource.type} • {resource.downloads} downloads</p>
                </div>
                <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        <Link
          to="/dashboard/courses"
          className="bg-white rounded-xl shadow-lg p-5 md:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-brand-accent"
        >
          <BookOpen className="text-brand-accent mb-3 md:mb-4" size={40} />
          <h2 className="text-xl md:text-2xl font-bold text-brand-main mb-2">Workshop Courses</h2>
          <p className="text-sm md:text-base text-slate-600">
            Access all 12 power-packed workshops to transform your business
          </p>
        </Link>

        <Link
          to="/dashboard/town-halls"
          className="bg-white rounded-xl shadow-lg p-5 md:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-brand-accent"
        >
          <Video className="text-blue-600 mb-3 md:mb-4" size={40} />
          <h2 className="text-xl md:text-2xl font-bold text-brand-main mb-2">Town Hall Recordings</h2>
          <p className="text-sm md:text-base text-slate-600">
            Watch past town hall sessions and Q&A recordings
          </p>
        </Link>

        <Link
          to="/dashboard/podcasts"
          className="bg-white rounded-xl shadow-lg p-5 md:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-brand-accent"
        >
          <Radio className="text-purple-600 mb-3 md:mb-4" size={40} />
          <h2 className="text-xl md:text-2xl font-bold text-brand-main mb-2">Podcasts</h2>
          <p className="text-sm md:text-base text-slate-600">
            Listen to podcasts in English or Spanish
          </p>
        </Link>

        <Link
          to="/dashboard/tips"
          className="bg-white rounded-xl shadow-lg p-5 md:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-brand-accent"
        >
          <Lightbulb className="text-amber-600 mb-3 md:mb-4" size={40} />
          <h2 className="text-xl md:text-2xl font-bold text-brand-main mb-2">Tips of the Week</h2>
          <p className="text-sm md:text-base text-slate-600">
            Get weekly insights and best practices
          </p>
        </Link>

        <Link
          to="/dashboard/resources"
          className="bg-white rounded-xl shadow-lg p-5 md:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-brand-accent"
        >
          <FileText className="text-green-600 mb-3 md:mb-4" size={40} />
          <h2 className="text-xl md:text-2xl font-bold text-brand-main mb-2">Resources & Tools</h2>
          <p className="text-sm md:text-base text-slate-600">
            Download handouts, charts, graphs, and templates
          </p>
        </Link>

        <Link
          to="/dashboard/faq"
          className="bg-white rounded-xl shadow-lg p-5 md:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-brand-accent"
        >
          <FileText className="text-slate-600 mb-3 md:mb-4" size={40} />
          <h2 className="text-xl md:text-2xl font-bold text-brand-main mb-2">FAQ & Support</h2>
          <p className="text-sm md:text-base text-slate-600">
            Get answers to frequently asked questions
          </p>
        </Link>
      </div>
    </DashboardLayout>
  );
}
