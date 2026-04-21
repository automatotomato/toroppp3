import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, LogIn, RefreshCw, WifiOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isConnectionError, setIsConnectionError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsConnectionError(false);
    setLoading(true);

    const { error } = await signIn(email, password);
    if (error) {
      const msg = error.message || 'Failed to sign in';
      const isNetwork = msg.includes('Unable to connect') || msg.includes('Load failed') || msg.includes('Failed to fetch');
      setIsConnectionError(isNetwork);
      setError(msg);
    } else {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-main via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center mb-6">
            <img src="/peak_performance (1).png" alt="Peak Performance Partners" className="h-16" />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Sign in to access your dashboard</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:border-brand-accent focus:ring-2 focus:ring-red-600/20 outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:border-brand-accent focus:ring-2 focus:ring-red-600/20 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className={`border px-4 py-3 rounded-lg text-sm ${isConnectionError ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-red-50 border-red-200 text-red-700'}`}>
                {isConnectionError && (
                  <div className="flex items-center gap-2 mb-1 font-semibold">
                    <WifiOff size={16} />
                    Connection Issue
                  </div>
                )}
                <p>{error}</p>
                {isConnectionError && (
                  <p className="mt-2 text-xs opacity-75">
                    If this persists, try disabling ad blockers or VPN extensions and refreshing the page.
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-accent hover:bg-red-900 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? 'Signing In...' : (
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 space-y-3 text-center">
            <Link
              to="/forgot-password"
              className="block text-slate-600 hover:text-brand-accent transition-colors text-sm"
            >
              Forgot your password?
            </Link>
            <div className="border-t border-slate-200 pt-4">
              <p className="text-slate-600">
                Don't have an account?{' '}
                <Link to="/pricing" className="text-brand-accent hover:text-red-700 font-semibold">
                  Get Started
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-slate-400 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
