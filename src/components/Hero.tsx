import { ArrowDown } from 'lucide-react';
import VoiceAssistant from './VoiceAssistant';

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 z-0 opacity-20" style={{
        backgroundImage: 'url(https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800/20 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="flex justify-center items-center gap-6 md:gap-12 mb-16 flex-wrap">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-slate-200/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-75 group-hover:opacity-100" />
            <div className="relative bg-gradient-to-br from-white via-slate-50 to-white px-10 py-8 rounded-2xl shadow-2xl border border-white/30 backdrop-blur-sm transform transition-all duration-300 group-hover:scale-105">
              <img src="/peak_performance (1).png" alt="Peak Performance Partners" className="h-20 md:h-28 w-auto filter drop-shadow-sm" />
            </div>
          </div>
          <div className="text-4xl md:text-6xl font-light text-white/40 px-2">×</div>
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-slate-200/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-75 group-hover:opacity-100" />
            <div className="relative bg-gradient-to-br from-white via-slate-50 to-white px-10 py-8 rounded-2xl shadow-2xl border border-white/30 backdrop-blur-sm transform transition-all duration-300 group-hover:scale-105">
              <img src="/idQtrRK2tN_1762721271687.png" alt="Toro Taxes" className="h-32 md:h-44 w-auto filter drop-shadow-sm" />
            </div>
          </div>
        </div>

        <div className="space-y-6 mb-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-white drop-shadow-2xl">
              Advance Your Career with
            </span>
            <br />
            <span className="relative inline-block mt-2">
              <span className="absolute -inset-1 bg-gradient-to-r from-red-600/30 to-orange-600/30 blur-2xl" />
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-600 to-orange-500">
                Toro Tax & Peak 3
              </span>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
            Join our exclusive training program to become a certified
            <span className="text-white font-medium"> Toro Tax Franchise Partner</span>
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <VoiceAssistant />
        </div>

        <div className="relative inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300" />
          <button
            onClick={scrollToForm}
            className="relative group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg px-12 py-6 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border border-red-400/30"
          >
            Register Now
            <ArrowDown className="inline-block ml-2 group-hover:translate-y-1 transition-transform" size={24} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-white/60" size={32} />
      </div>
    </section>
  );
}
