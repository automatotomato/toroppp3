import DashboardLayout from '../components/DashboardLayout';
import LockedContentOverlay from '../components/LockedContentOverlay';
import { isContentLocked } from '../utils/contentLock';
import { BookOpen, Clock, Play, Lock, CheckCircle, TrendingUp } from 'lucide-react';

export default function DashboardCoursesPage() {
  const contentLocked = isContentLocked();
  const courses = [
    {
      id: 1,
      title: 'Building a 6-Figure Tax Business',
      description: 'Learn the fundamentals of creating a profitable tax business that generates consistent revenue.',
      duration: '8 hours',
      lessons: 12,
      progress: 35,
      category: 'Financial',
      difficulty: 'Beginner',
      locked: false,
      thumbnail: 'https://images.pexels.com/photos/6772076/pexels-photo-6772076.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Marketing Strategies That Work',
      description: 'Discover proven marketing tactics to attract and retain high-value clients throughout the year.',
      duration: '6 hours',
      lessons: 10,
      progress: 60,
      category: 'Growth',
      difficulty: 'Intermediate',
      locked: false,
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Financial Management Basics',
      description: 'Master cash flow, budgeting, and financial forecasting to ensure long-term business success.',
      duration: '7 hours',
      lessons: 14,
      progress: 15,
      category: 'Financial',
      difficulty: 'Beginner',
      locked: false,
      thumbnail: 'https://images.pexels.com/photos/7887800/pexels-photo-7887800.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      title: 'Advanced Sales Techniques',
      description: 'Elevate your sales approach with advanced techniques that close more deals and increase revenue.',
      duration: '5 hours',
      lessons: 8,
      progress: 0,
      category: 'Growth',
      difficulty: 'Advanced',
      locked: false,
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 5,
      title: 'Client Retention Mastery',
      description: 'Build lasting relationships and create systems that keep clients coming back year after year.',
      duration: '6 hours',
      lessons: 11,
      progress: 0,
      category: 'Growth',
      difficulty: 'Intermediate',
      locked: false,
      thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 6,
      title: 'Operational Excellence',
      description: 'Streamline your operations with efficient processes, systems, and automation strategies.',
      duration: '8 hours',
      lessons: 15,
      progress: 0,
      category: 'Operations',
      difficulty: 'Intermediate',
      locked: false,
      thumbnail: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 7,
      title: 'Team Building & Leadership',
      description: 'Develop leadership skills and build high-performing teams that drive business growth.',
      duration: '7 hours',
      lessons: 13,
      progress: 0,
      category: 'Leadership',
      difficulty: 'Advanced',
      locked: false,
      thumbnail: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 8,
      title: 'Tax Law Updates & Compliance',
      description: 'Stay current with the latest tax law changes and ensure your practice remains compliant.',
      duration: '5 hours',
      lessons: 9,
      progress: 0,
      category: 'Operations',
      difficulty: 'Intermediate',
      locked: false,
      thumbnail: 'https://images.pexels.com/photos/7876050/pexels-photo-7876050.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 9,
      title: 'Digital Marketing & Social Media',
      description: 'Leverage digital channels and social media to expand your reach and attract new clients.',
      duration: '6 hours',
      lessons: 10,
      progress: 0,
      category: 'Growth',
      difficulty: 'Beginner',
      locked: false,
      thumbnail: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 10,
      title: 'Scaling Your Practice',
      description: 'Learn strategies to scale your tax practice from a single location to multiple offices.',
      duration: '9 hours',
      lessons: 16,
      progress: 0,
      category: 'Leadership',
      difficulty: 'Advanced',
      locked: true,
      thumbnail: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 11,
      title: 'Customer Service Excellence',
      description: 'Create exceptional customer experiences that turn clients into brand ambassadors.',
      duration: '5 hours',
      lessons: 8,
      progress: 0,
      category: 'Operations',
      difficulty: 'Beginner',
      locked: true,
      thumbnail: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 12,
      title: 'Year-Round Revenue Strategies',
      description: 'Transform your seasonal business into a year-round revenue-generating powerhouse.',
      duration: '7 hours',
      lessons: 12,
      progress: 0,
      category: 'Financial',
      difficulty: 'Advanced',
      locked: true,
      thumbnail: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ];

  const categoryColors = {
    Financial: 'bg-blue-100 text-blue-700 border-blue-200',
    Growth: 'bg-green-100 text-green-700 border-green-200',
    Operations: 'bg-purple-100 text-purple-700 border-purple-200',
    Leadership: 'bg-orange-100 text-orange-700 border-orange-200',
  };

  return (
    <DashboardLayout>
      <LockedContentOverlay isLocked={contentLocked}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-main mb-2">Workshop Courses</h1>
        <p className="text-slate-600">
          Master every aspect of franchise ownership through our comprehensive curriculum
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-brand-accent to-red-900 rounded-xl p-6 text-white text-center">
          <BookOpen size={32} className="mx-auto mb-2" />
          <div className="text-3xl font-bold mb-1">12</div>
          <div className="text-red-100 text-sm">Total Courses</div>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white text-center">
          <TrendingUp size={32} className="mx-auto mb-2" />
          <div className="text-3xl font-bold mb-1">37%</div>
          <div className="text-blue-100 text-sm">Overall Progress</div>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white text-center">
          <CheckCircle size={32} className="mx-auto mb-2" />
          <div className="text-3xl font-bold mb-1">0</div>
          <div className="text-green-100 text-sm">Completed</div>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white text-center">
          <Clock size={32} className="mx-auto mb-2" />
          <div className="text-3xl font-bold mb-1">82</div>
          <div className="text-purple-100 text-sm">Total Hours</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
              course.locked ? 'opacity-75' : 'cursor-pointer'
            }`}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {course.locked && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Lock className="text-white" size={48} />
                </div>
              )}
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    categoryColors[course.category as keyof typeof categoryColors]
                  }`}
                >
                  {course.category}
                </span>
              </div>
              {!course.locked && course.progress > 0 && (
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-semibold text-brand-accent">
                  {course.progress}% Complete
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-brand-main mb-2 line-clamp-2">
                {course.title}
              </h3>
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">{course.description}</p>

              <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Play size={16} />
                  {course.lessons} lessons
                </span>
              </div>

              {!course.locked && course.progress > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-accent to-red-600 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  course.locked
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : course.progress > 0
                    ? 'bg-brand-accent hover:bg-red-900 text-white'
                    : 'bg-brand-main hover:bg-slate-800 text-white'
                }`}
                disabled={course.locked}
              >
                {course.locked ? 'Locked' : course.progress > 0 ? 'Continue' : 'Start Course'}
              </button>
            </div>
          </div>
        ))}
      </div>
      </LockedContentOverlay>
    </DashboardLayout>
  );
}
