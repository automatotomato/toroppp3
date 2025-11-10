import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Award, CreditCard, CheckCircle2, AlertCircle, Sparkles, Mail, User, Building2 } from 'lucide-react';

const plans = {
  promo: { name: 'Elite Package - Promotional Pricing', price: 299, recurring: 129, billing: '$299 today + $129/month' },
  essentials: { name: 'Essentials', price: 129, recurring: 129, billing: '$129/month' },
  elite: { name: 'Elite - Standard Pricing', price: 499, recurring: 499, billing: '$499/month' },
};

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [officeName, setOfficeName] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const planType = (searchParams.get('plan') || 'promo') as keyof typeof plans;
  const selectedPlan = plans[planType];

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: insertError } = await supabase
        .from('payments')
        .insert({
          email: email.toLowerCase(),
          plan_type: planType,
          full_name: fullName,
          office_name: officeName,
          amount_paid: selectedPlan.price * 100,
          payment_status: 'completed',
          paid_at: new Date().toISOString(),
        });

      if (insertError) throw insertError;

      setShowSuccess(true);
      setTimeout(() => {
        navigate(`/account-setup?email=${encodeURIComponent(email)}`);
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-main via-slate-800 to-slate-900 flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-12 text-center">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-green-600" size={48} />
          </div>
          <h2 className="text-3xl font-bold text-brand-main mb-4">
            Payment Successful!
          </h2>
          <p className="text-lg text-slate-700 mb-6">
            Your payment has been processed. Next, create your account to access all courses and resources.
          </p>
          <p className="text-slate-600">
            Redirecting to account setup...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-main via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center mb-8">
            <img src="/peak_performance (1).png" alt="Peak Performance Partners" className="h-48" />
          </div>
          {planType === 'promo' && (
            <div className="mb-8 inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl">
              <div className="text-sm font-semibold uppercase tracking-wide mb-1">Limited Time Offer</div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">
                <span className="line-through opacity-75 text-2xl">$3,000</span>
                {' '}<span className="text-5xl">$299</span>
              </div>
              <div className="text-lg font-semibold">Save $2,701 on Registration!</div>
            </div>
          )}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">Complete Your Enrollment</h1>
          <p className="text-slate-400">One step away from transforming your business</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-800 rounded-2xl p-8 text-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">What's Included</h2>
            <div className="space-y-4">
              {[
                'Access to all 12 workshop courses',
                'Complete video library with recordings',
                'Town Hall recordings and Q&A sessions',
                'Bilingual podcast content (English & Spanish)',
                'Weekly tips and best practices',
                'Downloadable resources and templates',
                'Tools, charts, and graphs',
                'CBA results tracking',
                'Community support and networking',
                'Lifetime updates and new content',
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-brand-accent flex-shrink-0 mt-1" size={20} />
                  <span className="text-slate-200">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-brand-main rounded-xl">
              <div className="flex items-center gap-2 text-amber-400 mb-3">
                <AlertCircle size={20} />
                <span className="font-semibold">Important Note</span>
              </div>
              <p className="text-slate-300 text-sm">
                This membership is per office. All team members in your office can share access using the same login credentials.
                Individual memberships are available for separate access.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-brand-main mb-2">Payment Details</h2>
            </div>

            {planType === 'promo' && (
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl p-6 mb-6 text-white text-center">
                <Sparkles className="mx-auto mb-2" size={32} />
                <div className="font-bold text-lg sm:text-xl mb-2">🔥 Promotional Offer</div>
                <div className="text-sm opacity-90 mb-2">
                  <span className="font-bold text-base">Registration: $3,000 → $299</span>
                </div>
                <div className="text-sm opacity-90">Save $370/month • Includes $9,995 Business Analysis</div>
              </div>
            )}

            <div className="bg-slate-50 rounded-xl p-6 mb-8">
              <div className="mb-4">
                <span className="text-slate-700 font-semibold text-lg">{selectedPlan.name}</span>
              </div>
              <div className="border-t border-slate-200 pt-4">
                {planType === 'promo' && (
                  <div className="mb-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-500 line-through text-sm">Regular Price</span>
                      <span className="text-slate-500 line-through text-xl">$3,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-green-700 font-bold">Special Promo Price</span>
                      <span className="text-green-700 font-bold text-2xl">${selectedPlan.price}</span>
                    </div>
                    <div className="mt-2 text-center">
                      <span className="inline-block bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                        Save $2,701 Today!
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg text-slate-700">Registration Fee (Today)</span>
                  <span className="text-2xl font-bold text-brand-main">${selectedPlan.price}</span>
                </div>
                {selectedPlan.recurring && selectedPlan.recurring !== selectedPlan.price && (
                  <div className="flex justify-between items-center">
                    <span className="text-lg text-slate-700">Then Monthly</span>
                    <span className="text-2xl font-bold text-brand-accent">${selectedPlan.recurring}</span>
                  </div>
                )}
                <p className="text-sm text-slate-600 mt-4">{selectedPlan.billing}</p>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
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
                <p className="text-xs text-slate-500 mt-1">You'll use this email to sign in after payment</p>
              </div>

              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    id="fullName"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:border-brand-accent focus:ring-2 focus:ring-red-600/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="officeName" className="block text-sm font-semibold text-slate-700 mb-2">
                  Office Name
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    id="officeName"
                    required
                    value={officeName}
                    onChange={(e) => setOfficeName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:border-brand-accent focus:ring-2 focus:ring-red-600/20 outline-none transition-all"
                    placeholder="Toro Tax - Las Vegas"
                  />
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-4">Payment Information</h3>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:border-brand-accent focus:ring-2 focus:ring-red-600/20 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-accent focus:ring-2 focus:ring-red-600/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-accent focus:ring-2 focus:ring-red-600/20 outline-none transition-all"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-accent hover:bg-red-900 text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Processing Payment...' : `Complete Payment - $${selectedPlan.price}`}
              </button>

              <p className="text-xs text-slate-500 text-center">
                Your payment information is secure and encrypted. By completing this purchase,
                you agree to our terms of service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
