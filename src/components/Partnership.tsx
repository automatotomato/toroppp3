import { Building2, Users, TrendingUp, Award } from 'lucide-react';

export default function Partnership() {
  const partners = [
    { name: 'Peak 3', icon: Building2 },
    { name: 'Toro Tax', icon: TrendingUp },
    { name: 'EmployNV', icon: Users },
    { name: 'Peak Performance Partners', icon: Award }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-main mb-4">
            Powered by Peak 3
          </h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto mb-8"></div>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Peak 3 specializes in workforce development and business training programs that partner
            with leading organizations like Toro Tax and EmployNV to create real career advancement
            opportunities for aspiring entrepreneurs and professionals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
              >
                <div className="bg-brand-main w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-brand-accent" size={32} />
                </div>
                <h3 className="text-xl font-bold text-brand-main">{partner.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
