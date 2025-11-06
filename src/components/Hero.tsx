import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url(https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center items-center gap-8 mb-12 flex-wrap">
          <div className="bg-white/95 backdrop-blur-sm px-8 py-4 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold text-slate-800">PEAK 3</h3>
          </div>
          <div className="text-4xl font-bold text-red-500">×</div>
          <div className="bg-white/95 backdrop-blur-sm px-8 py-4 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold text-slate-800">TORO TAX</h3>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Advance Your Career with<br />
          <span className="text-red-500">Toro Tax & Peak 3</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto leading-relaxed">
          Join our exclusive training program to become a certified Toro Tax Franchise Partner
        </p>

        <button
          onClick={scrollToForm}
          className="group bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-10 py-5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-red-600/50"
        >
          Register Now
          <ArrowDown className="inline-block ml-2 group-hover:translate-y-1 transition-transform" size={24} />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-white/60" size={32} />
      </div>
    </section>
  );
}
