import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CreditCard, Shield, ArrowLeft, Loader2, CheckCircle2, Users, BookOpen, Clock } from 'lucide-react';
import { STRIPE_PRODUCTS, formatPrice, StripeProduct } from '../stripe-config';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import LearningTimeline from '../components/charts/LearningTimeline';

export default function PaymentPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    officeName: '',
    password: '',
  });

  const plan = searchParams.get('plan') || 'subscription';
  const selectedProduct = plan === 'promo' ? STRIPE_PRODUCTS.registration : STRIPE_PRODUCTS[plan as keyof typeof STRIPE_PRODUCTS];

  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({ ...prev, email: user.email || '' }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePayment = async () => {
    if (!selectedProduct) return;

    setLoading(true);
    try {
      // Create account with user data
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            office_name: formData.officeName,
          },
        },
      });

      if (signUpError) {
        console.error('Account creation error:', signUpError);
        alert(`Failed to create account: ${signUpError.message}`);
        return;
      }

      console.log('Account created successfully:', signUpData.user?.email);

      // Store payment record in background
      supabase
        .from('payments')
        .insert({
          email: formData.email,
          plan_type: plan,
          full_name: formData.fullName,
          office_name: formData.officeName,
          amount_paid: Math.round(selectedProduct.price * 100),
          payment_status: 'pending'
        })
        .then(() => console.log('Payment record created'))
        .catch((err) => console.error('Failed to create payment record:', err));

      // Redirect to Stripe payment link
      if (plan === 'promo') {
        window.location.href = 'https://buy.stripe.com/6oUfZj2o9eRD0ZMcQR9sk00';
      } else {
        navigate('/payment-success');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Invalid Plan</h2>
          <p className="text-gray-600 mb-4">The selected plan is not available.</p>
          <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const isPromoOffer = plan === 'promo';
  const totalFirstPayment = selectedProduct.price;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Secure Checkout</h1>
            <div className="flex items-center gap-2 text-green-600">
              <Shield size={20} />
              <span className="text-sm font-medium">SSL Secured</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Promotional Deadline Banner */}
        {isPromoOffer && (
          <div className="mb-8 relative overflow-hidden">
            <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-2xl p-8 text-center shadow-2xl border-4 border-red-400">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-4 left-4 w-32 h-32 bg-white rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 right-4 w-40 h-40 bg-white rounded-full animate-pulse"></div>
              </div>
              <div className="relative z-10">
                <div className="inline-block bg-yellow-400 text-red-900 px-6 py-2 rounded-full font-black text-sm mb-4 animate-bounce">
                  EXCLUSIVE TOROCON OFFER
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                  SAVE $3,000!
                </h2>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-white/80 text-sm mb-1">Regular Price</div>
                    <div className="text-2xl font-bold text-white line-through">$3,000</div>
                  </div>
                  <div className="text-6xl text-yellow-400">→</div>
                  <div className="text-center">
                    <div className="text-yellow-400 text-sm mb-1 font-bold">ToroCon Price</div>
                    <div className="text-5xl font-black text-white">$299</div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-6 border-2 border-white/20">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="text-yellow-400" size={24} />
                    <span className="text-white font-bold text-xl">Offer Expires:</span>
                  </div>
                  <div className="text-yellow-400 font-black text-3xl tracking-wider">
                    December 15, 2025
                  </div>
                  <p className="text-white/90 text-sm mt-3 font-medium">
                    Don't miss out! This incredible discount is only available for ToroCon attendees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* 12-Month Learning Path Section */}
        <div className="mb-8 max-w-6xl mx-auto">
          <LearningTimeline />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="border rounded-lg p-4 bg-blue-50">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{selectedProduct.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{selectedProduct.description}</p>
                
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>
                    {isPromoOffer ? 'Registration Fee (One-time):' : selectedProduct.mode === 'subscription' ? 'Monthly Price:' : 'One-time Payment:'}
                  </span>
                  <span className="text-blue-600">{formatPrice(selectedProduct.price)}</span>
                </div>

                {isPromoOffer && (
                  <div className="mt-2 pt-2 border-t border-blue-200">
                    <div className="flex justify-between items-center text-sm text-gray-700">
                      <span>Then monthly subscription:</span>
                      <span className="font-semibold">{formatPrice(STRIPE_PRODUCTS.subscription.price)}/mo</span>
                    </div>
                  </div>
                )}
              </div>
              
              {isPromoOffer && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400 rounded-lg p-4 shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="text-green-600" size={20} />
                    <span className="font-bold text-green-900">You're Saving $2,701 Today!</span>
                  </div>
                  <p className="text-sm text-green-800 mb-1">
                    Registration: $299 (Regular $3,000)
                  </p>
                  <p className="text-sm text-green-800">
                    Monthly: $129 (Regular $499/month)
                  </p>
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total {isPromoOffer ? 'Today' : ''}:</span>
                <span className="text-green-600">{formatPrice(totalFirstPayment)}</span>
              </div>
              {isPromoOffer && (
                <p className="text-sm text-gray-600 mt-2">
                  Your monthly subscription of {formatPrice(STRIPE_PRODUCTS.subscription.price)} will begin after registration
                </p>
              )}
              {!isPromoOffer && selectedProduct.mode === 'subscription' && (
                <p className="text-sm text-gray-600 mt-2">
                  Then {formatPrice(selectedProduct.price)}/month
                </p>
              )}
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <BookOpen size={16} />
                <span>12 Expert Workshops</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} />
                <span>90+ Hours of Training</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users size={16} />
                <span>Lifetime Access</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Office/Business Name *
                </label>
                <input
                  type="text"
                  name="officeName"
                  value={formData.officeName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your office name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Create Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Minimum 6 characters"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Create a password to access your account after payment
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !formData.fullName || !formData.email || !formData.officeName || !formData.password || formData.password.length < 6}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard size={20} />
                    Complete Payment - {formatPrice(totalFirstPayment)}
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield size={16} />
                <span>Secure payment powered by Stripe</span>
              </div>
              {isPromoOffer && (
                <p className="text-xs text-center text-green-600 font-medium">
                  You'll be redirected to Stripe for secure payment
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}