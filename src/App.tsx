import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Success from './pages/Success'
import LandingPage from './pages/LandingPage'
import AccountSetupPage from './pages/AccountSetupPage'
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
        <Route path="/account-setup" element={<AccountSetupPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/courses" element={<DashboardCoursesPage />} />
        <Route path="/dashboard/town-halls" element={<DashboardTownHallsPage />} />
        <Route path="/dashboard/podcasts" element={<DashboardPodcastsPage />} />
        <Route path="/dashboard/tips" element={<DashboardTipsPage />} />
        <Route path="/dashboard/resources" element={<DashboardResourcesPage />} />
        <Route path="/dashboard/faq" element={<DashboardFAQPage />} />
      </Routes>
    </Router>
  )
}

export default App