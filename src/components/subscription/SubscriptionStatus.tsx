import React from 'react'
import { useSubscription } from '../../hooks/useSubscription'
import { CheckCircle, Clock, XCircle, Loader2 } from 'lucide-react'

export function SubscriptionStatus() {
  const { subscription, loading, activePlan } = useSubscription()

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-gray-600">
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading subscription...
      </div>
    )
  }

  if (!subscription || !activePlan) {
    return (
      <div className="flex items-center gap-2 text-gray-600">
        <XCircle className="w-4 h-4" />
        No active subscription
      </div>
    )
  }

  const getStatusIcon = () => {
    switch (activePlan.status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'trialing':
        return <Clock className="w-4 h-4 text-blue-500" />
      case 'past_due':
        return <XCircle className="w-4 h-4 text-yellow-500" />
      case 'canceled':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusText = () => {
    switch (activePlan.status) {
      case 'active':
        return 'Active'
      case 'trialing':
        return 'Trial'
      case 'past_due':
        return 'Past Due'
      case 'canceled':
        return 'Canceled'
      default:
        return activePlan.status
    }
  }

  return (
    <div className="flex items-center gap-2">
      {getStatusIcon()}
      <span className="text-sm font-medium">
        {activePlan.name} - {getStatusText()}
      </span>
    </div>
  )
}