import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {  ArrowRight, CheckCircle2, BookOpen, Users, TrendingUp, Award, Play, DollarSign, Target, Zap, Clock, BarChart3, Star, MessageSquare, Shield, Sparkles, X } from 'lucide-react';
import LanguageToggle from '../components/LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';

export default function LandingPage() {
  const { t } = useLanguage();
  const [showPromoModal, setShowPromoModal] = useState(false);

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
      <button
        onClick={() => setShowPromoModal(true)}
        className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-4 py-3 rounded-full font-bold shadow-2xl transition-all transform hover:scale-110 flex items-center gap-2"
      >
        <Zap size={18} />
        <span className="hidden sm:inline">Special Offer!</span>
        <Sparkles size={16} />
      </button>
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
                  to="/register?plan=promo"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-full text-lg md:text-xl font-bold shadow-2xl transition-all transform hover:scale-105"
                >
                  <Zap size={24} />
                  {t('modal.cta')}
                  <ArrowRight size={24} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <header className="bg-brand-main py-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/peak_performance (1).png" alt="Peak Performance Partners" className="h-8 sm:h-10" />
          </div>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <Link
              to="/login"
              className="text-white hover:text-brand-accent font-semibold transition-colors"
            >
              {t('nav.login')}
            </Link>
            <Link
              to="/register"
              className="bg-brand-accent hover:bg-red-900 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              {t('nav.getStarted')}
            </Link>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-amber-500 via-orange-600 to-brand-accent py-3 md:py-4 text-white text-center font-bold cursor-pointer hover:from-amber-600 hover:via-orange-700 hover:to-red-900 transition-all shadow-lg sticky top-16 z-40" onClick={() => setShowPromoModal(true)}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3 flex-wrap">
          <Sparkles size={18} className="animate-pulse" />
          <span className="text-lg md:text-xl">
            {t('banner.exclusive')}
          </span>
          <button className="bg-white text-orange-600 px-6 py-2 rounded-full font-bold hover:bg-slate-100 transition-all shadow-lg">
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-brand-accent text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
                {t('footer.delivered')}
              </div>
              <div className="mb-4 md:mb-6">
                <img src="/peak_performance (1).png" alt="Peak Performance Partners" className="h-16 sm:h-20 md:h-24 mx-auto" />
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl mb-4 md:mb-6 text-slate-300 font-semibold">
                {t('hero.title')}
              </p>
              <p className="text-base md:text-lg text-slate-400 mb-6 md:mb-8 leading-relaxed">
                {t('hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
                <button
                  onClick={() => setShowPromoModal(true)}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-bold shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Zap size={24} />
                  {t('hero.cta1')}
                  <ArrowRight size={24} />
                </button>
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-bold border-2 border-white/30 transition-all"
                >
                  {t('hero.cta2')}
                  <Play size={20} />
                </Link>
              </div>
              <div className="flex items-center gap-3 md:gap-6 text-xs md:text-sm flex-wrap">
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

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <DollarSign className="text-green-400 mb-2" size={28} />
                <div className="text-4xl font-bold mb-2">250%</div>
                <div className="text-slate-300 text-sm">Average Revenue Increase</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <TrendingUp className="text-blue-400 mb-2" size={28} />
                <div className="text-4xl font-bold mb-2">85%</div>
                <div className="text-slate-300 text-sm">Client Retention Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <Users className="text-purple-400 mb-2" size={28} />
                <div className="text-4xl font-bold mb-2">100s</div>
                <div className="text-slate-300 text-sm">of Successful Owners</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <Award className="text-amber-400 mb-2" size={28} />
                <div className="text-4xl font-bold mb-2">4.9/5</div>
                <div className="text-slate-300 text-sm">Satisfaction Rating</div>
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

              <div className="text-center">
                <button
                  onClick={() => setShowPromoModal(true)}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-12 py-5 rounded-full text-2xl font-bold shadow-2xl transition-all transform hover:scale-105"
                >
                  <Zap size={32} />
                  View Full Details & Sign Up
                  <ArrowRight size={32} />
                </button>
                <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 mt-4 inline-block">
                  <p className="text-green-900 font-bold">$16,000+ Total Value | Includes LIFETIME ACCESS</p>
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

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-100">
              <div className="text-center mb-6">
                <div className="inline-block bg-red-100 rounded-full p-4 mb-4">
                  <DollarSign className="text-brand-accent" size={48} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-brand-main mb-2">Revenue Growth</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-slate-600">Before Academy</span>
                    <span className="font-bold text-brand-main">$180K</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-slate-600">After Academy</span>
                    <span className="font-bold text-brand-accent">$450K</span>
                  </div>
                  <div className="h-3 bg-red-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-accent rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">+250%</div>
                    <div className="text-sm text-slate-600">Average Increase</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-100">
              <div className="text-center mb-6">
                <div className="inline-block bg-blue-100 rounded-full p-4 mb-4">
                  <Users className="text-blue-600" size={48} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-brand-main mb-2">Client Base</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-slate-600">Before Academy</span>
                    <span className="font-bold text-brand-main">850</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-slate-600">After Academy</span>
                    <span className="font-bold text-blue-600">1,800</span>
                  </div>
                  <div className="h-3 bg-blue-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">+112%</div>
                    <div className="text-sm text-slate-600">Client Growth</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-100">
              <div className="text-center mb-6">
                <div className="inline-block bg-purple-100 rounded-full p-4 mb-4">
                  <TrendingUp className="text-purple-600" size={48} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-brand-main mb-2">Profit Margin</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-slate-600">Before Academy</span>
                    <span className="font-bold text-brand-main">18%</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-slate-600">After Academy</span>
                    <span className="font-bold text-purple-600">42%</span>
                  </div>
                  <div className="h-3 bg-purple-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">+24pts</div>
                    <div className="text-sm text-slate-600">Margin Improvement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-brand-accent to-red-900 rounded-3xl p-12 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('testimonials.title')}</h3>
            <p className="text-base md:text-xl text-red-100 mb-6 md:mb-8 max-w-2xl mx-auto">
              Whether you're a new franchisee or seasoned operator, transform your tax office into a year-round success story
            </p>
            <Link
              to="/register"
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
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-main mb-4">
              {t('journey.title')}
            </h2>
            <div className="w-24 h-1 bg-brand-accent mx-auto mb-6"></div>
            <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto">
              {t('journey.subtitle')}
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-brand-accent via-purple-600 to-blue-600 transform -translate-y-1/2"></div>

            <div className="grid md:grid-cols-5 gap-8 relative">
              {[
                { icon: Target, title: t('journey.step1'), desc: t('journey.step1desc'), color: 'red' },
                { icon: TrendingUp, title: t('journey.step2'), desc: t('journey.step2desc'), color: 'orange' },
                { icon: Zap, title: t('journey.step3'), desc: t('journey.step3desc'), color: 'amber' },
                { icon: Users, title: t('journey.step4'), desc: t('journey.step4desc'), color: 'purple' },
                { icon: Award, title: t('journey.step5'), desc: t('journey.step5desc'), color: 'blue' },
              ].map((step, index) => {
                const Icon = step.icon;
                const colorClasses: Record<string, string> = {
                  red: 'bg-brand-accent',
                  orange: 'bg-orange-600',
                  amber: 'bg-amber-600',
                  purple: 'bg-purple-600',
                  blue: 'bg-blue-600',
                };
                return (
                  <div key={index} className="relative">
                    <div className="bg-white rounded-2xl shadow-xl p-6 text-center border-4 border-white hover:border-slate-200 transition-all">
                      <div className={`${colorClasses[step.color]} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg`}>
                        <Icon size={24} />
                      </div>
                      <div className="bg-brand-main text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-3">
                        Step {index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-brand-main mb-2">{step.title}</h3>
                      <p className="text-sm text-slate-600">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: BookOpen,
                title: 'Financial Mastery',
                stat: '95%',
                label: 'Improved Cash Flow',
                description: 'Master cash flow, forecasting, and financial literacy to make data-driven decisions.',
              },
              {
                icon: Users,
                title: 'Growth Systems',
                stat: '3.2x',
                label: 'Client Growth',
                description: 'Implement proven marketing, sales, and retention strategies that drive results.',
              },
              {
                icon: Zap,
                title: 'Operational Excellence',
                stat: '60%',
                label: 'Time Saved',
                description: 'Leverage technology, automation, and strategic planning to scale efficiently.',
              },
            ].map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-slate-100"
                >
                  <Icon className="text-brand-accent mb-4" size={36} />
                  <h3 className="text-2xl font-bold text-brand-main mb-4">{highlight.title}</h3>
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-brand-accent mb-1">{highlight.stat}</div>
                    <div className="text-sm text-slate-600 font-semibold">{highlight.label}</div>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{highlight.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                image: 'M',
                metric: 'Revenue Growth',
              },
              {
                name: 'James Chen',
                role: 'Multi-Location Owner',
                rating: 5,
                revenue: '+420 Clients',
                quote: 'The sales and marketing systems completely transformed how we attract and retain clients. Game changer!',
                image: 'J',
                metric: 'Client Growth',
              },
              {
                name: 'Sarah Johnson',
                role: 'First-Year Franchisee',
                rating: 5,
                revenue: '38% Margin',
                quote: 'As a new owner, this program gave me the foundation I needed. I\'m profitable in my first year thanks to the Academy.',
                image: 'S',
                metric: 'Profit Margin',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-slate-200"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-accent to-red-900 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {testimonial.image}
                  </div>
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
                description: 'Immediate access to all 12 workshops and begin your transformation.',
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
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-brand-accent hover:bg-red-900 text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl transition-all transform hover:scale-105"
            >
              {t('cta.final')}
              <ArrowRight size={28} />
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
                to="/register?plan=promo"
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
                to="/register?plan=essentials"
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
                to="/register?plan=elite"
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
            <div className="text-center text-slate-400 text-sm border-t border-slate-800 pt-8 w-full">
              <p>&copy; 2025 Peak Performance Partners | {t('footer.rights')}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
