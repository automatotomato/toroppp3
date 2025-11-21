import { ArrowRight, ChevronDown } from 'lucide-react';
import VoiceAssistant from './VoiceAssistant';

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-700/20 via-slate-900 to-slate-900" />

      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <div className="flex justify-center items-center gap-6 md:gap-12 mb-16 flex-wrap">
          <div className="bg-white/98 backdrop-blur-md px-6 md:px-10 py-5 md:py-7 rounded-2xl shadow-2xl border border-slate-200/50 transition-transform duration-300 hover:scale-105">
            <img src="/peak_performance (1).png" alt="Peak Performance Partners" className="h-16 md:h-20 w-auto" />
          </div>
          <div className="text-3xl md:text-4xl font-light text-slate-400">×</div>
          <div className="bg-white/98 backdrop-blur-md px-6 md:px-10 py-5 md:py-7 rounded-2xl shadow-2xl border border-slate-200/50 transition-transform duration-300 hover:scale-105">
            <img src="/idQtrRK2tN_1762721271687.png" alt="Toro Taxes" className="h-24 md:h-32 w-auto" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          Advance Your Career with<br />
          <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Toro Tax & Peak 3</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
          Join our exclusive training program to become a certified Toro Tax Franchise Partner
        </p>

        <div className="flex justify-center mb-12">
          <VoiceAssistant />
        </div>

        <button
          onClick={scrollToForm}
          className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-brand-accent to-red-700 hover:from-red-700 hover:to-brand-accent text-white font-semibold text-base md:text-lg px-8 md:px-12 py-4 md:py-5 rounded-full shadow-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-600/30"
        >
          <span>Register Now</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
        </button>
      </div>

      <button
        onClick={scrollToForm}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer bg-white/5 hover:bg-white/10 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
        aria-label="Scroll to registration"
      >
        <ChevronDown className="text-white/70" size={28} />
      </button>
    </section>
  );
}
