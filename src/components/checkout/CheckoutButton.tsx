import React, { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { env } from '../../config/env'
import { StripeProduct } from '../../stripe-config'
import { useAuth } from '../../contexts/AuthContext'
import { CreditCard, Loader2 } from 'lucide-react'

interface CheckoutButtonProps {
  product: StripeProduct
  className?: string
}

export function CheckoutButton({ product, className = '' }: CheckoutButtonProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!user) {
      return
    }

    setLoading(true)

    try {
      const { data: session } = await supabase.auth.getSession()
      
      if (!session.session?.access_token) {
        throw new Error('No access token available')
      }

      const response = await fetch(`${env.supabase.url}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.session.access_token}`,
        },
        body: JSON.stringify({
          price_id: product.priceId,
          mode: product.mode,
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/pricing`,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <button
        disabled
        className={`flex items-center justify-center gap-2 px-6 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed ${className}`}
      >
        <CreditCard className="w-5 h-5" />
        Sign in to purchase
      </button>
    )
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="w-5 h-5" />
          {product.mode === 'subscription' ? 'Subscribe' : 'Buy Now'} - ${product.price}
        </>
      )}
    </button>
  )
}