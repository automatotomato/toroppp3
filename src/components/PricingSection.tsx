import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { STRIPE_PRODUCTS } from '../stripe-config';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export default function PricingSection() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    if (!user) {
      alert('Please sign in to purchase');
      return;
    }

    setLoading(priceId);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId, userId: user.id }
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const formatPrice = (price: number, mode: string) => {
    return mode === 'subscription' ? `$${price}/month` : `$${price}`;
  };

  return (
    <section className="py-20 bg-gray-50" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get access to the Advancement Academy and transform your Toro Tax business
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {STRIPE_PRODUCTS.map((product) => (
            <div
              key={product.priceId}
              className={`bg-white rounded-2xl shadow-lg p-8 relative ${
                product.mode === 'subscription' ? 'border-2 border-blue-500' : ''
              }`}
            >
              {product.mode === 'subscription' && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {product.mode === 'subscription' ? 'Monthly Subscription' : 'One-Time Payment'}
                </p>
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  {formatPrice(product.price, product.mode)}
                </div>
                <p className="text-sm text-gray-500">
                  {product.mode === 'subscription' ? 'Billed monthly, cancel anytime' : 'Lifetime access'}
                </p>
              </div>

              <p className="text-gray-600 mb-8">
                {product.description}
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">12 power-packed workshops</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Cash flow management training</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Sales systems and marketing</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Leadership development</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    {product.mode === 'subscription' ? 'Monthly updates and new content' : 'Complete access to all materials'}
                  </span>
                </li>
              </ul>

              <button
                onClick={() => handleCheckout(product.priceId)}
                disabled={loading === product.priceId}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  product.mode === 'subscription'
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
              >
                {loading === product.priceId ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Get Started ${product.mode === 'subscription' ? '- Monthly' : '- One Time'}`
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}