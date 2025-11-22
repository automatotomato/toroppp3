import { ArrowDown } from 'lucide-react';
import VoiceAssistant from './VoiceAssistant';

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-900/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-red-500/3 to-slate-900/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 bg-red-50 border border-red-100 rounded-full px-5 py-2.5 shadow-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-700 tracking-wide">EXCLUSIVE TRAINING PROGRAM</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
              Advance Your<br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Career</span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-xl">
              Become a certified <span className="font-semibold text-slate-900">Toro Tax Franchise Partner</span> through our comprehensive training program
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <button
                onClick={scrollToForm}
                className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-red-500/30 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Register Now
                  <ArrowDown className="group-hover:translate-y-1 transition-transform" size={20} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>

              <VoiceAssistant />
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-bold">
                  +
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-white shadow-md" />
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 border-2 border-white shadow-md" />
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-500 to-slate-600 border-2 border-white shadow-md" />
              </div>
              <div className="text-sm">
                <div className="font-semibold text-slate-900">500+ Partners</div>
                <div className="text-slate-600">Successfully certified</div>
              </div>
            </div>
          </div>

          <div className="relative lg:block hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-slate-900/10 rounded-3xl blur-2xl" />
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200/50 p-8 space-y-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="group flex-1 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 border border-slate-100">
                  <img src="/peak-performance_color.png" alt="Peak Performance Partners" className="h-16 w-auto mx-auto drop-shadow-md" />
                </div>
                <div className="text-3xl font-light text-slate-300">×</div>
                <div className="group flex-1 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 border border-slate-100">
                  <img src="/idQtrRK2tN_1762721271687.png" alt="Toro Taxes" className="h-24 w-auto mx-auto drop-shadow-md" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-gradient-to-br from-red-50 to-white p-4 rounded-xl border border-red-100">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
                    <ArrowDown className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Expert Training</h3>
                    <p className="text-sm text-slate-600">Learn from industry leaders with proven success</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-gradient-to-br from-slate-50 to-white p-4 rounded-xl border border-slate-200">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center shadow-lg">
                    <ArrowDown className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Full Support</h3>
                    <p className="text-sm text-slate-600">Ongoing guidance throughout your journey</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-gradient-to-br from-red-50 to-white p-4 rounded-xl border border-red-100">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
                    <ArrowDown className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Certification</h3>
                    <p className="text-sm text-slate-600">Become an official franchise partner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-slate-400" size={28} />
      </div>
    </section>
  );
}
