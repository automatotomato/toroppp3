import React from 'react';
import { Check } from 'lucide-react';
import { STRIPE_PRODUCTS } from '../stripe-config';
import { useNavigate } from 'react-router-dom';

export default function PricingSection() {
  const navigate = useNavigate();

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
                onClick={() => navigate(`/payment?plan=${product.mode === 'subscription' ? 'elite' : 'essentials'}`)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  product.mode === 'subscription'
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
              >
                Get Started {product.mode === 'subscription' ? '- Monthly' : '- One Time'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}