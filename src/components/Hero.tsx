import { ArrowDown, Sparkles } from 'lucide-react';
import VoiceAssistant from './VoiceAssistant';

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(239,68,68,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center items-center gap-6 mb-16 flex-wrap">
          <div className="group relative bg-white/10 backdrop-blur-md px-8 py-6 rounded-2xl border border-white/20 shadow-2xl transition-all duration-500 hover:bg-white/15 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
            <img src="/peak_performance (1).png" alt="Peak Performance Partners" className="relative h-20 w-auto" />
          </div>
          <div className="text-4xl font-light text-slate-400">×</div>
          <div className="group relative bg-white/10 backdrop-blur-md px-8 py-6 rounded-2xl border border-white/20 shadow-2xl transition-all duration-500 hover:bg-white/15 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
            <img src="/idQtrRK2tN_1762721271687.png" alt="Toro Taxes" className="relative h-32 w-auto" />
          </div>
        </div>

        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-red-500/10 backdrop-blur-sm border border-white/10 rounded-full">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-slate-300">Exclusive Partnership Program</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-white to-slate-100">
            Advance Your Career
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-400 to-blue-400 animate-gradient">
            with Toro Tax & Peak 3
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          Join our exclusive training program to become a certified Toro Tax Franchise Partner and unlock unprecedented growth opportunities
        </p>

        <div className="flex justify-center mb-10">
          <VoiceAssistant />
        </div>

        <button
          onClick={scrollToForm}
          className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-500 hover:to-red-500 text-white font-semibold text-lg px-12 py-5 rounded-full shadow-2xl shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/40"
        >
          <span>Register Now</span>
          <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-red-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
        </button>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-slate-500" size={28} />
      </div>
    </section>
  );
}
