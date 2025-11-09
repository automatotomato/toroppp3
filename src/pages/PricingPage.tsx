import { Link } from 'react-router-dom';
import { Award, CheckCircle2, Star, ArrowRight, Phone, Mail, Globe, Sparkles, Zap } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-main to-slate-800">
      <header className="bg-brand-main py-4 sticky top-0 z-50 shadow-lg border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src="/peak-performance_color.png" alt="Peak Performance Partners" className="h-10" />
            
          </Link>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="text-white hover:text-brand-accent font-semibold transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register?plan=promo"
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg"
            >
              Claim Offer
            </Link>
          </div>
        </div>
      </header>

      <section className="py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-full font-bold text-lg mb-6 animate-pulse shadow-xl">
              <Zap size={24} />
              TOROCON EXCLUSIVE OFFER
              <Zap size={24} />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get Elite Access at Essentials Pricing
            </h1>
            <p className="text-2xl text-slate-300 max-w-4xl mx-auto">
              Pay only $129/month + $299 registration and get the full $499/month Elite Package
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-brand-accent rounded-3xl p-1 shadow-2xl">
              <div className="bg-brand-main rounded-3xl p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold mb-6">
                      <Sparkles className="text-amber-300" size={20} />
                      PROMOTIONAL PRICING
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                      Elite Package
                    </h2>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-baseline gap-3">
                        <div className="text-6xl font-bold text-amber-400">$129</div>
                        <div className="text-2xl text-slate-300">/month</div>
                      </div>
                      <div className="flex items-center gap-3 text-xl">
                        <span className="text-slate-300">+</span>
                        <span className="text-3xl font-bold text-white">$299</span>
                        <span className="text-slate-300">registration fee</span>
                      </div>
                      <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-4">
                        <p className="text-red-200 text-lg font-bold">
                          Regular Price: <span className="line-through">$499/month</span>
                        </p>
                        <p className="text-green-400 text-2xl font-bold mt-2">
                          YOU SAVE $370/MONTH!
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/register?plan=promo"
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-10 py-5 rounded-full text-xl font-bold shadow-2xl transition-all transform hover:scale-105 inline-flex items-center justify-center gap-3"
                    >
                      <Zap size={28} />
                      Claim This Offer Now
                      <ArrowRight size={28} />
                    </Link>
                  </div>

                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                    <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-4 mb-6 text-center">
                      <p className="text-green-300 font-bold text-lg">Everything in Elite Package Included!</p>
                    </div>
                    <ul className="space-y-3">
                      {[
                        'All 12 workshop courses (24 hours) - LIFETIME ACCESS',
                        '12 Town Hall sessions (24 hours)',
                        'Complete video recordings library',
                        'Full podcast library (English & Spanish)',
                        'Weekly tips & best practices',
                        'Downloadable resources & templates',
                        'Complete Business Analysis ($9,995 value)',
                        'Priority support & coaching',
                        'Private community access',
                        '24/7 platform access',
                      ].map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="text-green-400 flex-shrink-0 mt-1" size={20} />
                          <span className="text-white font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Other Available Plans</h2>
              <p className="text-slate-400">Choose the option that works best for you</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-8 text-white text-center">
                  <h3 className="text-2xl font-bold mb-2">Elite</h3>
                  <div className="text-5xl font-bold mb-2">$499</div>
                  <div className="text-slate-300">per month</div>
                  <div className="mt-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full inline-block text-sm font-semibold">
                    NO REGISTRATION FEE
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-slate-600 mb-6 text-center">
                    All Elite features with no upfront registration cost
                  </p>
                  <Link
                    to="/register?plan=elite"
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    Select This Plan
                    <ArrowRight size={20} />
                  </Link>
                  <p className="text-center text-sm text-slate-500 mt-3">$499/month, billed monthly</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white text-center">
                  <h3 className="text-2xl font-bold mb-2">Essentials</h3>
                  <div className="text-5xl font-bold mb-2">$129</div>
                  <div className="text-blue-100">per month</div>
                  <div className="mt-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full inline-block text-sm font-semibold">
                    CLASSES ONLY
                  </div>
                </div>
                <div className="p-8">
                  <ul className="space-y-3 mb-6">
                    {[
                      'All 12 classes (2 hours each)',
                      'Access to course recordings',
                      'Basic course materials',
                      'Email support',
                      'Mobile & desktop access',
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                        <span className="text-slate-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/register?plan=essentials"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    Select This Plan
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-300 mb-6 text-lg">
              All plans include per-office access. Team members can share login credentials.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-slate-300">
              <Star className="text-amber-400 fill-amber-400" size={24} />
              <span className="font-semibold">4.9/5 rating from hundreds of franchise owners</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-main border-t border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Questions? Get in Touch</h2>
            <p className="text-slate-400">Our team is here to help you choose the right plan</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="tel:9154901889"
              className="bg-slate-800 hover:bg-slate-700 rounded-xl p-6 text-center transition-all border border-slate-700 hover:border-brand-accent"
            >
              <Phone className="text-brand-accent mx-auto mb-3" size={32} />
              <div className="text-white font-semibold mb-1">Call Us</div>
              <div className="text-slate-300">(915) 490-1889</div>
            </a>

            <a
              href="mailto:ricky@3-peak.com"
              className="bg-slate-800 hover:bg-slate-700 rounded-xl p-6 text-center transition-all border border-slate-700 hover:border-brand-accent"
            >
              <Mail className="text-brand-accent mx-auto mb-3" size={32} />
              <div className="text-white font-semibold mb-1">Email Us</div>
              <div className="text-slate-300">ricky@3-peak.com</div>
            </a>

            <a
              href="https://www.3-peak.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 rounded-xl p-6 text-center transition-all border border-slate-700 hover:border-brand-accent"
            >
              <Globe className="text-brand-accent mx-auto mb-3" size={32} />
              <div className="text-white font-semibold mb-1">Visit Website</div>
              <div className="text-slate-300">www.3-peak.com</div>
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-brand-main py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center">
              <img src="/peak-performance_color.png" alt="Peak Performance Partners" className="h-12" />
            </div>
            <p className="text-slate-400 text-center">
              Delivered by Peak Performance Partners<br />
              <a href="https://www.3-peak.com" className="hover:text-brand-accent transition-colors">www.3-peak.com</a> |
              <a href="https://www.torotaxes.com" className="hover:text-brand-accent transition-colors ml-2">www.torotaxes.com</a>
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
