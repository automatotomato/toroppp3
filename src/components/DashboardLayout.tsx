import { ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Award,
  BookOpen,
  Video,
  Radio,
  Lightbulb,
  FileText,
  HelpCircle,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Courses', href: '/dashboard/courses', icon: BookOpen },
    { name: 'Town Halls', href: '/dashboard/town-halls', icon: Video },
    { name: 'Podcasts', href: '/dashboard/podcasts', icon: Radio },
    { name: 'Weekly Tips', href: '/dashboard/tips', icon: Lightbulb },
    { name: 'Resources', href: '/dashboard/resources', icon: FileText },
    { name: 'FAQ', href: '/dashboard/faq', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/dashboard" className="flex items-center">
              <img src="/peak_performance (1).png" alt="Peak Performance Partners" className="h-10" />
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm font-semibold text-white">{profile?.full_name}</p>
                <p className="text-xs text-blue-100">{profile?.office_name}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-white hover:text-blue-100 font-semibold transition-colors"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-red-50 text-brand-accent font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50 w-full"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="flex gap-6 md:gap-8">
          <aside className="hidden md:block w-56 lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-sm p-3 md:p-4 sticky top-24">
              <div className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-lg transition-colors text-sm md:text-base ${
                        isActive
                          ? 'bg-red-50 text-brand-accent font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon size={18} className="flex-shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>
          </aside>

          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
