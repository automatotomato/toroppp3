import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Clock, CreditCard } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice } from '../stripe-config';

interface SubscriptionData {
  subscription_status: string | null;
  price_id: string | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean | null;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
}

export default function SubscriptionStatus() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching subscription:', error);
        } else if (data) {
          setSubscription(data);
        }
      } catch (error) {
        console.error('Subscription fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!subscription || !subscription.subscription_status) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <Clock className="text-yellow-600" size={20} />
          <div>
            <h3 className="font-semibold text-yellow-800">No Active Subscription</h3>
            <p className="text-sm text-yellow-700">Subscribe to access all training content</p>
          </div>
        </div>
      </div>
    );
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active':
        return {
          icon: CheckCircle2,
          color: 'green',
          text: 'Active Subscription',
          bgColor: 'bg-green-50 border-green-200',
          textColor: 'text-green-800',
          iconColor: 'text-green-600'
        };
      case 'past_due':
        return {
          icon: XCircle,
          color: 'red',
          text: 'Payment Past Due',
          bgColor: 'bg-red-50 border-red-200',
          textColor: 'text-red-800',
          iconColor: 'text-red-600'
        };
      case 'canceled':
        return {
          icon: XCircle,
          color: 'gray',
          text: 'Subscription Canceled',
          bgColor: 'bg-gray-50 border-gray-200',
          textColor: 'text-gray-800',
          iconColor: 'text-gray-600'
        };
      default:
        return {
          icon: Clock,
          color: 'yellow',
          text: 'Subscription Status Unknown',
          bgColor: 'bg-yellow-50 border-yellow-200',
          textColor: 'text-yellow-800',
          iconColor: 'text-yellow-600'
        };
    }
  };

  const statusInfo = getStatusInfo(subscription.subscription_status);
  const Icon = statusInfo.icon;
  const nextBillingDate = subscription.current_period_end 
    ? new Date(subscription.current_period_end * 1000).toLocaleDateString()
    : null;

  return (
    <div className={`${statusInfo.bgColor} border rounded-lg p-4`}>
      <div className="flex items-start gap-3">
        <Icon className={statusInfo.iconColor} size={20} />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`font-semibold ${statusInfo.textColor}`}>
              {statusInfo.text}
            </h3>
            <span className="text-sm font-medium text-gray-600">
              Advancement Academy
            </span>
          </div>
          
          <div className="space-y-1 text-sm">
            {subscription.price_id === 'price_1SRP2lP4Be5cIimOVVohq8hw' && (
              <p className={statusInfo.textColor}>
                Monthly Plan - {formatPrice(129)}
              </p>
            )}
            
            {nextBillingDate && (
              <p className={statusInfo.textColor}>
                {subscription.cancel_at_period_end 
                  ? `Expires on ${nextBillingDate}` 
                  : `Next billing: ${nextBillingDate}`}
              </p>
            )}
            
            {subscription.payment_method_brand && subscription.payment_method_last4 && (
              <div className="flex items-center gap-1 text-gray-600">
                <CreditCard size={14} />
                <span>
                  {subscription.payment_method_brand.toUpperCase()} ending in {subscription.payment_method_last4}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}