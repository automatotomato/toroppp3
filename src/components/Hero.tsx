import { ArrowRight, Sparkles } from 'lucide-react';
import VoiceAssistant from './VoiceAssistant';

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-main/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700 border border-slate-200">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span>Premium Training Program</span>
            </div>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
              Advance Your<br />
              Career with<br />
              <span className="text-red-600">Toro Tax & Peak 3</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
              Join our exclusive training program to become a certified Toro Tax Franchise Partner
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={scrollToForm}
                className="group inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/30 transition-all duration-300"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <VoiceAssistant />
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white" />
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white" />
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white" />
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white" />
              </div>
              <div className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">500+</span> professionals trained
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-blue-100 rounded-3xl blur-3xl opacity-30" />

            <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 md:p-12 space-y-8">
              <div className="flex items-center justify-center gap-6">
                <div className="group relative bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <img
                    src="/peak_performance (1).png"
                    alt="Peak Performance Partners"
                    className="h-16 w-auto transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="text-2xl font-light text-slate-300">×</div>

                <div className="group relative bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <img
                    src="/idQtrRK2tN_1762721271687.png"
                    alt="Toro Taxes"
                    className="h-24 w-auto transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/0 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold">1</div>
                  <div className="text-left">
                    <div className="font-semibold text-slate-900">Expert Training</div>
                    <div className="text-sm text-slate-600">Comprehensive curriculum</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-main rounded-lg flex items-center justify-center text-white font-bold">2</div>
                  <div className="text-left">
                    <div className="font-semibold text-slate-900">Certification</div>
                    <div className="text-sm text-slate-600">Become an official partner</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex-shrink-0 w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center text-white font-bold">3</div>
                  <div className="text-left">
                    <div className="font-semibold text-slate-900">Launch Your Business</div>
                    <div className="text-sm text-slate-600">Full support system</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
