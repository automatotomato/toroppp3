import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PaymentPage from './pages/PaymentPage';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import CoursesListPage from './pages/CoursesListPage';
import FAQPage from './pages/FAQPage';
import ComingSoonPage from './pages/ComingSoonPage';
import PricingPage from './pages/PricingPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/courses" element={<CoursesListPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/courses"
            element={
              <ProtectedRoute>
                <CoursesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/courses/:courseId"
            element={
              <ProtectedRoute>
                <CourseDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/faq"
            element={
              <ProtectedRoute>
                <FAQPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/town-halls"
            element={
              <ProtectedRoute>
                <ComingSoonPage
                  title="Town Hall Recordings"
                  description="Access to past town hall sessions coming soon"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/podcasts"
            element={
              <ProtectedRoute>
                <ComingSoonPage
                  title="Podcasts"
                  description="Bilingual podcast content coming soon"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/tips"
            element={
              <ProtectedRoute>
                <ComingSoonPage
                  title="Tips of the Week"
                  description="Weekly insights and best practices coming soon"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/resources"
            element={
              <ProtectedRoute>
                <ComingSoonPage
                  title="Resources & Tools"
                  description="Download center for templates and materials coming soon"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
