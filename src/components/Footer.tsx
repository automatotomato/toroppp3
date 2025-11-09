import { Building2, TrendingUp, Users } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-main py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center gap-8 mb-8 flex-wrap">
          <div className="flex items-center gap-2 text-white">
            <Building2 size={32} className="text-brand-accent" />
            <span className="font-bold text-xl">PEAK 3</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <TrendingUp size={32} className="text-brand-accent" />
            <span className="font-bold text-xl">TORO TAX</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Users size={32} className="text-brand-accent" />
            <span className="font-bold text-xl">EMPLOYNV</span>
          </div>
        </div>

        <div className="text-center text-slate-400 text-sm border-t border-slate-800 pt-8">
          <p>&copy; 2025 Peak 3 | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
