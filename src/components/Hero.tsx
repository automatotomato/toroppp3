import { ArrowDown } from 'lucide-react';
import VoiceAssistant from './VoiceAssistant';

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)',
        }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col items-center gap-6 mb-10 sm:mb-12">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <div className="bg-white/95 backdrop-blur-sm px-5 py-4 sm:px-6 sm:py-5 rounded-xl shadow-2xl">
              <img src="/peak_performance (1).png" alt="Peak Performance Partners" className="h-16 sm:h-20 w-auto" />
            </div>
            <div className="text-3xl sm:text-4xl font-light text-white/40">×</div>
            <div className="bg-white/95 backdrop-blur-sm px-5 py-4 sm:px-6 sm:py-5 rounded-xl shadow-2xl">
              <img src="/idQtrRK2tN_1762721271687.png" alt="Toro Taxes" className="h-24 sm:h-32 w-auto" />
            </div>
          </div>
        </div>

        <div className="text-center space-y-6 sm:space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight px-2">
            Advance Your Career with
            <span className="block mt-2 text-red-500 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Toro Tax & Peak 3
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed px-4">
            Join our exclusive training program to become a certified Toro Tax Franchise Partner
          </p>

          <div className="flex justify-center pt-4">
            <VoiceAssistant />
          </div>

          <div className="pt-6">
            <button
              onClick={scrollToForm}
              className="group bg-red-600 hover:bg-red-700 text-white font-semibold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-red-500/30 active:scale-95"
            >
              Register Now
              <ArrowDown className="inline-block ml-2 group-hover:translate-y-1 transition-transform" size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-white/30" size={28} />
      </div>
    </section>
  );
}
