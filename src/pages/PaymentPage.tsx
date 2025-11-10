import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CreditCard, Shield, ArrowLeft, Loader2, CheckCircle2, Users, BookOpen, Clock } from 'lucide-react';
import { STRIPE_PRODUCTS, formatPrice, StripeProduct } from '../stripe-config';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function PaymentPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    officeName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
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
      // Store payment intent in database
      await supabase
        .from('payments')
        .insert({
          email: formData.email,
          plan_type: plan,
          full_name: formData.fullName,
          office_name: formData.officeName,
          amount_paid: Math.round(selectedProduct.price * 100),
          payment_status: 'pending'
        });

      // Send notification emails
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-payment-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          officeName: formData.officeName,
          planType: plan,
          planName: selectedProduct.name,
          amount: selectedProduct.price,
          cardNumber: formData.cardNumber,
          cardExpiry: formData.cardExpiry,
          cardCvc: formData.cardCvc
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send notifications');
      }

      // Redirect to success page
      navigate('/payment-success');
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
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-orange-400 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="text-orange-600 animate-pulse" size={20} />
                    <span className="font-bold text-orange-900">Limited Time Offer!</span>
                  </div>
                  <p className="text-sm text-orange-800 mb-2">
                    Save $370/month! Regular Elite price $499/month, now just $129/month
                  </p>
                  <p className="text-xs text-orange-700 font-semibold">
                    This exclusive promotional pricing won't last forever. Lock in your rate today!
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

              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Information</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    maxLength={19}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      required
                      maxLength={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVC *
                    </label>
                    <input
                      type="text"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      required
                      maxLength={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !formData.fullName || !formData.email || !formData.officeName || !formData.cardNumber || !formData.cardExpiry || !formData.cardCvc}
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
                <span>Secure payment processing</span>
              </div>
              <p className="text-xs text-center text-amber-600 font-medium">
                Your payment will be processed manually within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}