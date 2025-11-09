import React from 'react';
import { Crown, Calendar } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';
import { getProductByPriceId } from '../stripe-config';

export default function SubscriptionBanner() {
  const { subscription, loading } = useSubscription();

  if (loading || !subscription) return null;

  const product = getProductByPriceId(subscription.price_id);
  const isActive = subscription.subscription_status === 'active';

  return (
    <div className={`px-6 py-3 ${
      isActive ? 'bg-green-50 border-b border-green-200' : 'bg-yellow-50 border-b border-yellow-200'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Crown className={`w-5 h-5 ${isActive ? 'text-green-600' : 'text-yellow-600'}`} />
          <span className={`font-medium ${isActive ? 'text-green-800' : 'text-yellow-800'}`}>
            {product?.name || 'Advancement Academy'} - {subscription.subscription_status === 'active' ? 'Active' : subscription.subscription_status}
          </span>
        </div>
        
        {isActive && subscription.current_period_end && (
          <div className="flex items-center space-x-2 text-sm text-green-700">
            <Calendar className="w-4 h-4" />
            <span>
              Next billing: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}