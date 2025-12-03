import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { BookOpen, Clock, Play, Lock, CheckCircle, TrendingUp, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Course {
  id: string;
  title: string;
  description: string;
  unlock_date: string;
  duration_minutes: number;
  lessons: number;
  category: string;
  difficulty: string;
  thumbnail_url: string;
  order_number: number;
}

interface CourseProgress {
  content_id: string;
  progress_percentage: number;
  completed: boolean;
}

export default function DashboardCoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [progress, setProgress] = useState<Map<string, CourseProgress>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
    if (user) {
      fetchProgress();
    }
  }, [user]);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('order_number', { ascending: true });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('content_progress')
        .select('*')
        .eq('content_type', 'course');

      if (error) throw error;

      const progressMap = new Map<string, CourseProgress>();
      data?.forEach((item) => {
        progressMap.set(item.content_id, {
          content_id: item.content_id,
          progress_percentage: item.progress_percentage,
          completed: item.completed,
        });
      });
      setProgress(progressMap);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const isLocked = (unlockDate: string) => {
    return new Date(unlockDate) > new Date();
  };

  const formatUnlockDate = (unlockDate: string) => {
    return new Date(unlockDate).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-600">Loading courses...</div>
        </div>
      </DashboardLayout>
    );
  }

  const categoryColors = {
    Financial: 'bg-blue-100 text-blue-700 border-blue-200',
    Growth: 'bg-green-100 text-green-700 border-green-200',
    Operations: 'bg-purple-100 text-purple-700 border-purple-200',
    Leadership: 'bg-orange-100 text-orange-700 border-orange-200',
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-main mb-2">Workshop Courses</h1>
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
          <p className="text-slate-800 leading-relaxed mb-4">
            <strong className="text-brand-main">Welcome to the Advancement Academy</strong> — your journey to Achieve Success Faster starts soon!
          </p>
          <p className="text-slate-700 leading-relaxed">
            All 12 training courses are currently locked and will automatically unlock on their scheduled live dates, beginning with your <strong>Onboarding Session on December 16th, 11:00 AM – 1:00 PM PST</strong>.
          </p>
          <p className="text-slate-700 leading-relaxed mt-4">
            Get ready to elevate your business with powerful tools, expert strategies, and proven systems designed to help you grow, scale, and lead at the next level.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-brand-accent to-red-900 rounded-xl p-6 text-white text-center">
          <BookOpen size={32} className="mx-auto mb-2" />
          <div className="text-3xl font-bold mb-1">{courses.length}</div>
          <div className="text-red-100 text-sm">Total Courses</div>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white text-center">
          <Lock size={32} className="mx-auto mb-2" />
          <div className="text-3xl font-bold mb-1">{courses.filter(c => isLocked(c.unlock_date)).length}</div>
          <div className="text-blue-100 text-sm">Locked Courses</div>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white text-center">
          <CheckCircle size={32} className="mx-auto mb-2" />
          <div className="text-3xl font-bold mb-1">{courses.filter(c => !isLocked(c.unlock_date)).length}</div>
          <div className="text-green-100 text-sm">Available Courses</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const locked = isLocked(course.unlock_date);
          const courseProgress = progress.get(course.id);
          const progressPercent = courseProgress?.progress_percentage || 0;
          const isCompleted = courseProgress?.completed || false;

          return (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {locked && (
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white/90 p-4 rounded-full">
                      <Lock className="text-slate-700" size={48} />
                    </div>
                  </div>
                )}
                {isCompleted && (
                  <div className="absolute top-4 left-4">
                    <div className="bg-green-500 p-2 rounded-full">
                      <CheckCircle className="text-white" size={20} />
                    </div>
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
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-main mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {formatDuration(course.duration_minutes)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Play size={16} />
                    {course.lessons} lesson{course.lessons !== 1 ? 's' : ''}
                  </span>
                </div>

                {!locked && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-600 font-medium">Progress</span>
                      <span className="text-xs text-slate-600 font-semibold">{progressPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-brand-accent to-red-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}

                {locked && (
                  <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-start gap-2 text-xs text-slate-600">
                      <Calendar size={14} className="mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-700 mb-1">Unlocks on:</div>
                        <div>{formatUnlockDate(course.unlock_date)}</div>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    locked
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-brand-main hover:bg-slate-800 text-white'
                  }`}
                  disabled={locked}
                >
                  {locked ? 'Locked' : isCompleted ? 'Review Course' : progressPercent > 0 ? 'Continue Course' : 'Start Course'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
