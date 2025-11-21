import { ArrowDown, Sparkles } from 'lucide-react';
import VoiceAssistant from './VoiceAssistant';

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center py-16 sm:py-20">
        <div className="mb-8 sm:mb-12 space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:items-center sm:gap-6">
          <div className="inline-block bg-white/95 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-2xl border border-slate-200/50">
            <img
              src="/peak_performance (1).png"
              alt="Peak Performance Partners"
              className="h-16 sm:h-20 w-auto mx-auto"
            />
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-white/80">×</div>
          <div className="inline-block bg-white/95 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-2xl border border-slate-200/50">
            <img
              src="/idQtrRK2tN_1762721271687.png"
              alt="Toro Taxes"
              className="h-10 sm:h-12 w-auto mx-auto"
            />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 text-amber-300 px-4 py-2 rounded-full mb-6 sm:mb-8 text-xs sm:text-sm font-semibold">
          <Sparkles size={16} className="animate-pulse" />
          <span>Elite Training Program</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
          Advance Your Career with
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-red-400 via-red-500 to-orange-500 bg-clip-text text-transparent"> Toro Tax & Peak 3</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
          Join our exclusive training program to become a certified Toro Tax Franchise Partner
        </p>

        <div className="flex justify-center mb-6 sm:mb-8">
          <VoiceAssistant />
        </div>

        <button
          onClick={scrollToForm}
          className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-red-500/50 border border-red-500/50"
        >
          Register Now
          <ArrowDown className="inline-block ml-2 group-hover:translate-y-1 transition-transform" size={20} />
        </button>

        <div className="mt-10 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">12</div>
            <div className="text-xs sm:text-sm text-slate-400">Courses</div>
          </div>
          <div className="text-center border-x border-slate-700">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">90+</div>
            <div className="text-xs sm:text-sm text-slate-400">Hours</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">∞</div>
            <div className="text-xs sm:text-sm text-slate-400">Access</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-slate-400/60" size={28} />
      </div>
    </section>
  );
}
