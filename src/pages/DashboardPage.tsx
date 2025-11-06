import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { BookOpen, Video, Radio, Lightbulb, FileText, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const { profile } = useAuth();

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Welcome back, {profile?.full_name}!
        </h1>
        <p className="text-slate-600">{profile?.office_name}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 text-white">
          <BookOpen size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">12</h3>
          <p className="text-red-100">Courses Available</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <TrendingUp size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">0%</h3>
          <p className="text-blue-100">Completion Rate</p>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
          <FileText size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">50+</h3>
          <p className="text-green-100">Resources Available</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/dashboard/courses"
          className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-red-600"
        >
          <BookOpen className="text-red-600 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Workshop Courses</h2>
          <p className="text-slate-600">
            Access all 12 power-packed workshops to transform your business
          </p>
        </Link>

        <Link
          to="/dashboard/town-halls"
          className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-red-600"
        >
          <Video className="text-blue-600 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Town Hall Recordings</h2>
          <p className="text-slate-600">
            Watch past town hall sessions and Q&A recordings
          </p>
        </Link>

        <Link
          to="/dashboard/podcasts"
          className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-red-600"
        >
          <Radio className="text-purple-600 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Podcasts</h2>
          <p className="text-slate-600">
            Listen to podcasts in English or Spanish
          </p>
        </Link>

        <Link
          to="/dashboard/tips"
          className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-red-600"
        >
          <Lightbulb className="text-amber-600 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Tips of the Week</h2>
          <p className="text-slate-600">
            Get weekly insights and best practices
          </p>
        </Link>

        <Link
          to="/dashboard/resources"
          className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-red-600"
        >
          <FileText className="text-green-600 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Resources & Tools</h2>
          <p className="text-slate-600">
            Download handouts, charts, graphs, and templates
          </p>
        </Link>

        <Link
          to="/dashboard/faq"
          className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-red-600"
        >
          <FileText className="text-slate-600 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">FAQ & Support</h2>
          <p className="text-slate-600">
            Get answers to frequently asked questions
          </p>
        </Link>
      </div>
    </DashboardLayout>
  );
}
