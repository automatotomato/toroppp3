import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, BookOpen, Users, Clock, Download, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchPaymentData = async () => {
      if (!sessionId) return;

      try {
        // In a real implementation, you might fetch payment details from Stripe
        // For now, we'll show a success message
        setPaymentData({
          amount: searchParams.get('amount') || '129.00',
          plan: searchParams.get('plan') || 'subscription'
        });
      } catch (error) {
        console.error('Error fetching payment data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Confirming your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle2 className="text-green-600" size={48} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-xl text-gray-600">
            Welcome to Advancement Academy! Your journey to franchise success starts now.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                    <Mail className="text-blue-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Check Your Email</h3>
                    <p className="text-sm text-gray-600">
                      You'll receive login credentials and access instructions within 5 minutes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                    <BookOpen className="text-green-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Start Learning</h3>
                    <p className="text-sm text-gray-600">
                      Begin with Course 1: Financial Foundations for immediate impact.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                    <Users className="text-purple-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Join the Community</h3>
                    <p className="text-sm text-gray-600">
                      Connect with fellow franchise owners in our exclusive community.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Access Includes</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="text-green-600 flex-shrink-0" size={16} />
                  <span className="text-sm">12 Expert-Led Workshops</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="text-green-600 flex-shrink-0" size={16} />
                  <span className="text-sm">90+ Hours of Premium Content</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="text-green-600 flex-shrink-0" size={16} />
                  <span className="text-sm">Downloadable Resources & Tools</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="text-green-600 flex-shrink-0" size={16} />
                  <span className="text-sm">Monthly Live Q&A Sessions</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="text-green-600 flex-shrink-0" size={16} />
                  <span className="text-sm">Business Analysis Templates</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="text-green-600 flex-shrink-0" size={16} />
                  <span className="text-sm">Lifetime Platform Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white text-center mb-8">
          <h3 className="text-xl font-bold mb-2">Ready to Transform Your Business?</h3>
          <p className="text-blue-100 mb-4">
            Your training platform is being prepared. In the meantime, download our Quick Start Guide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Go to Dashboard
              <ArrowRight size={16} />
            </Link>
            <button className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              <Download size={16} />
              Download Quick Start Guide
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Questions? Need help? Contact our support team at{' '}
            <a href="mailto:info@3-peak.com" className="text-blue-600 hover:text-blue-700 font-semibold">
              info@3-peak.com
            </a>
          </p>
          <p className="text-sm text-gray-500">
            Transaction ID: {sessionId}
          </p>
        </div>
      </div>
    </div>
  );
}