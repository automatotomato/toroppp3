import { ArrowDown } from 'lucide-react';
import VoiceAssistant from './VoiceAssistant';

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-12">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(30, 41, 59, 0.90) 50%, rgba(15, 23, 42, 0.92) 100%), url(https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900/40 via-transparent to-slate-900/40" />

      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center items-center gap-8 mb-10 flex-wrap">
          <div className="group bg-white px-8 py-5 rounded-2xl shadow-2xl hover:shadow-red-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border-2 border-white/10">
            <img src="/peak-performance_color.png" alt="Peak Performance Partners" className="h-20 w-auto drop-shadow-lg" />
          </div>
          <div className="text-5xl font-light text-white/40">×</div>
          <div className="group bg-white px-8 py-5 rounded-2xl shadow-2xl hover:shadow-red-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border-2 border-white/10">
            <img src="/idQtrRK2tN_1762721271687.png" alt="Toro Taxes" className="h-32 w-auto drop-shadow-lg" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
          Advance Your Career with<br />
          <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Toro Tax & Peak 3</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-100 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-light">
          Join our exclusive training program to become a certified Toro Tax Franchise Partner
        </p>

        <div className="flex justify-center mb-6">
          <VoiceAssistant />
        </div>

        <button
          onClick={scrollToForm}
          className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg px-10 py-5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-red-500/50 border border-red-500/20 overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center">
            Register Now
            <ArrowDown className="inline-block ml-2 group-hover:translate-y-1 transition-transform" size={24} />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-white/60" size={28} />
      </div>
    </section>
  );
}
