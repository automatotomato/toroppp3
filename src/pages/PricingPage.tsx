import { Link } from 'react-router-dom';
import { Award, CheckCircle2, Star, ArrowRight, Phone, Mail, Globe, Sparkles } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <header className="bg-slate-900 py-4 sticky top-0 z-50 shadow-lg border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <Award className="text-red-600" size={32} />
            <span className="text-white font-bold text-xl">Advancement Academy</span>
          </Link>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="text-white hover:text-red-400 font-semibold transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <section className="py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Choose Your Membership
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Select the plan that best fits your franchise growth goals
            </p>
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-8 mb-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="text-white" size={32} />
              <h2 className="text-3xl font-bold">Toro Con Exclusive Offer</h2>
            </div>
            <p className="text-xl mb-6">
              Limited-Time Registration: <span className="line-through opacity-75">$3,000</span>{' '}
              <span className="text-4xl font-bold">$299</span> Lifetime Access
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 max-w-3xl mx-auto">
              <p className="text-lg mb-2">
                <strong>BONUS:</strong> Includes Complete Business Analysis Assessment
              </p>
              <p className="text-sm opacity-90">(Valued at $9,995) - Uncover blind spots and get a customized roadmap</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-8 text-white text-center">
                <h3 className="text-3xl font-bold mb-2">Toro Con Special</h3>
                <div className="text-5xl font-bold mb-2">$299</div>
                <div className="text-slate-300">One-time payment</div>
                <div className="mt-4 bg-amber-500 text-white px-4 py-2 rounded-full inline-block text-sm font-bold">
                  LIFETIME ACCESS
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {[
                    'All 12 workshop courses (24 hours)',
                    'Complete video library',
                    'Town Hall recordings',
                    'Full podcast library access',
                    'Weekly tips & insights',
                    'Complete Business Analysis ($9,995 value)',
                    'Lifetime platform access',
                    'All future updates included',
                    'Priority support',
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register?plan=lifetime"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Claim This Offer
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white text-center">
                <h3 className="text-3xl font-bold mb-2">Essentials</h3>
                <div className="text-5xl font-bold mb-2">$129</div>
                <div className="text-blue-100">per month</div>
                <div className="mt-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full inline-block text-sm font-semibold">
                  CLASSES ONLY
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {[
                    'All 12 classes (2 hours each)',
                    'Access to course recordings',
                    'Basic course materials',
                    'Email support',
                    'Mobile & desktop access',
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register?plan=essentials"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Get Started
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-red-600 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                MOST POPULAR
              </div>
              <div className="bg-gradient-to-br from-red-600 to-red-700 p-8 text-white text-center">
                <h3 className="text-3xl font-bold mb-2">Elite</h3>
                <div className="text-5xl font-bold mb-2">$499</div>
                <div className="text-red-100">per month</div>
                <div className="mt-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full inline-block text-sm font-semibold">
                  EVERYTHING INCLUDED
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {[
                    'All 12 classes (2 hours each)',
                    '12 Town Hall sessions (2 hours)',
                    'Complete video recordings library',
                    'Full podcast library (English & Spanish)',
                    'Weekly tips & best practices',
                    'Downloadable resources & templates',
                    'Priority support & coaching',
                    'Private community access',
                    'Quarterly strategy sessions',
                    'Advanced analytics & reports',
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="text-red-600 flex-shrink-0 mt-1" size={20} />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register?plan=elite"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Get Elite Access
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-300 mb-6 text-lg">
              All plans include per-office access. Team members can share login credentials.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-slate-300">
              <Star className="text-amber-400 fill-amber-400" size={24} />
              <span className="font-semibold">4.9/5 rating from 500+ franchise owners</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900 border-t border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Questions? Get in Touch</h2>
            <p className="text-slate-400">Our team is here to help you choose the right plan</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="tel:9154901889"
              className="bg-slate-800 hover:bg-slate-700 rounded-xl p-6 text-center transition-all border border-slate-700 hover:border-red-600"
            >
              <Phone className="text-red-600 mx-auto mb-3" size={32} />
              <div className="text-white font-semibold mb-1">Call Us</div>
              <div className="text-slate-300">(915) 490-1889</div>
            </a>

            <a
              href="mailto:ricky@3-peak.com"
              className="bg-slate-800 hover:bg-slate-700 rounded-xl p-6 text-center transition-all border border-slate-700 hover:border-red-600"
            >
              <Mail className="text-red-600 mx-auto mb-3" size={32} />
              <div className="text-white font-semibold mb-1">Email Us</div>
              <div className="text-slate-300">ricky@3-peak.com</div>
            </a>

            <a
              href="https://www.3-peak.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 rounded-xl p-6 text-center transition-all border border-slate-700 hover:border-red-600"
            >
              <Globe className="text-red-600 mx-auto mb-3" size={32} />
              <div className="text-white font-semibold mb-1">Visit Website</div>
              <div className="text-slate-300">www.3-peak.com</div>
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <Award className="text-red-600" size={36} />
              <span className="text-white font-bold text-xl">Advancement Academy</span>
            </div>
            <p className="text-slate-400 text-center">
              Delivered by Peak Performance Partners<br />
              <a href="https://www.3-peak.com" className="hover:text-red-400 transition-colors">www.3-peak.com</a> |
              <a href="https://www.torotaxes.com" className="hover:text-red-400 transition-colors ml-2">www.torotaxes.com</a>
            </p>
            <div className="text-center text-slate-400 text-sm border-t border-slate-800 pt-8 w-full">
              <p>&copy; 2025 Peak Performance Partners | All Rights Reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
