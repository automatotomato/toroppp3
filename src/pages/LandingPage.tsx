import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {  ArrowRight, CheckCircle2, BookOpen, Users, TrendingUp, Award, Play, DollarSign, Target, Zap, Clock, BarChart3, Star, MessageSquare, Shield, Sparkles, X, ChevronDown, ChevronUp } from 'lucide-react';
import LanguageToggle from '../components/LanguageToggle';
import VoiceAssistant from '../components/VoiceAssistant';
import { useLanguage } from '../contexts/LanguageContext';
import RevenueGrowthChart from '../components/charts/RevenueGrowthChart';
import ClientRetentionChart from '../components/charts/ClientRetentionChart';
import ProfitMarginChart from '../components/charts/ProfitMarginChart';
import ROICalculator from '../components/charts/ROICalculator';
import SuccessMetrics from '../components/charts/SuccessMetrics';
import LearningTimeline from '../components/charts/LearningTimeline';

export default function LandingPage() {
  const { t } = useLanguage();
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<string | null>(null);

  const courses = [
    { number: 1, title: t('courses.course1') },
    { number: 2, title: t('courses.course2') },
    { number: 3, title: t('courses.course3') },
    { number: 4, title: t('courses.course4') },
    { number: 5, title: t('courses.course5') },
    { number: 6, title: t('courses.course6') },
    { number: 7, title: t('courses.course7') },
    { number: 8, title: t('courses.course8') },
    { number: 9, title: t('courses.course9') },
    { number: 10, title: t('courses.course10') },
    { number: 11, title: t('courses.course11') },
    { number: 12, title: t('courses.course12') },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPromoModal(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {showPromoModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300 overflow-y-auto">
          <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-brand-accent rounded-3xl p-1 max-w-4xl w-full shadow-2xl animate-in zoom-in duration-300 my-8">
            <div className="bg-brand-main rounded-3xl p-6 md:p-8 relative max-h-[85vh] overflow-y-auto">
              <button
                onClick={() => setShowPromoModal(false)}
                className="sticky top-0 right-0 float-right bg-slate-800 hover:bg-brand-accent text-white p-2 rounded-full transition-colors shadow-lg z-10"
              >
                <X size={24} />
              </button>

              <div className="text-center mb-6 clear-both">
                <div className="inline-flex items-center gap-2 bg-amber-500 px-4 py-2 rounded-full mb-4 animate-pulse shadow-xl">
                  <Sparkles size={20} className="text-white" />
                  <span className="font-bold text-base md:text-lg text-white">{t('modal.exclusive')}</span>
                  <Sparkles size={20} className="text-white" />
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
                  {t('modal.title')}
                </h2>
                <p className="text-base md:text-lg text-slate-300 mb-4">
                  {t('modal.subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-slate-400 mb-1 text-sm">Regular Elite Price</div>
                    <div className="text-3xl font-bold text-red-300 line-through">$499/month</div>
                  </div>
                  <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-4 text-center">
                    <div className="text-green-300 mb-1 font-semibold text-sm">Promotional Price</div>
                    <div className="text-4xl font-bold text-green-400">$129/mo</div>
                    <div className="text-base mt-1 text-white">+ $299 registration</div>
                  </div>
                  <div className="bg-amber-500/20 border-2 border-amber-500 rounded-xl p-3 text-center">
                    <p className="text-xl text-amber-300 font-bold">SAVE $370 EVERY MONTH!</p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4">
                  <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-3 mb-3 text-center">
                    <p className="text-green-300 font-bold text-sm">{t('modal.features')}</p>
                  </div>
                  <ul className="space-y-1.5 text-white">
                    {[
                      t('modal.feature1'),
                      t('modal.feature2'),
                      t('modal.feature3'),
                      t('modal.feature4'),
                      t('modal.feature5'),
                      t('modal.feature6'),
                      t('modal.feature7'),
                      t('modal.feature8'),
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 mb-6">
                  <div className="text-center">
                    <div className="text-white text-sm font-semibold mb-1">{t('modal.totalValue')}</div>
                    <div className="text-4xl font-bold text-white mb-1">{t('modal.valueAmount')}</div>
                    <div className="text-green-100 text-sm">{t('modal.valueDesc')}</div>
                  </div>
                </div>
                <Link
                  to="/payment?plan=promo"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg md:text-xl font-bold shadow-2xl transition-all transform hover:scale-105"
                >
                  <Zap className="flex-shrink-0" size={20} />
                  <span className="text-center">{t('modal.cta')}</span>
                  <ArrowRight className="flex-shrink-0" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="bg-brand-main py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3 sm:gap-4">
            <img src="/peak_performance (1).png" alt="Peak Performance Partners" className="h-12 sm:h-16" />
            <span className="text-white text-xl sm:text-2xl font-bold">×</span>
            <img src="/idQtrRK2tN_1762721271687.png" alt="Toro Taxes" className="h-4 sm:h-5" />
          </div>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-bold shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <div className="bg-gradient-to-r from-amber-500 via-orange-600 to-brand-accent py-3 md:py-4 text-white text-center font-bold cursor-pointer hover:from-amber-600 hover:via-orange-700 hover:to-red-900 transition-all shadow-lg z-40" onClick={() => setShowPromoModal(true)}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <Sparkles size={16} className="animate-pulse flex-shrink-0" />
          <span className="text-sm sm:text-base md:text-lg lg:text-xl">
            {t('banner.exclusive')}
          </span>
          <button className="bg-white text-orange-600 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-bold hover:bg-slate-100 transition-all shadow-lg">
            View Offer
          </button>
        </div>
      </div>

      <section className="relative py-12 md:py-24 bg-gradient-to-br from-brand-main via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8 md:mb-12 flex flex-col items-center justify-center gap-4 md:gap-6">
              <img src="/peak_performance (1).png" alt="Peak Performance Partners" className="h-56 sm:h-64 md:h-80 lg:h-96" />
              <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-white">×</span>
              <img src="/idQtrRK2tN_1762721271687.png" alt="Toro Taxes" className="h-12 sm:h-16 md:h-20" />
            </div>

            <div className="max-w-4xl mx-auto">
              <p className="text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-8 text-slate-200 font-bold">
                {t('hero.title')}
              </p>
              <p className="text-base md:text-xl text-slate-300 mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto">
                {t('hero.description')}
              </p>

              <div className="mb-8 md:mb-10 flex justify-center">
                <VoiceAssistant />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-10 justify-center">
                <button
                  onClick={() => setShowPromoModal(true)}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Zap size={24} />
                  {t('hero.cta1')}
                  <ArrowRight size={24} />
                </button>
                <Link
                  to="/account-setup"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-bold border-2 border-white/30 transition-all"
                >
                  Log In
                  <Play size={20} />
                </Link>
              </div>

              <div className="flex items-center justify-center gap-6 md:gap-8 text-sm md:text-base flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-400" size={20} />
                  <span>12 Courses</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-400" size={20} />
                  <span>90+ Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-400" size={20} />
                  <span>Lifetime Access</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 max-w-5xl mx-auto">
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 text-center">
                <DollarSign className="text-green-400 mb-3 mx-auto" size={32} />
                <div className="text-4xl md:text-5xl font-bold mb-2">250%</div>
                <div className="text-slate-300 text-sm md:text-base">Average Revenue Increase</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 text-center">
                <TrendingUp className="text-blue-400 mb-3 mx-auto" size={32} />
                <div className="text-4xl md:text-5xl font-bold mb-2">85%</div>
                <div className="text-slate-300 text-sm md:text-base">Client Retention Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 text-center">
                <Users className="text-cyan-400 mb-3 mx-auto" size={32} />
                <div className="text-4xl md:text-5xl font-bold mb-2">100s</div>
                <div className="text-slate-300 text-sm md:text-base">of Successful Owners</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 text-center">
                <Award className="text-amber-400 mb-3 mx-auto" size={32} />
                <div className="text-4xl md:text-5xl font-bold mb-2">4.9/5</div>
                <div className="text-slate-300 text-sm md:text-base">Satisfaction Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-accent mb-2">12</div>
              <div className="text-slate-600 font-semibold">Expert Workshops</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-accent mb-2">90+</div>
              <div className="text-slate-600 font-semibold">Training Hours</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-accent mb-2">50+</div>
              <div className="text-slate-600 font-semibold">Resources & Tools</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-accent mb-2">24/7</div>
              <div className="text-slate-600 font-semibold">Platform Access</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-brand-accent rounded-3xl p-1 shadow-2xl">
            <div className="bg-white rounded-3xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-full mb-4 animate-pulse shadow-lg">
                  <Sparkles size={24} />
                  <span className="font-bold text-lg">{t('promo.exclusive')}</span>
                  <Sparkles size={24} />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-main mb-4">
                  {t('promo.title')}
                </h2>
                <p className="text-xl text-slate-700 mb-6">
                  Pay $299 registration + $129/month and get the full <span className="text-brand-accent font-bold">$499/month Elite Package</span>
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-100 rounded-xl p-6 text-center border-2 border-slate-300">
                  <div className="text-slate-600 mb-2 font-semibold">Regular Price</div>
                  <div className="text-4xl font-bold text-slate-400 line-through">$499</div>
                  <div className="text-sm text-slate-600">per month</div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-center text-white shadow-xl transform scale-110">
                  <div className="text-green-100 mb-2 font-semibold">Promo Price</div>
                  <div className="text-5xl font-bold">$129</div>
                  <div className="text-lg">per month</div>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-6 text-center text-white shadow-xl">
                  <div className="text-amber-100 mb-2 font-semibold">You Save</div>
                  <div className="text-5xl font-bold">$370</div>
                  <div className="text-lg">every month!</div>
                </div>
              </div>

              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-green-900 mb-4">What's Included:</h3>
                    <ul className="space-y-2">
                      {[
                        t('promo.included1'),
                        t('promo.included2'),
                        t('promo.included3'),
                        t('promo.included4'),
                      ].map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-green-900">
                          <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-900 mb-4">&nbsp;</h3>
                    <ul className="space-y-2">
                      {[
                        t('promo.included5'),
                        t('promo.included6'),
                        t('promo.included7'),
                        t('promo.included8'),
                      ].map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-green-900">
                          <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6">
                <VoiceAssistant />

                <div className="flex flex-col items-center gap-4 w-full">
                  <button
                    onClick={() => setShowPromoModal(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-full text-base sm:text-xl font-bold shadow-2xl transition-all transform hover:scale-105"
                  >
                    <Zap className="flex-shrink-0" size={24} />
                    <span className="text-center">View Full Details & Sign Up</span>
                    <ArrowRight className="flex-shrink-0" size={24} />
                  </button>

                  <div className="bg-green-50 border-2 border-green-500 rounded-xl p-3 sm:p-4 w-full sm:w-auto">
                    <p className="text-green-900 font-bold text-center text-sm sm:text-base">$16,000+ Total Value | Includes LIFETIME ACCESS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-main mb-4">
              Transform Your Business Results
            </h2>
            <div className="w-24 h-1 bg-brand-accent mx-auto mb-8"></div>
            <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto">
              See the dramatic impact our program has on franchise performance
            </p>
          </div>

          <div className="mb-16">
            <SuccessMetrics />
          </div>

          <div className="mb-16">
            <ROICalculator />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-100">
              <div className="text-center mb-6">
                <div className="inline-block bg-red-100 rounded-full p-4 mb-4">
                  <DollarSign className="text-brand-accent" size={48} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-brand-main mb-2">Revenue Growth</h3>
              </div>
              <RevenueGrowthChart />
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-100">
              <div className="text-center mb-6">
                <div className="inline-block bg-blue-100 rounded-full p-4 mb-4">
                  <Users className="text-blue-600" size={48} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-brand-main mb-2">Client Base</h3>
              </div>
              <ClientRetentionChart />
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-100">
              <div className="text-center mb-6">
                <div className="inline-block bg-purple-100 rounded-full p-4 mb-4">
                  <TrendingUp className="text-purple-600" size={48} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-brand-main mb-2">Profit Margin</h3>
              </div>
              <ProfitMarginChart />
            </div>
          </div>

          <div className="bg-gradient-to-r from-brand-accent to-red-900 rounded-3xl p-12 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('testimonials.title')}</h3>
            <p className="text-base md:text-xl text-red-100 mb-6 md:mb-8 max-w-2xl mx-auto">
              Whether you're a new franchisee or seasoned operator, transform your tax office into a year-round success story
            </p>
            <div className="mb-8 flex justify-center">
              <VoiceAssistant />
            </div>
            <Link
              to="/payment"
              className="inline-flex items-center gap-2 bg-white text-brand-accent hover:bg-slate-100 px-8 py-4 rounded-full text-lg font-bold shadow-2xl transition-all transform hover:scale-105"
            >
              Start Your Transformation
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LearningTimeline />

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: BookOpen,
                title: 'Financial Mastery',
                stat: '95%',
                label: 'Improved Cash Flow',
                description: 'Master cash flow, forecasting, and financial literacy to make data-driven decisions.',
                image: 'https://images.pexels.com/photos/6772076/pexels-photo-6772076.jpeg?auto=compress&cs=tinysrgb&w=600',
              },
              {
                icon: Users,
                title: 'Growth Systems',
                stat: '3.2x',
                label: 'Client Growth',
                description: 'Implement proven marketing, sales, and retention strategies that drive results.',
                image: 'https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=600',
              },
              {
                icon: Zap,
                title: 'Operational Excellence',
                stat: '60%',
                label: 'Time Saved',
                description: 'Leverage technology, automation, and strategic planning to scale efficiently.',
                image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600',
              },
            ].map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-slate-100 overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={highlight.image}
                      alt={highlight.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <Icon className="absolute bottom-4 left-4 text-white" size={36} />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-brand-main mb-4">{highlight.title}</h3>
                    <div className="mb-4">
                      <div className="text-4xl font-bold text-brand-accent mb-1">{highlight.stat}</div>
                      <div className="text-sm text-slate-600 font-semibold">{highlight.label}</div>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{highlight.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-main mb-6">
                Learn From Industry Experts
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Our curriculum is designed by successful franchise owners who understand the challenges you face. Every course is packed with real-world strategies you can implement immediately.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <div className="font-bold text-brand-main">Practical, Not Theoretical</div>
                    <div className="text-sm text-slate-600">Real strategies from successful operators</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <div className="font-bold text-brand-main">Self-Paced Learning</div>
                    <div className="text-sm text-slate-600">Access anytime, anywhere on any device</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <div className="font-bold text-brand-main">Community Support</div>
                    <div className="text-sm text-slate-600">Connect with fellow franchise owners</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Professional training session"
                className="rounded-2xl shadow-xl object-cover h-64 w-full"
              />
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Business collaboration"
                className="rounded-2xl shadow-xl object-cover h-64 w-full mt-8"
              />
              <img
                src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Tax office setup"
                className="rounded-2xl shadow-xl object-cover h-64 w-full -mt-8"
              />
              <img
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Modern workspace"
                className="rounded-2xl shadow-xl object-cover h-64 w-full"
              />
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-main mb-4">
              12 Power-Packed Workshops
            </h2>
            <div className="w-24 h-1 bg-brand-accent mx-auto mb-8"></div>
            <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
              Master every aspect of franchise ownership through our comprehensive curriculum
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Financial', count: 2, color: 'bg-blue-100 text-blue-700' },
              { label: 'Operations', count: 3, color: 'bg-purple-100 text-purple-700' },
              { label: 'Growth', count: 4, color: 'bg-green-100 text-green-700' },
              { label: 'Leadership', count: 3, color: 'bg-orange-100 text-orange-700' },
            ].map((category, index) => (
              <div key={index} className={`${category.color} rounded-xl p-4 text-center font-semibold`}>
                {category.count} {category.label} Courses
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.number}
                className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border-2 border-slate-200 hover:border-brand-accent hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-gradient-to-br from-brand-accent to-red-900 text-white rounded-xl w-14 h-14 flex items-center justify-center font-bold text-xl flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    {course.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-brand-main group-hover:text-brand-accent transition-colors leading-tight">
                      {course.title}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{t('courses.duration')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Play size={12} />
                    <span>Video + Resources</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-600">Progress</span>
                    <span className="text-sm font-bold text-slate-400">0%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-accent to-red-400 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 bg-brand-main hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all transform hover:scale-105"
            >
              <BookOpen size={20} />
              View Full Course Curriculum
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-main mb-4">
              Success Stories
            </h2>
            <div className="w-24 h-1 bg-brand-accent mx-auto mb-6"></div>
            <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto">
              Real results from franchise owners like you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Maria Rodriguez',
                role: 'Franchise Owner, Las Vegas',
                rating: 5,
                revenue: '+$285K',
                quote: 'Peak Performance Partners Academy gave me the confidence and tools to scale beyond tax season. My business has never been stronger.',
                image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300',
                metric: 'Revenue Growth',
              },
              {
                name: 'James Chen',
                role: 'Multi-Location Owner',
                rating: 5,
                revenue: '+420 Clients',
                quote: 'The sales and marketing systems completely transformed how we attract and retain clients. Game changer!',
                image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
                metric: 'Client Growth',
              },
              {
                name: 'Sarah Johnson',
                role: 'First-Year Franchisee',
                rating: 5,
                revenue: '38% Margin',
                quote: 'As a new owner, this program gave me the foundation I needed. I\'m profitable in my first year thanks to the Academy.',
                image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
                metric: 'Profit Margin',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-slate-200"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover shadow-lg ring-4 ring-white"
                  />
                  <div>
                    <div className="font-bold text-brand-main">{testimonial.name}</div>
                    <div className="text-sm text-slate-600">{testimonial.role}</div>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-amber-400 fill-amber-400" size={16} />
                  ))}
                </div>

                <div className="bg-white rounded-xl p-4 mb-4 border-2 border-red-100">
                  <div className="text-3xl font-bold text-brand-accent mb-1">{testimonial.revenue}</div>
                  <div className="text-sm text-slate-600 font-semibold">{testimonial.metric}</div>
                </div>

                <p className="text-slate-700 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="mb-8 flex justify-center">
              <VoiceAssistant />
            </div>
            <div className="inline-flex items-center gap-2 bg-green-50 border-2 border-green-200 rounded-full px-6 py-3 text-green-800 font-semibold">
              <Shield size={20} className="text-green-600" />
              <span>{t('testimonials.rating')}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-gradient-to-br from-brand-main via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get Started in 3 Simple Steps
            </h2>
            <div className="w-24 h-1 bg-brand-accent mx-auto mb-6"></div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Begin your transformation today
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: '1',
                icon: Users,
                title: 'Create Your Account',
                description: 'Sign up with your office details. Takes less than 60 seconds.',
                time: '1 min',
              },
              {
                step: '2',
                icon: DollarSign,
                title: 'Choose Your Plan',
                description: 'Select annual membership for full access to all courses and resources.',
                time: '2 min',
              },
              {
                step: '3',
                icon: BookOpen,
                title: 'Start Learning',
                description: 'Immediate access to your training program and begin your transformation.',
                time: '5 min',
              },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/20 hover:border-red-400 transition-all text-center">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-xl">
                      {step.step}
                    </div>
                    <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 mt-4">
                      <Icon className="text-red-400" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-slate-300 mb-4 leading-relaxed">{step.description}</p>
                    <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm">
                      <Clock size={16} />
                      <span>{step.time}</span>
                    </div>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-red-400 z-10">
                      <ArrowRight size={32} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <div className="mb-8 flex justify-center">
              <VoiceAssistant />
            </div>
            <Link
              to="/payment"
              className="inline-flex items-center justify-center gap-2 bg-brand-accent hover:bg-red-900 text-white px-6 sm:px-8 md:px-12 py-4 sm:py-5 rounded-full text-base sm:text-lg md:text-xl font-bold shadow-2xl transition-all transform hover:scale-105 w-full sm:w-auto max-w-md"
            >
              {t('cta.final')}
              <ArrowRight className="flex-shrink-0" size={24} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-gradient-to-br from-brand-accent via-red-700 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your Path to Success
            </h2>
            <p className="text-xl mb-4 text-red-100 max-w-3xl mx-auto">
              Flexible membership options to fit your growth goals
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-brand-accent rounded-3xl p-1 mb-12 max-w-5xl mx-auto shadow-2xl">
            <div className="bg-brand-main rounded-3xl p-8 text-center">
              <div className="inline-flex items-center gap-2 bg-amber-500 px-6 py-2 rounded-full mb-4 animate-pulse">
                <Sparkles size={24} />
                <span className="font-bold text-lg">TOROCON EXCLUSIVE OFFER</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-6">Get Elite for Only $129/month</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-slate-400 mb-2">Regular Elite Price</div>
                  <div className="text-4xl font-bold text-red-300 line-through">$499/month</div>
                </div>
                <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-6">
                  <div className="text-green-300 mb-2 font-semibold">Promotional Price</div>
                  <div className="text-5xl font-bold text-green-400">$129/mo</div>
                  <div className="text-lg mt-2">+ $299 registration</div>
                </div>
              </div>
              <p className="text-2xl text-green-400 font-bold mb-6">SAVE $370 EVERY MONTH!</p>
              <Link
                to="/payment?plan=promo"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-10 py-5 rounded-full text-xl font-bold shadow-2xl transition-all transform hover:scale-105"
              >
                Claim This Offer Now
                <ArrowRight size={28} />
              </Link>
              <p className="text-slate-400 mt-4 text-sm">Includes $9,995 Business Analysis • All Elite Features</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/30 text-center">
              <div className="text-4xl font-bold mb-2">$129</div>
              <div className="text-red-100 font-semibold mb-2">Essentials</div>
              <div className="text-sm text-red-200 mb-4">Monthly • Classes Only</div>
              <Link
                to="/payment?plan=essentials"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition-all inline-block"
              >
                Select Plan
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/30 text-center">
              <div className="text-4xl font-bold mb-2">$499</div>
              <div className="text-red-100 font-semibold mb-2">Elite</div>
              <div className="text-sm text-red-200 mb-4">Monthly • No Registration</div>
              <Link
                to="/payment?plan=elite"
                className="w-full bg-white/20 hover:bg-white/30 border-2 border-white text-white px-6 py-3 rounded-full font-bold transition-all inline-block"
              >
                Select Plan
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 text-white hover:text-amber-300 font-bold text-lg transition-colors mb-4"
            >
              View Full Pricing Details & Comparison
              <ArrowRight size={20} />
            </Link>
            <p className="text-red-100 text-sm">
              {t('pricing.allPlans')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-main mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-brand-accent mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to know about Advancement Academy
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                category: 'Payment & Billing',
                questions: [
                  {
                    question: 'When is my first payment due?',
                    answer: 'Your first payment is made at the time of registration. This includes your one-time Advancement Academy membership fee, which unlocks your access to the full training library and resources.',
                  },
                  {
                    question: 'When does my monthly subscription begin?',
                    answer: 'Your monthly subscription begins 30 days after registration, and renews automatically on the same day each month thereafter.',
                  },
                  {
                    question: 'How do I update my payment method?',
                    answer: 'If you need to update your credit card or payment information, please email Info@3-peak.com, and our team will send you a secure link to update your billing details safely.',
                  },
                  {
                    question: 'Will my membership price ever increase?',
                    answer: 'No. The price you start with is locked in for life. Even as new members join at higher rates or as additional features are added, your monthly rate will never change.',
                  },
                ],
              },
              {
                category: 'Access & Usage',
                questions: [
                  {
                    question: 'How do I access the classes and resources?',
                    answer: 'Once you register, you\'ll receive an email with your login credentials and step-by-step instructions for accessing the Advancement Academy online training portal. All courses are on-demand, allowing you and your team to train anytime, anywhere, and at your own pace—perfect for busy tax-season schedules.',
                  },
                  {
                    question: 'Who can access the training under my membership?',
                    answer: 'Your investment covers your entire office. Team members working within your Toro Tax franchise location can use your login to complete courses together and strengthen performance across your team.',
                  },
                  {
                    question: 'Does the cost cover per person or per office?',
                    answer: 'The membership is per office. This means your entire office can use the same login credentials to access all training materials, courses, and resources.',
                  },
                ],
              },
              {
                category: 'Membership Management',
                questions: [
                  {
                    question: 'How do I cancel my membership?',
                    answer: 'You can cancel anytime by contacting our support team at Info@3-peak.com. We\'ll guide you through a quick, no-hassle cancellation process.',
                  },
                  {
                    question: 'What happens if I cancel my subscription—can I rejoin later?',
                    answer: 'Yes, you can rejoin at any time. However, if you cancel, you will be required to pay the full $3,000 registration fee again when re-enrolling.',
                  },
                  {
                    question: 'Can I pause my membership instead of canceling?',
                    answer: 'Yes. If you need a short break—such as during the off-season—you may request to pause your membership for up to 60 days while keeping your locked-in rate.',
                  },
                  {
                    question: 'What happens after I complete the 12-month training program?',
                    answer: 'Your membership is lifetime. You\'ll continue to have access to all current and future courses, tools, and resources added to the Advancement Academy.',
                  },
                ],
              },
              {
                category: 'Content & Support',
                questions: [
                  {
                    question: 'Are the courses available in Spanish?',
                    answer: 'Currently, the main workshop content is in English, but our podcast library includes both English and Spanish versions. We are working on expanding Spanish language support across all content.',
                  },
                  {
                    question: 'Can I download the resources and materials?',
                    answer: 'Yes! All handouts, templates, charts, graphs, and tools are available for download. You can save them to your computer and use them in your business operations.',
                  },
                  {
                    question: 'What support is included with my membership?',
                    answer: 'Members have ongoing access to the Peak Performance Partners support team for help with billing, technical access, or training questions. You can reach us anytime at Info@3-peak.com.',
                  },
                ],
              },
            ].map((categoryData, catIndex) => (
              <div key={catIndex} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-brand-main to-slate-800 px-4 md:px-6 py-3 md:py-4">
                  <h3 className="text-lg md:text-xl font-bold text-white">{categoryData.category}</h3>
                </div>
                <div className="divide-y divide-slate-200">
                  {categoryData.questions.map((faq, qIndex) => {
                    const key = `${catIndex}-${qIndex}`;
                    const isOpen = openFaqIndex === key;
                    return (
                      <div key={qIndex} className="p-4 md:p-6">
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : key)}
                          className="w-full flex items-center justify-between text-left group"
                        >
                          <h4 className="text-base md:text-lg font-semibold text-brand-main group-hover:text-brand-accent transition-colors pr-4">
                            {faq.question}
                          </h4>
                          {isOpen ? (
                            <ChevronUp className="text-brand-accent flex-shrink-0" size={24} />
                          ) : (
                            <ChevronDown className="text-slate-400 group-hover:text-brand-accent flex-shrink-0 transition-colors" size={24} />
                          )}
                        </button>
                        {isOpen && (
                          <div className="mt-3 md:mt-4 text-sm md:text-base text-slate-700 leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
            <MessageSquare className="text-blue-600 mx-auto mb-4" size={40} />
            <h3 className="text-xl md:text-2xl font-bold text-brand-main mb-2">Still have questions?</h3>
            <p className="text-slate-600 mb-6">
              Contact our support team or try our AI voice assistant
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:info@3-peak.com"
                className="inline-flex items-center justify-center gap-2 bg-brand-accent hover:bg-red-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Email Support
              </a>
              <VoiceAssistant />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-main mb-4">
              Transform Your Office Into a Success Story
            </h2>
            <div className="w-24 h-1 bg-brand-accent mx-auto mb-6"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join hundreds of franchise owners who have revolutionized their businesses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Professional tax office"
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="text-2xl font-bold mb-2">Professional Environment</div>
                  <div className="text-sm">Create a workspace that inspires confidence</div>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Team collaboration"
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="text-2xl font-bold mb-2">Build Strong Teams</div>
                  <div className="text-sm">Develop leaders who drive results</div>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Business growth"
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="text-2xl font-bold mb-2">Achieve Your Goals</div>
                  <div className="text-sm">Turn your vision into reality</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/payment"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-brand-accent to-red-900 hover:from-red-900 hover:to-brand-accent text-white px-6 sm:px-8 md:px-12 py-4 sm:py-5 rounded-full text-base sm:text-lg md:text-xl font-bold shadow-2xl transition-all transform hover:scale-105 w-full sm:w-auto max-w-md"
            >
              <span className="text-center">Start Your Transformation Today</span>
              <ArrowRight className="flex-shrink-0" size={24} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-brand-main py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <img src="/peak_performance (1).png" alt="Peak Performance Partners" className="h-12" />
              <img src="/idQtrRK2tN_1762721271687.png" alt="Toro Taxes" className="h-12" />
            </div>
            <p className="text-slate-400 text-center">
              <a href="https://www.3-peak.com" className="hover:text-brand-accent transition-colors">www.3-peak.com</a> |
              <a href="https://www.torotaxes.com" className="hover:text-brand-accent transition-colors ml-2">www.torotaxes.com</a><br />
              <a href="mailto:ricky@3-peak.com" className="hover:text-brand-accent transition-colors">ricky@3-peak.com</a> |
              <a href="tel:9154901889" className="hover:text-brand-accent transition-colors ml-2">(915) 490-1889</a>
            </p>
            <div className="text-center border-t border-slate-800 pt-8 w-full space-y-4">
              <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
                <span>Built by</span>
                <a
                  href="https://automateplanet.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/automate planet12345.png"
                    alt="Automate Planet"
                    className="h-8 inline-block"
                  />
                </a>
              </div>
              <p className="text-slate-400 text-sm">&copy; 2025 Peak Performance Partners | {t('footer.rights')}</p>
            </div>
            <div className="fixed bottom-4 right-4 z-50">
              <LanguageToggle />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
