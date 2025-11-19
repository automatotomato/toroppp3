import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Lock, UserPlus, LogIn, CheckCircle2, Eye, EyeOff, AlertCircle, Check, X } from 'lucide-react';

export default function AccountSetupPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const [checkingPayment, setCheckingPayment] = useState(true);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const passwordRequirements = [
    { label: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
    { label: 'Contains uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: 'Contains lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
    { label: 'Contains number', test: (pwd: string) => /[0-9]/.test(pwd) },
    { label: 'Contains special character (!@#$%^&*)', test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
  ];

  const isPasswordValid = passwordRequirements.every(req => req.test(password));

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
      checkPaymentStatus(emailParam);
    } else {
      setCheckingPayment(false);
    }
  }, [searchParams]);

  const checkPaymentStatus = async (emailToCheck: string) => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('email', emailToCheck.toLowerCase())
        .eq('payment_status', 'completed')
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setPaymentInfo(data);
      } else {
        setError('No payment found for this email. Please complete payment first.');
      }
    } catch (err: any) {
      setError('Unable to verify payment status.');
    } finally {
      setCheckingPayment(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!paymentInfo && isSignUp) {
      setError('Payment verification required. Please complete payment first.');
      return;
    }

    if (isSignUp && !isPasswordValid) {
      setError('Please meet all password requirements.');
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        const { error: signUpError } = await signUp(
          email,
          password,
          paymentInfo.full_name,
          paymentInfo.office_name
        );
        if (signUpError) throw signUpError;
        navigate('/dashboard');
      } else {
        const { error: signInError } = await signIn(email, password);
        if (signInError) throw signInError;
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || `Failed to ${isSignUp ? 'create account' : 'sign in'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckPayment = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setCheckingPayment(true);
    setError('');
    await checkPaymentStatus(email);
  };

  if (checkingPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-main via-slate-800 to-slate-900 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Verifying payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-main via-slate-800 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center mb-6">
            <img src="/peak_performance (1).png" alt="Peak Performance Partners" className="h-32" />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isSignUp ? 'Create Your Account' : 'Welcome Back'}
          </h1>
          <p className="text-slate-400">
            {isSignUp ? 'Set up your password to access the academy' : 'Sign in to your account'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {paymentInfo && isSignUp && (
            <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-700 mb-2">
                <CheckCircle2 size={20} />
                <span className="font-semibold">Payment Verified</span>
              </div>
              <p className="text-sm text-green-600">
                {paymentInfo.full_name} - {paymentInfo.office_name}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!!paymentInfo}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-accent focus:ring-2 focus:ring-red-600/20 outline-none transition-all disabled:bg-slate-100"
                placeholder="you@example.com"
              />
              {!paymentInfo && isSignUp && (
                <button
                  type="button"
                  onClick={handleCheckPayment}
                  className="mt-2 text-sm text-brand-accent hover:text-red-700 font-semibold"
                >
                  Verify Payment
                </button>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                {!isSignUp && (
                  <Link
                    to="/forgot-password"
                    className="text-sm text-brand-accent hover:text-red-700 font-semibold"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-slate-300 focus:border-brand-accent focus:ring-2 focus:ring-red-600/20 outline-none transition-all"
                  placeholder="••••••••"
                  minLength={isSignUp ? 8 : 6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {isSignUp && password.length > 0 && (
                <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle size={16} className="text-slate-600" />
                    <span className="text-xs font-semibold text-slate-700">Password Requirements:</span>
                  </div>
                  <div className="space-y-1.5">
                    {passwordRequirements.map((req, index) => {
                      const isValid = req.test(password);
                      return (
                        <div key={index} className="flex items-center gap-2">
                          {isValid ? (
                            <Check size={14} className="text-green-600 flex-shrink-0" />
                          ) : (
                            <X size={14} className="text-slate-400 flex-shrink-0" />
                          )}
                          <span className={`text-xs ${isValid ? 'text-green-700' : 'text-slate-600'}`}>
                            {req.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || (isSignUp && !paymentInfo)}
              className="w-full bg-brand-accent hover:bg-red-900 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                isSignUp ? 'Creating Account...' : 'Signing In...'
              ) : (
                <>
                  {isSignUp ? <UserPlus size={20} /> : <LogIn size={20} />}
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-slate-600"
            >
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <span className="text-brand-accent hover:text-red-700 font-semibold">
                {isSignUp ? 'Sign in here' : 'Sign up here'}
              </span>
            </button>
          </div>

          {isSignUp && !paymentInfo && (
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800 text-center">
                Haven't paid yet?{' '}
                <Link to="/pricing" className="font-semibold text-brand-accent hover:text-red-700">
                  View pricing
                </Link>
              </p>
            </div>
          )}
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
