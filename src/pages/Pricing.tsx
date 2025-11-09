import React from 'react'
import { stripeProducts } from '../stripe-config'
import { CheckoutButton } from '../components/checkout/CheckoutButton'
import { Check } from 'lucide-react'

export function Pricing() {
  const subscriptionProduct = stripeProducts.find(p => p.mode === 'subscription')
  const oneTimeProduct = stripeProducts.find(p => p.mode === 'payment')

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Master cash flow, sales systems, marketing, and leadership through our comprehensive training program
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Subscription Plan */}
          {subscriptionProduct && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">Monthly Subscription</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">${subscriptionProduct.price}</span>
                  <span className="text-lg text-gray-600">/month</span>
                </div>
                <p className="mt-4 text-gray-600">{subscriptionProduct.description}</p>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">What's included:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">12 power-packed workshops</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Cash flow management training</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Sales systems optimization</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Marketing strategies</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Leadership development</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Cancel anytime</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <CheckoutButton 
                  product={subscriptionProduct} 
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* One-time Payment Plan */}
          {oneTimeProduct && (
            <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-500 p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Best Value
                </span>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">One-Time Purchase</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">${oneTimeProduct.price}</span>
                  <span className="text-lg text-gray-600"> once</span>
                </div>
                <p className="mt-4 text-gray-600">{oneTimeProduct.description}</p>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Everything included:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">12 power-packed workshops</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Cash flow management training</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Sales systems optimization</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Marketing strategies</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Leadership development</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Lifetime access</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">No recurring charges</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <CheckoutButton 
                  product={oneTimeProduct} 
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}