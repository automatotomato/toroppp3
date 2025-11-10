import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Success from './pages/Success'
import LandingPage from './pages/LandingPage'
import AccountSetupPage from './pages/AccountSetupPage'
import { Signup } from './pages/Signup'
import DashboardPage from './pages/DashboardPage'
import CoursesPage from './pages/CoursesPage'
import PricingPage from './pages/PricingPage'
import PaymentPage from './pages/PaymentPage'
import PodcastsPage from './pages/PodcastsPage'
import SubscriptionBanner from './components/SubscriptionBanner'
import DashboardCoursesPage from './pages/DashboardCoursesPage'
import DashboardTownHallsPage from './pages/DashboardTownHallsPage'
import DashboardPodcastsPage from './pages/DashboardPodcastsPage'
import DashboardTipsPage from './pages/DashboardTipsPage'
import DashboardResourcesPage from './pages/DashboardResourcesPage'
import DashboardFAQPage from './pages/DashboardFAQPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return user ? <>{children}</> : <Navigate to="/account-setup" />
}

function AppContent() {
  const { user } = useAuth()

  return (
    <>
      {user && <SubscriptionBanner />}
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Navigate to="/account-setup" replace />} />
        <Route path="/register" element={<Navigate to="/account-setup" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account-setup" element={<AccountSetupPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/dashboard/courses" element={<ProtectedRoute><DashboardCoursesPage /></ProtectedRoute>} />
        <Route path="/dashboard/town-halls" element={<ProtectedRoute><DashboardTownHallsPage /></ProtectedRoute>} />
        <Route path="/dashboard/podcasts" element={<ProtectedRoute><DashboardPodcastsPage /></ProtectedRoute>} />
        <Route path="/dashboard/tips" element={<ProtectedRoute><DashboardTipsPage /></ProtectedRoute>} />
        <Route path="/dashboard/resources" element={<ProtectedRoute><DashboardResourcesPage /></ProtectedRoute>} />
        <Route path="/dashboard/faq" element={<ProtectedRoute><DashboardFAQPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App