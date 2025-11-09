import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

export default function Success() {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<any>(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      if (!user) return;
      
      try {
        const { data } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .single();
        
        setSubscription(data);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    // Delay to allow webhook processing
    const timer = setTimeout(fetchSubscriptionData, 2000);
    return () => clearTimeout(timer);
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Processing your payment...
          </h2>
          <p className="text-gray-600">
            Please wait while we set up your account
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-lg p-12">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Welcome to the Advancement Academy! Your payment has been processed successfully.
          </p>

          {subscription && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Your Plan Details
              </h3>
              <p className="text-blue-700">
                Status: <span className="font-medium capitalize">{subscription.subscription_status}</span>
              </p>
              {subscription.subscription_status === 'active' && subscription.current_period_end && (
                <p className="text-blue-700">
                  Next billing: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
                </p>
              )}
            </div>
          )}

          <div className="space-y-4">
            <p className="text-gray-600">
              You now have access to all 12 power-packed workshops designed specifically for Toro Tax franchise owners.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
              >
                Access Your Academy
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>

          {sessionId && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Session ID: {sessionId}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}